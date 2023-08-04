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
