import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-table',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    ButtonModule,
    TableModule,
    ToastModule,
  ],
  templateUrl: './car-table.component.html',
})
export class CarTableComponent {
  readonly carService = inject(CarService);

  readonly columns = [
    { field: 'id', header: 'ID' },
    { field: 'licencePlate', header: 'SPZ' },
    { field: 'brand', header: 'Značka' },
    { field: 'price', header: 'Cena' },
    { field: 'createdDate', header: 'Datum vydání' },
    { field: 'action', header: 'Akce' },
  ];

  onShowDetail(id: number) {
    this.carService.selectCar(id);
  }
}
