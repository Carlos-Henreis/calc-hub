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
      id: 'regra-3',
      name: 'Regra de Três',
      overview: 'Calcule proporções com a Regra de Três.',
      url: '/matematica/regra-3'
    }
  ];

}