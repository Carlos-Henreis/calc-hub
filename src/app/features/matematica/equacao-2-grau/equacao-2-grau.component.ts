import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-equacao-2-grau',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatIconModule
  ],
  templateUrl: './equacao-2-grau.component.html',
  styleUrls: ['./equacao-2-grau.component.scss']
})
export class Equacao2GrauComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    a: [1, [Validators.required]],
    b: [-5, [Validators.required]],
    c: [6, [Validators.required]],
  });

  result: {
    delta: number | null;
    x1: string;
    x2: string;
    vertice: { x: number; y: number } | null;
    tipo: string;
    steps: string[];
  } = {
    delta: null,
    x1: '',
    x2: '',
    vertice: null,
    tipo: '',
    steps: []
  };

  calc() {
    const { a, b, c } = this.form.getRawValue();
    const A = Number(a), B = Number(b), C = Number(c);

    if (!Number.isFinite(A) || A === 0 || !Number.isFinite(B) || !Number.isFinite(C)) {
      this.result = { delta: null, x1: '', x2: '', vertice: null, tipo: '', steps: [] };
      return;
    }

    const delta = B * B - 4 * A * C;
    const vx = -B / (2 * A);
    const vy = -delta / (4 * A);

    this.result.delta = delta;
    this.result.vertice = { x: this.round(vx, 4), y: this.round(vy, 4) };
    this.result.steps = [
      `Equação: ${A}x² ${B >= 0 ? '+' : ''}${B}x ${C >= 0 ? '+' : ''}${C} = 0`,
      `Δ = b² - 4ac = ${B}² - 4(${A})(${C}) = ${delta}`
    ];

    if (delta > 0) {
      const x1 = (-B + Math.sqrt(delta)) / (2 * A);
      const x2 = (-B - Math.sqrt(delta)) / (2 * A);
      this.result.x1 = String(this.round(x1, 4));
      this.result.x2 = String(this.round(x2, 4));
      this.result.tipo = 'Duas raízes reais distintas';
      this.result.steps.push(
        `x = (-b ± √Δ) / 2a`,
        `x₁ = (${-B} + √${delta}) / ${2*A} = ${this.result.x1}`,
        `x₂ = (${-B} - √${delta}) / ${2*A} = ${this.result.x2}`
      );
    } else if (delta === 0) {
      const x = -B / (2 * A);
      this.result.x1 = String(this.round(x, 4));
      this.result.x2 = this.result.x1;
      this.result.tipo = 'Uma raiz real (raiz dupla)';
      this.result.steps.push(
        `x = -b / 2a = ${-B} / ${2*A} = ${this.result.x1}`
      );
    } else {
      const realPart = -B / (2 * A);
      const imagPart = Math.sqrt(-delta) / (2 * A);
      this.result.x1 = `${this.round(realPart, 4)} + ${this.round(imagPart, 4)}i`;
      this.result.x2 = `${this.round(realPart, 4)} - ${this.round(imagPart, 4)}i`;
      this.result.tipo = 'Raízes complexas (não reais)';
      this.result.steps.push(
        `x = (-b ± √Δ) / 2a onde Δ < 0`,
        `x₁ = ${this.result.x1}`,
        `x₂ = ${this.result.x2}`
      );
    }

    this.result.steps.push(`Vértice: (${this.result.vertice.x}, ${this.result.vertice.y})`);
  }

  private round(n: number, d = 4): number {
    const p = Math.pow(10, d);
    return Math.round(n * p) / p;
  }
}
