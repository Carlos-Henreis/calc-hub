import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {RouterLink, RouterLinkActive} from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  imports: [MatSlideToggleModule, MatIconModule, MatButtonModule, MatToolbarModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'calc-hub';

  categories = [
    { name: 'Finanças', route: '/financas' },
    { name: 'Saúde', route: '/saude' },
    { name: 'Matemática', route: '/matematica' },
    { name: 'Conversores', route: '/conversores' }
  ];
}
