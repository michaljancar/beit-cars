export interface Car {
  id: number;
  licencePlate: string;
  brand: CarBrand;
  price: number;
  createdDate: Date;
}

export type CarBrand = 'AUDI' | 'BMW' | 'MERCEDES' | 'ŠKODA';
