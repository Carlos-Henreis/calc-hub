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
      id: 'temperatura',
      name: 'Conversor de Temperatura',
      overview: 'Converta temperaturas entre Celsius, Fahrenheit e Kelvin.',
      url: '/conversores/temperatura'
    }
  ];

}
