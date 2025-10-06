import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

type Base = 'decimal' | 'binario' | 'octal' | 'hexadecimal';

@Component({
  selector: 'app-bases-numericas',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonToggleModule, MatIconModule, MatDividerModule
  ],
  templateUrl: './bases-numericas.component.html',
  styleUrls: ['./bases-numericas.component.scss']
})
export class BasesNumericasComponent {
  value = '42';
  from: Base = 'decimal';

  get results() {
    if (!this.value) return null;

    try {
      let decimalValue: number;

      switch (this.from) {
        case 'decimal':
          decimalValue = parseInt(this.value, 10);
          break;
        case 'binario':
          decimalValue = parseInt(this.value, 2);
          break;
        case 'octal':
          decimalValue = parseInt(this.value, 8);
          break;
        case 'hexadecimal':
          decimalValue = parseInt(this.value, 16);
          break;
        default:
          return null;
      }

      if (!Number.isFinite(decimalValue) || decimalValue < 0) {
        return null;
      }

      return {
        decimal: decimalValue.toString(10),
        binario: decimalValue.toString(2),
        octal: decimalValue.toString(8),
        hexadecimal: decimalValue.toString(16).toUpperCase(),
      };
    } catch {
      return null;
    }
  }
}
