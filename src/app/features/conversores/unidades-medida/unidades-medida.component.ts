import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

type Category = 'comprimento' | 'massa' | 'volume' | 'area' | 'velocidade';

@Component({
  selector: 'app-unidades-medida',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonToggleModule, MatIconModule, MatDividerModule
  ],
  templateUrl: './unidades-medida.component.html',
  styleUrls: ['./unidades-medida.component.scss']
})
export class UnidadesMedidaComponent {
  value: number | null = 1;
  category: Category = 'comprimento';
  fromUnit = 'm';
  toUnit = 'km';

  units: Record<Category, Array<{key: string, label: string, toBase: number}>> = {
    comprimento: [
      { key: 'mm', label: 'Milímetro (mm)', toBase: 0.001 },
      { key: 'cm', label: 'Centímetro (cm)', toBase: 0.01 },
      { key: 'm', label: 'Metro (m)', toBase: 1 },
      { key: 'km', label: 'Quilômetro (km)', toBase: 1000 },
      { key: 'in', label: 'Polegada (in)', toBase: 0.0254 },
      { key: 'ft', label: 'Pé (ft)', toBase: 0.3048 },
      { key: 'mi', label: 'Milha (mi)', toBase: 1609.34 },
    ],
    massa: [
      { key: 'mg', label: 'Miligrama (mg)', toBase: 0.001 },
      { key: 'g', label: 'Grama (g)', toBase: 1 },
      { key: 'kg', label: 'Quilograma (kg)', toBase: 1000 },
      { key: 'lb', label: 'Libra (lb)', toBase: 453.592 },
      { key: 'oz', label: 'Onça (oz)', toBase: 28.3495 },
    ],
    volume: [
      { key: 'ml', label: 'Mililitro (mL)', toBase: 0.001 },
      { key: 'l', label: 'Litro (L)', toBase: 1 },
      { key: 'm3', label: 'Metro Cúbico (m³)', toBase: 1000 },
      { key: 'gal', label: 'Galão (gal)', toBase: 3.78541 },
    ],
    area: [
      { key: 'm2', label: 'Metro Quadrado (m²)', toBase: 1 },
      { key: 'km2', label: 'Quilômetro Quadrado (km²)', toBase: 1000000 },
      { key: 'ha', label: 'Hectare (ha)', toBase: 10000 },
      { key: 'ac', label: 'Acre (ac)', toBase: 4046.86 },
    ],
    velocidade: [
      { key: 'ms', label: 'Metro/segundo (m/s)', toBase: 1 },
      { key: 'kmh', label: 'Quilômetro/hora (km/h)', toBase: 0.277778 },
      { key: 'mph', label: 'Milha/hora (mph)', toBase: 0.44704 },
    ],
  };

  get currentUnits() {
    return this.units[this.category];
  }

  get result() {
    if (this.value == null) return null;

    const fromUnitData = this.currentUnits.find(u => u.key === this.fromUnit);
    const toUnitData = this.currentUnits.find(u => u.key === this.toUnit);

    if (!fromUnitData || !toUnitData) return null;

    const baseValue = this.value * fromUnitData.toBase;
    const result = baseValue / toUnitData.toBase;

    return result.toFixed(6).replace(/\.?0+$/, '');
  }

  onCategoryChange() {
    this.fromUnit = this.currentUnits[0].key;
    this.toUnit = this.currentUnits[1]?.key || this.currentUnits[0].key;
  }
}
