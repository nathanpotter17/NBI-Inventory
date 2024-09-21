import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const sid = req.body as string;

    const structure = await prisma.bridge.findFirst({
      where: {
        STRUCTURE_NUMBER_008: sid,
      },
    });
    console.log(structure);
    return res.status(200).json(structure);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
