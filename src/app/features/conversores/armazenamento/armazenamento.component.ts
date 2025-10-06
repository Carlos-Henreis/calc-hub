import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';

type StorageUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';

@Component({
  selector: 'app-armazenamento',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonToggleModule, MatIconModule, MatDividerModule, MatRadioModule
  ],
  templateUrl: './armazenamento.component.html',
  styleUrls: ['./armazenamento.component.scss']
})
export class ArmazenamentoComponent {
  value: number | null = 1;
  from: StorageUnit = 'GB';
  system: 'binary' | 'decimal' = 'binary';

  get multiplier() {
    return this.system === 'binary' ? 1024 : 1000;
  }

  get results() {
    if (this.value == null) return null;

    const units: StorageUnit[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const fromIndex = units.indexOf(this.from);
    const mult = this.multiplier;

    const bytes = this.value * Math.pow(mult, fromIndex);

    const result: Record<string, string> = {};
    units.forEach((unit, index) => {
      const value = bytes / Math.pow(mult, index);
      result[unit] = value.toFixed(6).replace(/\.?0+$/, '');
    });

    return result;
  }

  get systemLabel() {
    return this.system === 'binary' ? 'Binário (1024)' : 'Decimal (1000)';
  }
}
