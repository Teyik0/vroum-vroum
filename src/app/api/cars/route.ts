import prisma from '@/utils/client';
import { NextApiRequest } from 'next';
import { FilterCarParams } from '@/utils/interface';
import { Car } from '@prisma/client';

export function parseQueryParameters(url: string) {
  const queryString = url.split('?')[1]; // Récupère la partie de la chaîne après le point d'interrogation
  const params = new URLSearchParams(queryString); // Crée un nouvel objet URLSearchParams avec la chaîne de requête

  const queryParams: Record<string, string> = {};

  for (const [key, value] of params.entries()) {
    queryParams[key] = value;
  }

  return queryParams;
}

export async function GET(request: NextApiRequest) {
  try {
    const params: FilterCarParams = parseQueryParameters(request.url!);
    if (
      params.category ||
      params.energy ||
      params.gearbox ||
      params.km ||
      params.price
    ) {
      const cars = await prisma.car.findMany({
        where: {
          AND: [
            {
              price: params.price
                ? {
                    lte: parseInt(params.price),
                  }
                : undefined,
            },
            {
              kilometers: params.km
                ? {
                    lte: parseInt(params.km),
                  }
                : undefined,
            },
            {
              energy: params.energy
                ? {
                    equals: params.energy,
                  }
                : undefined,
            },
            {
              category: params.category
                ? {
                    equals: params.category,
                  }
                : undefined,
            },
            {
              gearbox: params.gearbox
                ? {
                    equals: params.gearbox,
                  }
                : undefined,
            },
          ],
        },
      });
      return new Response(JSON.stringify(cars), { status: 200 });
    } else {
      const cars = await prisma.car.findMany({
        orderBy: {
          price: 'asc',
        },
      });
      return new Response(JSON.stringify(cars), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}

export async function POST(request: Request) {
  const carParams: Car = await request.json();

  //if (!carParams.brand)
  //return new Response('Brand is required', { status: 400 });
  if (!carParams.model)
    return new Response('Model is required', { status: 400 });
  if (!carParams.price)
    return new Response('Price is required', { status: 400 });
  if (!carParams.kilometers)
    return new Response('Kilometers is required', { status: 400 });
  if (!carParams.energy)
    return new Response('Fuel is required', { status: 400 });
  if (!carParams.gearbox)
    return new Response('Gearbox is required', { status: 400 });
  if (!carParams.horsePower)
    return new Response('Horse power is required', { status: 400 });

  try {
    const car = await prisma.car.create({
      data: carParams,
    });
    return new Response(JSON.stringify(car), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}
