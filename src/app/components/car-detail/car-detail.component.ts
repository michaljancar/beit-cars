import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import { Car } from '../../models/car.model';
import { InputItemComponent } from '../ui/input-item/input-item.component';
import { CarService } from '../../services/car.service';
import { UIService } from '../../services/ui.service';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FieldsetModule,
    InputTextModule,
    InputNumberModule,
    InputItemComponent,
  ],
  templateUrl: './car-detail.component.html',
})
export class CarDetailComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly carService = inject(CarService);
  private readonly uiService = inject(UIService);
  private readonly fb = inject(FormBuilder);

  carForm: FormGroup;
  selectedCar: Car = null;
  editMode = false;
  isLoading = false;
  readonly brands = this.carService.carBrands;
  readonly today = new Date();

  ngOnInit(): void {
    const carSubscription = this.carService.selectedCar$
      .pipe(
        map((car) => {
          this.selectedCar = car;
          this.editMode = !car?.id;
          this.initForm();
        })
      )
      .subscribe();
    this.destroyRef.onDestroy(() => carSubscription.unsubscribe());
  }

  onSubmit() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.carForm.invalid) {
        this.isLoading = false;
        return;
      }
      const newCarData: Car = {
        ...this.carForm.value,
        id: this.selectedCar?.id ?? null,
      };
      if (this.selectedCar?.id) {
        this.carService.updateCar(newCarData);
      } else {
        this.carService.addNewCar(newCarData);
      }
      this.carForm.reset();
      this.isLoading = false;
    }, 200);
  }

  onStartEdit() {
    this.isLoading = true;
    setTimeout(() => {
      this.editMode = true;
      this.initForm();
      this.isLoading = false;
    }, 200);
  }

  onClose() {
    this.uiService.hideSidebar();
    this.carService.dismissSelectedCar();
  }

  onConfirm() {
    this.uiService.showConfirmation({
      header: 'Opravdu chcete odejít?',
      message: 'Všechny změny, které jste provedli, nebudou uloženy.',
      accept: () => {
        this.onClose();
      },
    });
  }

  getFieldHasError(fieldName): boolean {
    const hasError =
      this.carForm.controls[fieldName].touched &&
      this.carForm.controls[fieldName].invalid;
    return hasError;
  }

  private initForm() {
    this.carForm = this.fb.group({
      id: [
        { value: this.selectedCar?.id ?? '', disabled: true },
        this.selectedCar?.id ? Validators.required : null,
      ],
      licencePlate: [
        {
          value: this.selectedCar?.licencePlate ?? '',
          disabled: !this.editMode,
        },
        Validators.required,
      ],
      brand: [
        { value: this.selectedCar?.brand ?? '', disabled: !this.editMode },
        Validators.required,
      ],
      price: [
        { value: this.selectedCar?.price ?? '', disabled: !this.editMode },
        Validators.required,
      ],
      createdDate: [
        {
          value: this.selectedCar?.createdDate ?? '',
          disabled: !this.editMode,
        },
        Validators.required,
      ],
    });
  }
}
