/*
  Warnings:

  - You are about to drop the column `KILOPOString_011` on the `Bridge` table. All the data in the column will be lost.
  - You are about to drop the column `MAStringENANCE_021` on the `Bridge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bridge" DROP COLUMN "KILOPOString_011",
DROP COLUMN "MAStringENANCE_021",
ADD COLUMN     "KILOPOINT_011" TEXT,
ADD COLUMN     "MAINTENANCE_021" TEXT;
