import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-notacao-cientifica',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatDividerModule
  ],
  templateUrl: './notacao-cientifica.component.html',
  styleUrls: ['./notacao-cientifica.component.scss']
})
export class NotacaoCientificaComponent {
  decimal: number | null = 1500;
  mantissa: number | null = 1.5;
  exponent: number | null = 3;

  onDecimalChange() {
    if (this.decimal != null && Number.isFinite(this.decimal) && this.decimal !== 0) {
      const exp = Math.floor(Math.log10(Math.abs(this.decimal)));
      const mant = this.decimal / Math.pow(10, exp);
      
      this.exponent = exp;
      this.mantissa = Number(mant.toFixed(10));
    } else if (this.decimal === 0) {
      this.mantissa = 0;
      this.exponent = 0;
    }
  }

  onScientificChange() {
    if (this.mantissa != null && this.exponent != null && 
        Number.isFinite(this.mantissa) && Number.isFinite(this.exponent)) {
      this.decimal = Number((this.mantissa * Math.pow(10, this.exponent)).toFixed(10));
    }
  }

  get scientificNotation(): string {
    if (this.mantissa == null || this.exponent == null) return '';
    return `${this.mantissa} × 10^${this.exponent}`;
  }
}
