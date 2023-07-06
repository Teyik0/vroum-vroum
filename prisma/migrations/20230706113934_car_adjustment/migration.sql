/*
  Warnings:

  - You are about to drop the column `fuel` on the `Car` table. All the data in the column will be lost.
  - The `gearbox` column on the `Car` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gearbox" AS ENUM ('manual', 'automatic');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('diesel', 'essence', 'hybride', 'electrique');

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "fuel",
ADD COLUMN     "energy" "Energy" NOT NULL DEFAULT 'diesel',
DROP COLUMN "gearbox",
ADD COLUMN     "gearbox" "Gearbox" NOT NULL DEFAULT 'manual';
