import { Component } from '@angular/core';

import {RouterLink} from '@angular/router';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatRipple} from '@angular/material/core';

export interface MatematicaItem {
  id: string;
  name: string;
  overview: string;
  url: string;
}

@Component({
  selector: 'app-matematica',
  imports: [RouterLink, MatCard, MatCardTitle, MatCardContent, MatRipple],
  templateUrl: './matematica.component.html',
  styleUrl: './matematica.component.scss'
})


export class MatematicaComponent {

  items: MatematicaItem[] = [
    {
      id: 'calculadora-cientifica',
      name: 'Calculadora Científica',
      overview: 'Operações aritméticas, trigonométricas, logaritmos e muito mais.',
      url: '/matematica/calculadora-cientifica'
    },
    {
      id: 'equacao-2-grau',
      name: 'Equação do 2º Grau',
      overview: 'Resolva equações do segundo grau com Bhaskara. Calcula delta e raízes.',
      url: '/matematica/equacao-2-grau'
    },
    {
      id: 'regra-3',
      name: 'Regra de Três',
      overview: 'Calcule proporções com a Regra de Três (simples e composta).',
      url: '/matematica/regra-3'
    },
    {
      id: 'mmc-mdc',
      name: 'MMC, MDC e Fatoração',
      overview: 'Calcule MMC, MDC e fatoração em números primos.',
      url: '/matematica/mmc-mdc'
    },
    {
      id: 'bases-numericas',
      name: 'Conversor de Bases Numéricas',
      overview: 'Converta entre decimal, binário, octal e hexadecimal.',
      url: '/matematica/bases-numericas'
    }
  ];

}
