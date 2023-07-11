import { atom } from 'jotai';
import { FilterCarParams } from './interface';
import { Car } from '@prisma/client';

export const requestParamsAtom = atom<FilterCarParams>({});
export const currentSlideAtom = atom<number>(0);

export const getAllCars = async (
  requestParams: FilterCarParams
): Promise<Car[]> => {
  if (
    requestParams.category ||
    requestParams.energy ||
    requestParams.gearbox ||
    requestParams.km ||
    requestParams.price
  ) {
    const params = new URLSearchParams(
      requestParams as Record<string, string>
    ).toString();
    const res = await fetch(`/api/cars?${params}`);
    const data = await res.json();
    return data;
  } else {
    const res = await fetch(`/api/cars`, {
      method: 'GET',
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
  }
};

export const getCarById = async (id: string): Promise<Car | null> => {
  const res = await fetch(`/api/cars/${id}`);
  if (res.status === 200) {
    const data = await res.json();
    console.log(data);
    return data;
  } else {
    return null;
  }
};

export const getNumberFromPath = (path: string) => {
  const parts = path.split('/');
  const number = parts[parts.length - 1];
  return number;
};

export const getSimilarCar = async (
  requestParams: FilterCarParams
): Promise<Car[]> => {
  if (requestParams) {
    const params = new URLSearchParams(
      requestParams as Record<string, string>
    ).toString();
    const res = await fetch(`/api/cars/similar?${params}`);
    const data = await res.json();
    return data;
  } else {
    const res = await fetch(`/api/cars`, {
      method: 'GET',
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
  }
};
