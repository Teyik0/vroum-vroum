import prisma from '@/utils/client';

export async function GET(request: Request) {
  try {
    const cars = await prisma.car.findMany();
    return new Response(JSON.stringify(cars), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
}

export async function POST(request: Request) {
  const carParams = await request.json();

  if (!carParams.brand)
    return new Response('Brand is required', { status: 400 });
  if (!carParams.model)
    return new Response('Model is required', { status: 400 });
  if (!carParams.price)
    return new Response('Price is required', { status: 400 });
  if (!carParams.kilometers)
    return new Response('Kilometers is required', { status: 400 });
  if (!carParams.fuel) return new Response('Fuel is required', { status: 400 });
  if (!carParams.gearbox)
    return new Response('Gearbox is required', { status: 400 });
  if (!carParams.horsePower)
    return new Response('Horse power is required', { status: 400 });

  try {
    const car = await prisma.car.create({
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
