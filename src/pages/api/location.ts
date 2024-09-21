import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
const SEARCH_RADIUS_MICRODEGREES = 20000; // ~1.5 miles.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body as string;

    const { long, lat } = JSON.parse(body);

    // doing comparison here was not possible due to LAT_016 and LONG_017 being strings after parsing, and not numbers.

    // first, I created another table that has the lat and long in microdegrees by mapping in the id and the lat / long for each row.
    // then, query that table for the lat and long, and return the id.
    // then, query the bridge table for the id, and return the bridge with relevant data.

    // take in degrees, convert to microdegrees / microarcseconds. Round to ensure we only have a max of 8 digits.
    const latDeg = Math.round(parseFloat(lat) * 1000000);
    const longDeg = Math.round(parseFloat(long) * 1000000);

    // Use the declared search radius to find all structures within the given range.
    const latMin = latDeg - SEARCH_RADIUS_MICRODEGREES;
    const longMin = longDeg - SEARCH_RADIUS_MICRODEGREES;

    const latMax = latDeg + SEARCH_RADIUS_MICRODEGREES;
    const longMax = longDeg + SEARCH_RADIUS_MICRODEGREES;

    const structures = await prisma.location.findMany({
      where: {
        latitude: {
          gte: latMin, // gte: greater than or equal to.
          lte: latMax, // lte: less than or equal to.
        },
        longitude: {
          gte: longMin,
          lte: longMax,
        },
      },
      orderBy: {
        id: "asc",
      },
      take: 10,
    });

    // A promise that resolves to the array of bridge data.
    const results = await Promise.all(
      structures.map(async (structure) => {
        const bridge = await prisma.bridge.findUnique({
          where: { id: structure.id },
          select: {
            id: true,
            STRUCTURE_NUMBER_008: true,
            DATE_OF_INSPECT_090: true,
            YEAR_BUILT_027: true,
            OPERATING_RATING_064: true,
          },
        });

        return bridge || null;
      })
    );

    if (results.length === 0 || results === undefined) {
      return res.status(404).json({ error: "No content" });
    }

    return res.status(200).json(results);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
