import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


type Regime = 'CLT' | 'PJ';

@Component({
  selector: 'app-salario-liquido',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatButtonToggleModule, MatChipsModule, MatSlideToggleModule
  ],
  templateUrl: './salario-liquido.component.html',
  styleUrls: ['./salario-liquido.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalarioLiquidoComponent {
  private fb = inject(FormBuilder);

  // ========= ⚙️ PARÂMETROS (atualize com os oficiais vigentes) =========
  // INSS progressivo (exemplo aproximado; substitua pelos números oficiais quando necessário)
  public readonly INSS_TABLE = [
    { ceil: 1412.00, rate: 0.075 },
    { ceil: 2666.68, rate: 0.09  },
    { ceil: 4000.03, rate: 0.12  },
    { ceil: 7786.02, rate: 0.14  }, // teto
  ];
  // IRRF progressivo (exemplo; substitua pelos oficiais)
  public readonly IRRF_TABLE = [
    { thr: 0.00,    rate: 0.00, ded: 0.00    },
    { thr: 2259.20, rate: 0.075, ded: 169.44 },
    { thr: 2826.65, rate: 0.15,  ded: 381.44 },
    { thr: 3751.05, rate: 0.225, ded: 662.77 },
    { thr: 4664.68, rate: 0.275, ded: 896.00 },
  ];
  public readonly DED_DEP = 189.59;       // dedução por dependente (IR)
  public readonly VT_EMPLOYEE_CAP = 0.06; // empregado paga até 6% do bruto

  // ========= UI =========
  regime: Regime = 'CLT';
  show13 = false;

  form = this.fb.group({
    bruto: [7000, [Validators.required, Validators.min(0)]],
    dependentes: [0, [Validators.required, Validators.min(0)]],
    pensao: [0, [Validators.min(0)]],
    vtPercent: [6, [Validators.min(0), Validators.max(6)]],      // % até 6
    planoSaude: [0, [Validators.min(0)]],
    outros: [0, [Validators.min(0)]],

    // férias (CLT)
    mesFerias: [false],
    diasFerias: [30, [Validators.min(0), Validators.max(30)]],

    // PJ
    pjTaxaPercent: [12, [Validators.min(0), Validators.max(35)]], // taxa total estimada (%)
  });

  // ========= RESULTADOS =========
  resPadrao: any = {};
  resFerias: any = {};
  res13: any = {};
  resPJ: any = {};

  // ========= HELPERS =========
  private clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }
  private round(n: number, d = 2) { const p = Math.pow(10, d); return Math.round(n * p) / p; }

  // INSS progressivo (empregado)
  private calcINSS(base: number): number {
    if (base <= 0) return 0;
    let prev = 0, total = 0;
    for (const b of this.INSS_TABLE) {
      const faixa = Math.min(base, b.ceil) - prev;
      if (faixa > 0) total += faixa * b.rate;
      if (base <= b.ceil) break;
      prev = b.ceil;
    }
    return this.round(total);
  }

  // IRRF (base = bruto - inss - ded.dep - pensão)
  private calcIRRF(baseIR: number): number {
    if (baseIR <= 0) return 0;
    const slab = [...this.IRRF_TABLE].reverse().find(s => baseIR >= s.thr) || this.IRRF_TABLE[0];
    const imposto = baseIR * slab.rate - slab.ded;
    return this.round(Math.max(0, imposto));
  }

  // Vale-Transporte do empregado (até 6% do bruto)
  private calcVT(bruto: number, vtPercentInput: number): number {
    const req = this.clamp((vtPercentInput || 0) / 100, 0, this.VT_EMPLOYEE_CAP);
    return this.round(bruto * req);
  }

  // ========= CÁLCULOS =========
  private calcCLTPadrao(bruto: number, deps: number, pensao: number, vtPercent: number, plano: number, outros: number) {
    const inss = this.calcINSS(bruto);
    const baseIR = Math.max(0, bruto - inss - (deps * this.DED_DEP) - pensao);
    const irrf = this.calcIRRF(baseIR);
    const vt = this.calcVT(bruto, vtPercent);
    const descontos = inss + irrf + pensao + vt + plano + outros;
    const liquido = bruto - descontos;
    return { bruto, inss, baseIR, irrf, vt, plano, outros, pensao, liquido };
  }

  // Férias (simplificado): remuneração férias = (bruto/30 * dias) * (1 + 1/3).
  // Assumimos VT=0 no mês de gozo; plano/outros/pensão mantidos.
  private calcFerias(bruto: number, dias: number, deps: number, pensao: number, plano: number, outros: number) {
    const diasValid = this.clamp(dias, 0, 30);
    const remFerias = (bruto / 30) * diasValid;
    const feriasComUmTerco = remFerias * (4/3);
    const inss = this.calcINSS(feriasComUmTerco);
    const baseIR = Math.max(0, feriasComUmTerco - inss - (deps * this.DED_DEP) - pensao);
    const irrf = this.calcIRRF(baseIR);
    const descontos = inss + irrf + pensao + plano + outros; // VT = 0
    const liquido = feriasComUmTerco - descontos;
    return { proventoFerias: feriasComUmTerco, inss, baseIR, irrf, plano, outros, pensao, liquido };
  }

  // 13º simplificado (prévia): usa bruto como base; aplica INSS + IRRF; abate pensão.
  private calc13(bruto: number, deps: number, pensao: number) {
    const inss = this.calcINSS(bruto);
    const baseIR = Math.max(0, bruto - inss - (deps * this.DED_DEP) - pensao);
    const irrf = this.calcIRRF(baseIR);
    const liquido = bruto - inss - irrf - pensao;
    return { bruto13: bruto, inss, baseIR, irrf, pensao, liquido };
  }

  // PJ (estimado): líquido = bruto - (bruto * taxa%) - plano - outros
  private calcPJ(bruto: number, taxaPercent: number, plano: number, outros: number) {
    const taxa = this.round(bruto * Math.max(0, taxaPercent) / 100);
    const descontos = taxa + plano + outros;
    const liquido = bruto - descontos;
    return { bruto, taxaPercent, taxa, plano, outros, liquido };
  }

  calcAll() {
    const v = this.form.getRawValue();
    const bruto = Number(v.bruto ?? 0);
    const deps = Number(v.dependentes ?? 0);
    const pensao = Number(v.pensao ?? 0);
    const vtPercent = Number(v.vtPercent ?? 0);
    const plano = Number(v.planoSaude ?? 0);
    const outros = Number(v.outros ?? 0);

    // CLT padrão
    this.resPadrao = this.calcCLTPadrao(bruto, deps, pensao, vtPercent, plano, outros);

    // férias
    if (v.mesFerias) {
      const dias = Number(v.diasFerias ?? 0);
      this.resFerias = this.calcFerias(bruto, dias, deps, pensao, plano, outros);
    } else {
      this.resFerias = {};
    }

    // 13º
    if (this.show13) {
      this.res13 = this.calc13(bruto, deps, pensao);
    } else {
      this.res13 = {};
    }

    // PJ
    if (this.regime === 'PJ') {
      const taxa = Number(v.pjTaxaPercent ?? 0);
      this.resPJ = this.calcPJ(bruto, taxa, plano, outros);
    } else {
      this.resPJ = {};
    }
  }
}