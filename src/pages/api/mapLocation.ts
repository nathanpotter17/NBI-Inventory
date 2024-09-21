import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch all bridge data
    const bridges = await prisma.bridge.findMany({
      select: {
        id: true,
        LAT_016: true,
        LONG_017: true,
      },
    });

    // Map the data to the Location model
    const locations = bridges.map((bridge) => ({
      id: bridge.id,
      latitude: parseFloat(bridge.LAT_016!),
      longitude: parseFloat(bridge.LONG_017!),
    }));

    // Save the mapped data to the Location model
    const result = await prisma.location.createMany({
      data: locations,
    });

    console.log(`Created ${result.count} new location records.`);
    return res
      .status(200)
      .json({ message: `Created ${result.count} new location records.` });
  } catch (error) {
    console.error("Error migrating bridge locations:", error);
    return res.status(500).json({ error: "Error migrating bridge locations" });
  }
}
