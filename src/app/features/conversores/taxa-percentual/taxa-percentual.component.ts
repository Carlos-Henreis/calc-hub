import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-taxa-percentual',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatDividerModule
  ],
  templateUrl: './taxa-percentual.component.html',
  styleUrls: ['./taxa-percentual.component.scss']
})
export class TaxaPercentualComponent {
  percentual: number | null = 12;
  decimal: number | null = 0.12;

  onPercentualChange() {
    if (this.percentual != null && Number.isFinite(this.percentual)) {
      this.decimal = Number((this.percentual / 100).toFixed(10));
    }
  }

  onDecimalChange() {
    if (this.decimal != null && Number.isFinite(this.decimal)) {
      this.percentual = Number((this.decimal * 100).toFixed(10));
    }
  }
}
