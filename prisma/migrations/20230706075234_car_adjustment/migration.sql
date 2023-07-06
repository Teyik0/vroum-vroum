/*
  Warnings:

  - You are about to drop the column `color` on the `Car` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('citadine', 'eco', 'suv', 'compacte', 'berline');

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "color",
ADD COLUMN     "category" "Category",
ADD COLUMN     "circulationDate" TEXT,
ADD COLUMN     "motorisation" TEXT,
ADD COLUMN     "provenance" TEXT,
ADD COLUMN     "warranty" TEXT,
ALTER COLUMN "brand" SET DEFAULT 'Volvo';
