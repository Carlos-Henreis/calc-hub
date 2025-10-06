import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-mmc-mdc',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatIconModule, MatChipsModule
  ],
  templateUrl: './mmc-mdc.component.html',
  styleUrls: ['./mmc-mdc.component.scss']
})
export class MmcMdcComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    num1: [12, [Validators.required, Validators.min(1)]],
    num2: [18, [Validators.required, Validators.min(1)]],
  });

  result: {
    mmc: number | null;
    mdc: number | null;
    fat1: number[];
    fat2: number[];
    steps: string[];
  } = {
    mmc: null,
    mdc: null,
    fat1: [],
    fat2: [],
    steps: []
  };

  calc() {
    const { num1, num2 } = this.form.getRawValue();
    const n1 = Math.abs(Math.floor(Number(num1)));
    const n2 = Math.abs(Math.floor(Number(num2)));

    if (!Number.isFinite(n1) || !Number.isFinite(n2) || n1 < 1 || n2 < 1) {
      this.result = { mmc: null, mdc: null, fat1: [], fat2: [], steps: [] };
      return;
    }

    this.result.fat1 = this.factorize(n1);
    this.result.fat2 = this.factorize(n2);
    this.result.mdc = this.calcMDC(n1, n2);
    this.result.mmc = (n1 * n2) / this.result.mdc;

    this.result.steps = [
      `Fatoração de ${n1}: ${this.result.fat1.join(' × ')}`,
      `Fatoração de ${n2}: ${this.result.fat2.join(' × ')}`,
      `MDC(${n1}, ${n2}) = ${this.result.mdc}`,
      `MMC(${n1}, ${n2}) = ${this.result.mmc}`,
      `Fórmula: MMC × MDC = ${n1} × ${n2}`
    ];
  }

  private factorize(n: number): number[] {
    const factors: number[] = [];
    let num = n;
    let divisor = 2;

    while (num > 1) {
      if (num % divisor === 0) {
        factors.push(divisor);
        num = num / divisor;
      } else {
        divisor++;
      }
    }

    return factors.length > 0 ? factors : [n];
  }

  private calcMDC(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
}
