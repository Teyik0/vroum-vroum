'use server';

import { Car } from '@prisma/client';
import { FilterCarParams } from './context';
import prisma from './client';

export const fetchCars = async ({
  category,
  energy,
  gearbox,
  km,
  price,
}: FilterCarParams): Promise<Car[]> => {
  try {
    if (category || energy || gearbox || km || price) {
      const cars = await prisma.car.findMany({
        where: {
          AND: [
            {
              price: price
                ? {
                    lte: parseInt(price),
                  }
                : undefined,
            },
            {
              kilometers: km
                ? {
                    lte: parseInt(km),
                  }
                : undefined,
            },
            {
              energy: energy
                ? {
                    equals: energy,
                  }
                : undefined,
            },
            {
              category: category
                ? {
                    equals: category,
                  }
                : undefined,
            },
            {
              gearbox: gearbox
                ? {
                    equals: gearbox,
                  }
                : undefined,
            },
          ],
        },
      });
      return cars;
    } else {
      const cars = await prisma.car.findMany({
        orderBy: {
          price: 'asc',
        },
      });
      return cars;
    }
  } catch (error: any) {
    throw new Error(`Something went wrong ${error.message}`);
  }
};

export const fetchCarById = async (carId: string) => {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: Number(carId),
      },
    });
    return car;
  } catch (error: any) {
    throw new Error(`Something went wrong ${error.message}`);
  }
};

export const fetchSimilarCar = async ({
  category,
  energy,
  gearbox,
  km,
  price,
}: FilterCarParams): Promise<Car[]> => {
  try {
    const cars = await prisma.car.findMany({
      where: {
        OR: [
          {
            price: price
              ? {
                  lte: parseInt(price),
                }
              : undefined,
          },
          {
            kilometers: km
              ? {
                  lte: parseInt(km),
                }
              : undefined,
          },
          {
            energy: energy
              ? {
                  equals: energy,
                }
              : undefined,
          },
          {
            category: category
              ? {
                  equals: category,
                }
              : undefined,
          },
          {
            gearbox: gearbox
              ? {
                  equals: gearbox,
                }
              : undefined,
          },
        ],
      },
      take: 8,
    });
    return cars;
  } catch (error: any) {
    throw new Error(`Something went wrong ${error.message}`);
  }
};

export const postCar = async (car: Car) => {
  try {
    const newCar = await prisma.car.create({
      data: car,
    });
    return newCar;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Something went wrong ${error.message}`);
  }
};

export const updateCar = async (
  carId: number,
  {
    brand,
    model,
    price,
    year,
    kilometers,
    energy,
    gearbox,
    horsePower,
    imgUrls,
    seats,
    doors,
  }: Car
) => {
  try {
    const car = await prisma.car.update({
      where: {
        id: carId,
      },
      data: {
        brand,
        model,
        price,
        year,
        kilometers,
        energy,
        gearbox,
        horsePower,
        imgUrls,
        seats,
        doors,
      },
    });
    return car;
  } catch (error: any) {
    throw new Error(`Something went wrong ${error.message}`);
  }
};

export const deleteCar = async (carId: number) => {
  try {
    const car = await prisma.car.delete({
      where: {
        id: Number(carId),
      },
    });
    return car;
  } catch (error: any) {
    throw new Error(`Something went wrong ${error.message}`);
  }
};
