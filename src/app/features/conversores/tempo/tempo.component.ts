import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

type TimeUnit = 'segundos' | 'minutos' | 'horas' | 'dias' | 'semanas' | 'meses' | 'anos';

@Component({
  selector: 'app-tempo',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonToggleModule, MatIconModule, MatDividerModule
  ],
  templateUrl: './tempo.component.html',
  styleUrls: ['./tempo.component.scss']
})
export class TempoComponent {
  value: number | null = 1;
  from: TimeUnit = 'horas';

  conversions: Record<TimeUnit, number> = {
    segundos: 1,
    minutos: 60,
    horas: 3600,
    dias: 86400,
    semanas: 604800,
    meses: 2592000,
    anos: 31536000,
  };

  get results() {
    if (this.value == null) return null;

    const baseSeconds = this.value * this.conversions[this.from];

    return {
      segundos: this.format(baseSeconds / this.conversions.segundos),
      minutos: this.format(baseSeconds / this.conversions.minutos),
      horas: this.format(baseSeconds / this.conversions.horas),
      dias: this.format(baseSeconds / this.conversions.dias),
      semanas: this.format(baseSeconds / this.conversions.semanas),
      meses: this.format(baseSeconds / this.conversions.meses),
      anos: this.format(baseSeconds / this.conversions.anos),
    };
  }

  private format(value: number): string {
    return value.toFixed(6).replace(/\.?0+$/, '');
  }
}
