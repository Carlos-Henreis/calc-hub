import { Component } from '@angular/core';

import {RouterLink} from '@angular/router';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatRipple} from '@angular/material/core';



export interface FinancasItem {
  id: string;
  name: string;
  overview: string;
  url: string;
}

@Component({
  selector: 'app-financas',
  imports: [RouterLink, MatCard, MatCardTitle, MatCardContent, MatRipple],
  templateUrl: './financas.component.html',
  styleUrl: './financas.component.scss'
})
export class FinancasComponent {

  items: FinancasItem[] = [
    {
      id: 'salario-liquido',
      name: 'Calculadora de Salário Líquido',
      overview: 'Calcule seu salário líquido com base em descontos e impostos.',
      url: '/financas/salario-liquido'
    }
  ];

}