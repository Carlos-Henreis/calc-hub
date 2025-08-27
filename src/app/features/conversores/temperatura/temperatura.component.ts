import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


type Unit = 'C' | 'F' | 'K';

@Component({
  selector: 'app-temperatura',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonToggleModule, MatIconModule, MatDividerModule
  ],
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.scss']
})
export class TemperaturaComponent {
  value: number | null = 0;
  from: Unit = 'C';

  get results() {
    if (this.value == null) return null;

    const val = this.value;
    let C: number, F: number, K: number;

    switch (this.from) {
      case 'C':
        C = val;
        F = (val * 9) / 5 + 32;
        K = val + 273.15;
        break;
      case 'F':
        C = (val - 32) * 5 / 9;
        F = val;
        K = C + 273.15;
        break;
      case 'K':
        C = val - 273.15;
        F = (C * 9) / 5 + 32;
        K = val;
        break;
    }

    return {
      C: C.toFixed(2).replace('.', ','),
      F: F.toFixed(2).replace('.', ','),
      K: K.toFixed(2).replace('.', ','),
    };
  }
}
