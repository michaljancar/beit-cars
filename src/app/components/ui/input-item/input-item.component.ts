import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-item',
  standalone: true,
  templateUrl: './input-item.component.html',
  styleUrl: './input-item.component.css',
})
export class InputItemComponent {
  @Input({ required: true }) label: string;
  @Input({ required: true }) inputId: string;
  @Input() hasError = false;
}
