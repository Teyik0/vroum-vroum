import { Energy, Gearbox, Category } from '@prisma/client';
export interface FilterCarParams {
  price?: string;
  km?: string;
  energy?: Energy;
  category?: Category;
  gearbox?: Gearbox;
}
