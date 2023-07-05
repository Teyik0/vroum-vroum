-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "kilometers" INTEGER NOT NULL,
    "fuel" TEXT NOT NULL,
    "gearbox" TEXT NOT NULL,
    "horsePower" INTEGER NOT NULL,
    "seats" INTEGER,
    "doors" INTEGER,
    "color" TEXT,
    "imgUrls" TEXT[],

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
