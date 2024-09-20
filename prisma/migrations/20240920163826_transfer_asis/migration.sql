/*
  Warnings:

  - You are about to drop the column `UNDERWATER_LOOK_SEE_092B` on the `Bridge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bridge" DROP COLUMN "UNDERWATER_LOOK_SEE_092B",
ADD COLUMN     "FRACTURE_LAST_DATE_093A" TEXT,
ADD COLUMN     "SPEC_LAST_DATE_093C" TEXT,
ADD COLUMN     "UNDWATER_LAST_DATE_093B" TEXT,
ADD COLUMN     "UNDWATER_LOOK_SEE_092B" TEXT;
