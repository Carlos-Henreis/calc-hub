import {Component} from '@angular/core';
import { LogoComponent } from './logo/logo.component';

@Component({
  selector: 'app-home',
  imports: [
    LogoComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
