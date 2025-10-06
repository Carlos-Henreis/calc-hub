import { Component } from '@angular/core';

import {RouterLink} from '@angular/router';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatRipple} from '@angular/material/core';



export interface TemperaturaItem {
  id: string;
  name: string;
  overview: string;
  url: string;
}

@Component({
  selector: 'app-conversores',
  imports: [RouterLink, MatCard, MatCardTitle, MatCardContent, MatRipple],
  templateUrl: './conversores.component.html',
  styleUrl: './conversores.component.scss'
})
export class ConversoresComponent {


  items: TemperaturaItem[] = [
    {
      id: 'unidades-medida',
      name: 'Conversor de Unidades de Medida',
      overview: 'Converta comprimento, massa, volume, área e velocidade.',
      url: '/conversores/unidades-medida'
    },
    {
      id: 'tempo',
      name: 'Conversor de Tempo',
      overview: 'Converta entre segundos, minutos, horas, dias e anos.',
      url: '/conversores/tempo'
    },
    {
      id: 'armazenamento',
      name: 'Conversor de Armazenamento Digital',
      overview: 'Converta Bytes, KB, MB, GB, TB com sistema binário ou decimal.',
      url: '/conversores/armazenamento'
    },
    {
      id: 'taxa-percentual',
      name: 'Conversor de Taxa Percentual',
      overview: 'Converta entre percentual e fator decimal (ex: 12% ↔ 0.12).',
      url: '/conversores/taxa-percentual'
    },
    {
      id: 'notacao-cientifica',
      name: 'Conversor de Notação Científica',
      overview: 'Converta entre notação científica e decimal.',
      url: '/conversores/notacao-cientifica'
    },
    {
      id: 'temperatura',
      name: 'Conversor de Temperatura',
      overview: 'Converta temperaturas entre Celsius, Fahrenheit e Kelvin.',
      url: '/conversores/temperatura'
    }
  ];

}
