/*
  Warnings:

  - A unique constraint covering the columns `[STRUCTURE_NUMBER_008]` on the table `Bridge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bridge_STRUCTURE_NUMBER_008_key" ON "Bridge"("STRUCTURE_NUMBER_008");
