import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PrimeNGConfig } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConfirmDialogModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly config = inject(PrimeNGConfig);

  ngOnInit(): void {
    this.config.setTranslation({
      accept: 'Ano',
      dayNamesMin: ['Po', 'Ut', 'St', 'Čt', 'Pi', 'So', 'Ne'],
      monthNames: [
        'Leden',
        'Únor',
        'Březen',
        'Duben',
        'Květen',
        'Červen',
        'Červenec',
        'Srpen',
        'Záři',
        'Říjen',
        'Listopad',
        'Prosinec',
      ],
      reject: 'Ne',
    });
  }
}
