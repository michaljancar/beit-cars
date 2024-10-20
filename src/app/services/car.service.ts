import { inject, Injectable } from '@angular/core';

import { Car, CarBrand } from '../models/car.model';
import { UIService } from './ui.service';
import { BehaviorSubject } from 'rxjs';

const CARS: Car[] = [
  {
    id: 99001,
    licencePlate: '2AD3842',
    brand: 'AUDI',
    price: 1200000,
    createdDate: new Date('2024-01-02'),
  },
  {
    id: 99002,
    licencePlate: '1BA3236',
    brand: 'BMW',
    price: 1300000,
    createdDate: new Date('2024-05-01'),
  },
  {
    id: 99003,
    licencePlate: '2SE7603',
    brand: 'MERCEDES',
    price: 1500000,
    createdDate: new Date('2024-10-01'),
  },
  {
    id: 99004,
    licencePlate: '1TA2222',
    brand: 'ŠKODA',
    price: 1000000,
    createdDate: new Date('2023-01-01'),
  },
  {
    id: 99005,
    licencePlate: '1AAP649',
    brand: 'AUDI',
    price: 1600000,
    createdDate: new Date('2017-11-10'),
  },
  {
    id: 99006,
    licencePlate: '2AD3847',
    brand: 'AUDI',
    price: 1200000,
    createdDate: new Date('2023-07-23'),
  },
  {
    id: 99007,
    licencePlate: '1BA3230',
    brand: 'BMW',
    price: 1300000,
    createdDate: new Date('2024-01-01'),
  },
  {
    id: 99008,
    licencePlate: '2SE7605',
    brand: 'MERCEDES',
    price: 1500000,
    createdDate: new Date('2024-01-01'),
  },
];

@Injectable({ providedIn: 'root' })
export class CarService {
  private readonly uiService = inject(UIService);

  storedCars$ = new BehaviorSubject<Car[]>(CARS);
  selectedCar$ = new BehaviorSubject<Car>(null);
  carBrands: CarBrand[] = ['AUDI', 'BMW', 'MERCEDES', 'ŠKODA'];

  selectCar(id: number) {
    const selected: Car = this.storedCars$.value.find((car) => car.id === id);
    this.selectedCar$.next(selected);
    this.uiService.showSidebar();
  }

  addNewCar(newCarData: Car) {
    const newCar: Car = { ...newCarData, id: this.getNewCarId() };
    const updatedCars = [...this.storedCars$.value, newCar];
    this.storedCars$.next(updatedCars);
    this.finishEditing();
  }

  updateCar(updatedCar: Car) {
    const updatedCars = this.storedCars$.value.map((car) =>
      car.id === updatedCar.id ? updatedCar : car
    );
    this.storedCars$.next(updatedCars);
    this.finishEditing();
  }

  dismissSelectedCar() {
    this.selectedCar$.next(null);
  }

  private finishEditing() {
    this.uiService.hideSidebar();
    this.dismissSelectedCar();
  }

  private getNewCarId() {
    const latestId = Math.max(...this.storedCars$.value.map((car) => car.id));
    return latestId + 1;
  }
}
