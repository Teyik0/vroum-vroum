/*
  Warnings:

  - Added the required column `finition` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Made the column `seats` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `doors` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `circulationDate` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motorisation` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `provenance` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `warranty` on table `Car` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "finition" TEXT NOT NULL,
ALTER COLUMN "brand" DROP DEFAULT,
ALTER COLUMN "seats" SET NOT NULL,
ALTER COLUMN "doors" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "circulationDate" SET NOT NULL,
ALTER COLUMN "motorisation" SET NOT NULL,
ALTER COLUMN "provenance" SET NOT NULL,
ALTER COLUMN "warranty" SET NOT NULL,
ALTER COLUMN "energy" DROP DEFAULT,
ALTER COLUMN "gearbox" DROP DEFAULT;
