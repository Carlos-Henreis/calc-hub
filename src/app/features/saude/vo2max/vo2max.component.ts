import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

type Unit = 'metric' | 'imperial';
type Mode = 'cooper12' | 'cooper15' | 'rockport' | 'uth';

@Component({
  selector: 'app-vo2max',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatButtonToggleModule, MatDividerModule, MatIconModule, MatChipsModule
  ],
  templateUrl: './vo2max.component.html',
  styleUrls: ['./vo2max.component.scss']
})
export class Vo2maxComponent {
  private fb = inject(FormBuilder);

  unit: Unit = 'metric';
  mode: Mode = 'cooper12';

  // --- Forms por método
  formCooper12 = this.fb.group({
    distance: [2600, [Validators.required, Validators.min(1)]], // distância em 12 min (m ou milhas)
  });

  formCooper15 = this.fb.group({
    timeMin: [12, [Validators.required, Validators.min(1)]], // tempo para 1,5 mi (em minutos)
    timeSec: [0, [Validators.required, Validators.min(0), Validators.max(59)]],
  });

  formRockport = this.fb.group({
    weight: [70, [Validators.required, Validators.min(1)]], // kg ou lb
    age: [30, [Validators.required, Validators.min(10), Validators.max(99)]],
    gender: ['male' as 'male' | 'female'], // 1 homem, 0 mulher
    timeMin: [15, [Validators.required, Validators.min(1)]], // tempo p/ 1 mi, em minutos
    timeSec: [0, [Validators.required, Validators.min(0), Validators.max(59)]],
    hr: [140, [Validators.required, Validators.min(40), Validators.max(230)]], // FC ao fim do teste
  });

  formUth = this.fb.group({
    hrMax: [190, [Validators.required, Validators.min(80), Validators.max(240)]],
    hrRest: [60, [Validators.required, Validators.min(30), Validators.max(150)]],
  });

  result: { vo2?: number; label?: string } = {};

  // --- Conversões
  private miToKm(mi: number) { return mi * 1.609344; }
  private kmToMi(km: number) { return km / 1.609344; }
  private lbToKg(lb: number) { return lb * 0.45359237; }

  // --- Classificação genérica (adultos) — aproximada
  // (Excelente > 55; Muito bom 50–55; Bom 43–49; Regular 34–42; Baixo 25–33; Muito baixo < 25)
  private classify(vo2: number): string {
    if (vo2 < 25) return 'Muito baixo';
    if (vo2 < 34) return 'Baixo';
    if (vo2 < 43) return 'Regular';
    if (vo2 < 50) return 'Bom';
    if (vo2 < 55) return 'Muito bom';
    return 'Excelente';
  }

  chipColor(label?: string): 'primary' | 'accent' | 'warn' {
    if (!label) return 'primary';
    if (['Excelente', 'Muito bom', 'Bom'].includes(label)) return 'primary';
    if (label === 'Regular') return 'accent';
    return 'warn';
  }

  round(n?: number, d = 1) {
    if (n == null || Number.isNaN(n)) return '—';
    const p = Math.pow(10, d);
    return (Math.round(n * p) / p).toFixed(d);
  }

  // --- Cálculo
  calc() {
    let vo2 = NaN;

    switch (this.mode) {
      case 'cooper12': {
        // Fórmula Cooper 12 min: VO2max = (d_m - 504.9) / 44.73
        const raw = this.formCooper12.getRawValue();
        let dMeters = Number(raw.distance ?? 0);
        if (this.unit === 'imperial') dMeters = this.miToKm(dMeters) * 1000; // valor recebido em milhas
        if (dMeters > 0) vo2 = (dMeters - 504.9) / 44.73;
        break;
      }
      case 'cooper15': {
        // Fórmula Cooper 1.5 mile run: VO2max = 3.5 + 483 / t_min
        const { timeMin, timeSec } = this.formCooper15.getRawValue();
        const t = (Number(timeMin ?? 0)) + (Number(timeSec ?? 0) / 60);
        if (t > 0) vo2 = 3.5 + 483 / t;
        break;
      }
      case 'rockport': {
        // Rockport 1-mile walk:
        // VO2max = 132.853 - 0.0769*weight(lb) - 0.3877*age + 6.315*gender - 3.2649*time(min) - 0.1565*HR
        // gender: 1 = homem, 0 = mulher
        const v = this.formRockport.getRawValue();
        let wLb = Number(v.weight ?? 0);
        if (this.unit === 'metric') wLb = this.lbToKg(wLb) ? wLb * 2.20462262 : v.weight! * 2.20462262;
        // mais claro: se unidade métrica, converter kg -> lb
        if (this.unit === 'metric') wLb = Number(v.weight ?? 0) * 2.20462262;

        const timeMin = (Number(v.timeMin ?? 0)) + (Number(v.timeSec ?? 0) / 60);
        const age = Number(v.age ?? 0);
        const genderFlag = (v.gender ?? 'male') === 'male' ? 1 : 0;
        const hr = Number(v.hr ?? 0);

        vo2 = 132.853 - (0.0769 * wLb) - (0.3877 * age) + (6.315 * genderFlag) - (3.2649 * timeMin) - (0.1565 * hr);
        break;
      }
      case 'uth': {
        // Uth–Sørensen: VO2max = 15.3 × HRmax / HRrest
        const { hrMax, hrRest } = this.formUth.getRawValue();
        const mx = Number(hrMax ?? 0), rs = Number(hrRest ?? 0);
        if (mx > 0 && rs > 0) vo2 = 15.3 * (mx / rs);
        break;
      }
    }

    if (!Number.isFinite(vo2) || vo2 <= 0) {
      this.result = {};
    } else {
      this.result = { vo2, label: this.classify(vo2) };
    }
  }
}
