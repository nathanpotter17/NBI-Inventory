import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import csv from "csv-parser";
import fs from "fs";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const results: any = [];

    fs.createReadStream("public/mapped.csv")
      .pipe(csv({ separator: "," }))
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          await prisma.bridge.createMany({
            data: results,
          });
          res.status(200).json({ message: "Data received. Check the Studio" });
        } catch (prismaError) {
          console.error("Error inserting data into Prisma:", prismaError);
          res.status(500).json({ error: "Error inserting data into Prisma" });
        }
      });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Error processing CSV" });
  }
}
