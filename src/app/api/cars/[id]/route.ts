import prisma from '@/utils/client';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const carId = params.id;

  if (carId) {
    try {
      const car = await prisma.car.findUnique({
        where: {
          id: Number(carId),
        },
      });
      return new Response(JSON.stringify(car), { status: 200 });
    } catch (error) {
      return new Response('Something went wrong', { status: 500 });
    }
  } else return new Response('Id is required', { status: 400 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const carId = params.id;
  const carParams = await request.json();

  if (!carId) return new Response('Id is required', { status: 400 });

  try {
    const car = await prisma.car.update({
      where: {
        id: Number(carId),
      },
      data: {
        brand: carParams.brand,
        model: carParams.model,
        price: carParams.price,
        year: carParams.year,
        kilometers: carParams.kilometers,
        fuel: carParams.fuel,
        gearbox: carParams.gearbox,
        horsePower: carParams.horsePower,
        color: carParams.color,
        imgUrls: carParams.image,
        seats: carParams.seats,
        doors: carParams.doors,
      },
    });
    return new Response(JSON.stringify(car), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const carId = params.id;

  if (!carId) return new Response('Id is required', { status: 400 });

  try {
    const car = await prisma.car.delete({
      where: {
        id: Number(carId),
      },
    });
    return new Response(JSON.stringify(car), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
}
