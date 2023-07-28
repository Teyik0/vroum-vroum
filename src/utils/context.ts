import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Energy, Gearbox, Category, Car } from '@prisma/client';
export interface FilterCarParams {
  price?: string;
  km?: string;
  energy?: Energy;
  category?: Category;
  gearbox?: Gearbox;
}

export interface User {
  id: number;
  username: string;
  password: string;
  authToken: string;
}

export const requestParamsAtom = atom<FilterCarParams>({});
export const carsAtom = atom<Car[] | null>(null);
export const currentSlideAtom = atom<number>(0);
export const isModalClickedAtom = atom<{
  isClicked: boolean;
  car: Car | null;
}>({
  isClicked: false,
  car: null,
});
export const sessionAtom = atomWithStorage<User | null>('session', null);
export const currentCarAtom = atom<Car | null>(null);

export const getSession = async (authToken: string) => {
  const res = await fetch('/api/user/isAuthenticated', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await res.json();
  return data;
};

export const login = async (username: string, password: string) => {
  const res = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
};

export const logout = async (authToken: string) => {
  const res = await fetch('/api/user/logout', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await res.json();
  return data;
};

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
