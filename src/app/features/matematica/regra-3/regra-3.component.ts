import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';

type Mode = 'direta' | 'inversa' | 'percent' | 'composta';

@Component({
  selector: 'app-regra-3',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatIconModule, MatButtonToggleModule, MatChipsModule
  ],
  templateUrl: './regra-3.component.html',
  styleUrls: ['./regra-3.component.scss']
})
export class Regra3Component {
  private fb = inject(FormBuilder);

  mode: Mode = 'direta';

  // Direta / Inversa:  a  →  b
  //                    c  →  x
  formRule = this.fb.group({
    a: [2, [Validators.required]],
    b: [10, [Validators.required]],
    c: [5, [Validators.required]],
  });

  formCompound = this.fb.group({
    a1: [2, [Validators.required]],
    b1: [10, [Validators.required]],
    a2: [3, [Validators.required]],
    b2: [15, [Validators.required]],
    c: [6, [Validators.required]],
  });

  // Percentual: “p% de v” ou “v é p% de x”
  formPercent = this.fb.group({
    p: [20, [Validators.required]], // percentual
    v: [200, [Validators.required]], // valor base / parcial
    solve: ['pDeV' as 'pDeV' | 'vEhPdeX'], // pDeV = “p% de v”; vEhPdeX = “v é p% de x”
  });

  result = { x: '' as string | number, steps: [] as string[] };

  private clean(n: any): number {
    const x = Number(n);
    return Number.isFinite(x) ? x : NaN;
  }

  calc() {
    this.result = { x: '', steps: [] };

    if (this.mode === 'composta') {
      const { a1, b1, a2, b2, c } = this.formCompound.getRawValue();
      const A1 = this.clean(a1), B1 = this.clean(b1);
      const A2 = this.clean(a2), B2 = this.clean(b2), C = this.clean(c);

      if (!A1 || !B1 || !A2 || !B2 || !C) return;

      const x = (B1 / A1) * (B2 / A2) * C;
      this.result.x = this.round(x);
      this.result.steps = [
        'Regra de 3 composta: multiplica as razões',
        `x = (b1 ÷ a1) × (b2 ÷ a2) × c`,
        `x = (${B1} ÷ ${A1}) × (${B2} ÷ ${A2}) × ${C}`,
        `x = ${this.round(B1/A1, 4)} × ${this.round(B2/A2, 4)} × ${C}`,
        `x = ${x}`
      ];
      return;
    }

    if (this.mode === 'direta' || this.mode === 'inversa') {
      const { a, b, c } = this.formRule.getRawValue();
      const A = this.clean(a), B = this.clean(b), C = this.clean(c);

      if (!A || !B || !C) return;

      if (this.mode === 'direta') {
        // Regra de 3 direta: x = (B * C) / A
        const x = (B * C) / A;
        this.result.x = this.round(x);
        this.result.steps = [
          'Regra de 3 direta: a/b = c/x',
          `x = (b × c) ÷ a = (${B} × ${C}) ÷ ${A}`,
          `x = ${x}`
        ];
      } else {
        // Regra de 3 inversa: x = (A * B) / C
        const x = (A * B) / C;
        this.result.x = this.round(x);
        this.result.steps = [
          'Regra de 3 inversa: a×x = b×c (grandezas inversamente proporcionais)',
          `x = (a × b) ÷ c = (${A} × ${B}) ÷ ${C}`,
          `x = ${x}`
        ];
      }
      return;
    }

    // Percentual
    const { p, v, solve } = this.formPercent.getRawValue();
    const P = this.clean(p), V = this.clean(v);
    if (!P || !V) return;

    if (solve === 'pDeV') {
      // p% de V => x = (p/100) * V
      const x = (P / 100) * V;
      this.result.x = this.round(x);
      this.result.steps = [
        'Calcular p% de V',
        `x = (p ÷ 100) × V = (${P} ÷ 100) × ${V}`,
        `x = ${x}`
      ];
    } else {
      // V é P% de X => X = V / (P/100)
      const x = V / (P / 100);
      this.result.x = this.round(x);
      this.result.steps = [
        'Descobrir o total quando V é P% dele',
        `X = V ÷ (p ÷ 100) = ${V} ÷ (${P} ÷ 100)`,
        `X = ${x}`
      ];
    }
  }

  private round(n: number, d = 4) {
    const p = Math.pow(10, d);
    const val = Math.round(n * p) / p;
    // exibe como número ou string com ponto fixo curto
    return Math.abs(val) >= 1 ? Number(val.toFixed(2)) : Number(val.toString());
  }
}
