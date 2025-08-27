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
  import { SeoService } from '../../../core/seo.service';

type Unit = 'km' | 'mi';
type Mode = 'toPace' | 'toTime'; // toPace: Distância + Tempo => Pace; toTime: Distância + Pace => Tempo

@Component({
  selector: 'app-pace',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatButtonToggleModule, MatDividerModule, MatIconModule
  ],
  templateUrl: './pace.component.html',
  styleUrls: ['./pace.component.scss']
})
export class PaceComponent {
  private fb = inject(FormBuilder);
  private readonly MILE_IN_KM = 1.609344;

  unit: Unit = 'km';
  mode: Mode = 'toPace';

  // Distância + Tempo  -> Pace & Velocidade
  formToPace = this.fb.group({
    distance: [10, [Validators.required, Validators.min(0.001)]],
    hh: [0, [Validators.required, Validators.min(0)]],
    mm: [50, [Validators.required, Validators.min(0), Validators.max(59)]],
    ss: [0, [Validators.required, Validators.min(0), Validators.max(59)]],
  });

  // Distância + Pace   -> Tempo & Velocidade
  formToTime = this.fb.group({
    distance: [10, [Validators.required, Validators.min(0.001)]],
    paceMin: [5, [Validators.required, Validators.min(0)]],
    paceSec: [0, [Validators.required, Validators.min(0), Validators.max(59)]],
  });

  result = {
    pace: '' as string | '',
    speed: '' as string | '',
    totalTime: '' as string | '',
  };

  // ---------- helpers ----------
  private toSeconds(hh: number, mm: number, ss: number) { return hh * 3600 + mm * 60 + ss; }
  private toHMS(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.round(totalSeconds % 60);
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }
  private distKm(d: number) { return this.unit === 'km' ? d : d * this.MILE_IN_KM; }
  private paceToSpeedKmh(paceSecPerKm: number) { return 3600 / paceSecPerKm; }

  // ---------- cálculo principal ----------
  calc() {
    if (this.mode === 'toPace') {
      const v = this.formToPace.getRawValue();
      const dist = Number(v.distance ?? 0);
      const totalSec = this.toSeconds(Number(v.hh ?? 0), Number(v.mm ?? 0), Number(v.ss ?? 0));
      if (dist <= 0 || totalSec <= 0) { this.result = { pace:'', speed:'', totalTime:'' }; return; }

      // Pace por unidade selecionada
      const paceSecPerUnit = totalSec / dist;
      const paceMin = Math.floor(paceSecPerUnit / 60);
      const paceSec = Math.round(paceSecPerUnit % 60);

      // Velocidade média
      const speedKmh = this.distKm(dist) / (totalSec / 3600);
      const speed = this.unit === 'km' ? speedKmh : speedKmh / this.MILE_IN_KM;

      this.result = {
        pace: `${paceMin}:${paceSec.toString().padStart(2,'0')} min/${this.unit}`,
        speed: `${speed.toFixed(2)} ${this.unit}/h`,
        totalTime: this.toHMS(totalSec),
      };
    } else {
      const v = this.formToTime.getRawValue();
      const dist = Number(v.distance ?? 0);
      const paceSecPerUnit = (Number(v.paceMin ?? 0) * 60) + Number(v.paceSec ?? 0);
      if (dist <= 0 || paceSecPerUnit <= 0) { this.result = { pace:'', speed:'', totalTime:'' }; return; }

      // Tempo total
      const totalSec = dist * paceSecPerUnit;

      // Velocidade média (converter para km/h e depois ajustar unidade)
      const speedKmh = this.paceToSpeedKmh(paceSecPerUnit) * (this.unit === 'km' ? 1 : 1 / this.MILE_IN_KM);

      this.result = {
        pace: `${Math.floor(paceSecPerUnit/60)}:${Math.round(paceSecPerUnit%60).toString().padStart(2,'0')} min/${this.unit}`,
        speed: `${speedKmh.toFixed(2)} ${this.unit}/h`,
        totalTime: this.toHMS(totalSec),
      };
    }
  }

  // ---------- tabela rápida (esquerda) ----------
  // gera linhas com pace e velocidade na unidade selecionada
  get quickRows() {
    // paces base em min/km
    const basePaces = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5]; // 3:00, 3:30, 4:00, ...
    return basePaces.map(minPerKm => {
      // para mi: pace(min/mi) = pace(min/km) * 1.609344
      const paceMinPerUnit = this.unit === 'km' ? minPerKm : minPerKm * this.MILE_IN_KM;
      const speedKmh = 60 / minPerKm; // em km/h
      const speed = this.unit === 'km' ? speedKmh : speedKmh / this.MILE_IN_KM;

      const min = Math.floor(paceMinPerUnit);
      const sec = Math.round((paceMinPerUnit - min) * 60);
      return {
        pace: `${min}:${sec.toString().padStart(2,'0')} min/${this.unit}`,
        speed: `${speed.toFixed(2)} ${this.unit}/h`
      };
    });
  }
}
