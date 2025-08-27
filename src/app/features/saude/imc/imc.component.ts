import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

type ImcClass =
  | 'Magreza grave' | 'Magreza' | 'Normal'
  | 'Sobrepeso' | 'Obesidade I' | 'Obesidade II' | 'Obesidade III';

@Component({
  selector: 'app-imc',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatChipsModule, MatIconModule
  ],
  templateUrl: './imc.component.html',
  styleUrls: ['./imc.component.scss']
})
export class ImcComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    pesoKg: [80, [Validators.required, Validators.min(1)]],
    alturaM: [1.75, [Validators.required, Validators.min(0.3)]],
  });

  result: { bmi?: number; label?: ImcClass; grau?: string } = {};

  calc() {
    const { pesoKg, alturaM } = this.form.getRawValue();
    const kg = Number(pesoKg ?? 0);
    const m  = Number(alturaM ?? 0);
    if (kg <= 0 || m <= 0) { this.result = {}; return; }

    const bmi = kg / (m * m);
    const label = this.classify(bmi);
    const grau = this.grau(label);
    this.result = { bmi, label, grau };
  }

  classify(bmi: number): ImcClass {
    if (bmi < 16) return 'Magreza grave';
    if (bmi < 18.5) return 'Magreza';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Sobrepeso';
    if (bmi < 35) return 'Obesidade I';
    if (bmi < 40) return 'Obesidade II';
    return 'Obesidade III';
  }

  grau(label: ImcClass) {
    switch (label) {
      case 'Magreza grave': return '—';
      case 'Magreza': return '—';
      case 'Normal': return '—';
      case 'Sobrepeso': return 'I';
      case 'Obesidade I': return 'I';
      case 'Obesidade II': return 'II';
      case 'Obesidade III': return 'III';
    }
  }

  chipColor(): 'primary'|'accent'|'warn' {
    const l = this.result.label;
    if (!l) return 'primary';
    if (l === 'Normal') return 'primary';
    if (l === 'Magreza' || l === 'Magreza grave') return 'accent';
    return 'warn';
  }

  round(n?: number, d = 2) {
    if (n == null || Number.isNaN(n)) return '—';
    const p = Math.pow(10, d);
    return (Math.round(n * p) / p).toFixed(d);
  }
}
