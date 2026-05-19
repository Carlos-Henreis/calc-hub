import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-juros-compostos',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './juros-compostos.component.html',
  styleUrl: './juros-compostos.component.scss'
})
export class JurosCompostosComponent {
  valorInicial = 1000;
  aporteMensal = 200;
  taxaMensal = 1;
  periodoMeses = 24;

  get montanteFinal(): number {
    const taxa = this.taxaMensal / 100;
    if (taxa === 0) {
      return this.valorInicial + this.aporteMensal * this.periodoMeses;
    }

    const fator = (1 + taxa) ** this.periodoMeses;
    const principal = this.valorInicial * fator;
    const aportes = this.aporteMensal * ((fator - 1) / taxa);

    return principal + aportes;
  }

  get totalInvestido(): number {
    return this.valorInicial + (this.aporteMensal * this.periodoMeses);
  }

  get jurosAcumulados(): number {
    return this.montanteFinal - this.totalInvestido;
  }

  asCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2
    });
  }
}
