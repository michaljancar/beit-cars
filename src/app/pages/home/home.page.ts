import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';

import { CarDetailComponent } from '../../components/car-detail/car-detail.component';
import { CarTableComponent } from '../../components/car-table/car-table.component';
import { CarService } from '../../services/car.service';
import { UIService } from '../../services/ui.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    SidebarModule,
    ToolbarModule,
    CarDetailComponent,
    CarTableComponent,
  ],
  templateUrl: './home.page.html',
})
export class HomePage {
  private readonly carService = inject(CarService);
  private readonly uiService = inject(UIService);

  readonly sidebarIsOpen = toSignal(this.uiService.sidebarIsOpen$);

  onHideSidebar() {
    this.uiService.hideSidebar();
    this.carService.dismissSelectedCar();
  }
}
