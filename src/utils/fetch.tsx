'use server';

import { Car } from '@prisma/client';
import { FilterCarParams } from './context';

export const fetchSession = async (authToken: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/user/isAuthenticated`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
};

export const login = async (username: string, password: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/user/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
};

export const fetchCars = async (
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
    const res = await fetch(`${process.env.BASE_URL}/api/cars?${params}`, {
      method: 'GET',
      cache: 'no-store',
    });
    const data = await res.json();
    return data;
  } else {
    const res = await fetch(`${process.env.BASE_URL}/api/cars`, {
      method: 'GET',
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
  }
};

export const fetchCarById = async (carId: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/cars/${carId}`, {
    method: 'GET',
    next: { revalidate: 60 },
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return null;
  }
};

export const fetchSimilarCar = async (
  requestParams: FilterCarParams
): Promise<Car[]> => {
  if (requestParams) {
    const params = new URLSearchParams(
      requestParams as Record<string, string>
    ).toString();
    const res = await fetch(
      `${process.env.BASE_URL}/api/cars/similar?${params}`
    );
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
