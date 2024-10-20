import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly config = inject(PrimeNGConfig);

  ngOnInit(): void {
    this.config.setTranslation({
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
      dayNamesMin: ['Po', 'Ut', 'St', 'Čt', 'Pi', 'So', 'Ne'],
    });
  }
}
