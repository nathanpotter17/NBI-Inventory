import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

interface Landmark {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, name, latitude, longitude }: Landmark = req.body;

    const landmark = await prisma.landmark.create({
      data: {
        id: id,
        name: name,
        latitude: latitude,
        longitude: longitude,
      },
    });

    res.status(200).json(landmark);
  } catch (error) {
    res.status(500).json({ error: "Error creating landmark" });
  }
}
