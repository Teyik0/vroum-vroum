import prisma from '@/utils/client';
import { FilterCarParams } from '@/utils/interface';
import { parseQueryParameters } from '../route';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const params: FilterCarParams = parseQueryParameters(request.url!);
    if (params) {
      const cars = await prisma.car.findMany({
        where: {
          OR: [
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
    return new Response('Something went wrong', { status: 500 });
  }
}
