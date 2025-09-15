import { Component } from '@angular/core';

import {RouterLink} from '@angular/router';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatRipple} from '@angular/material/core';

export interface SaudeItem {
  id: string;
  name: string;
  overview: string;
  url: string;
}


@Component({
  selector: 'app-saude',
  imports: [RouterLink, MatCard, MatCardTitle, MatCardContent, MatRipple],
  templateUrl: './saude.component.html',
  styleUrl: './saude.component.scss'
})
export class SaudeComponent {

  items: SaudeItem[] = [
    {
      id: 'imc',
      name: 'Calculadora de IMC',
      overview: 'Calcule seu Índice de Massa Corporal (IMC) com nossa ferramenta fácil de usar.',
      url: '/saude/imc'
    },
    {
      id: 'estilo-comunicacao',
      name: 'Teste de Estilo de Comunicação Empresarial',
      overview: 'Avalie seu estilo de comunicação e receba dicas personalizadas. Baseado no modelo IPIP.',
      url: '/saude/estilo-comunicacao'
    },
    {
      id: 'pace',
      name: 'Calculadora de Pace',
      overview: 'Calcule seu Pace (ritmo) em corridas e treinos.',
      url: '/saude/pace'
    },
    {
      id: 'vo2max',
      name: 'Calculadora de VO2 Max',
      overview: 'Calcule seu VO2 Max e avalie seu desempenho cardiovascular.',
      url: '/saude/vo2max'
    }
  ];

}