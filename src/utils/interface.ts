export interface Car {
  id?: string;
  brand: string;
  model: string;
  price: number;
  year?: number;
  kilometers: number;
  fuel: string;
  gearbox: string;
  horsePower: number;
  seats?: number;
  doors?: number;
  imgUrls: string[];
}
