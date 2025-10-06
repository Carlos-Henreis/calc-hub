import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calculadora-cientifica',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, MatButtonModule, MatDividerModule, MatIconModule
  ],
  templateUrl: './calculadora-cientifica.component.html',
  styleUrls: ['./calculadora-cientifica.component.scss']
})
export class CalculadoraCientificaComponent {
  display = '0';
  currentValue = 0;
  operator = '';
  waitingForOperand = true;

  clear() {
    this.display = '0';
    this.currentValue = 0;
    this.operator = '';
    this.waitingForOperand = true;
  }

  inputDigit(digit: string) {
    if (this.waitingForOperand) {
      this.display = digit;
      this.waitingForOperand = false;
    } else {
      this.display = this.display === '0' ? digit : this.display + digit;
    }
  }

  inputDecimal() {
    if (this.waitingForOperand) {
      this.display = '0.';
      this.waitingForOperand = false;
    } else if (this.display.indexOf('.') === -1) {
      this.display += '.';
    }
  }

  performOperation(nextOperator: string) {
    const inputValue = parseFloat(this.display);

    if (this.operator && this.waitingForOperand) {
      this.operator = nextOperator;
      return;
    }

    if (this.currentValue === 0) {
      this.currentValue = inputValue;
    } else if (this.operator) {
      const result = this.calculate(this.currentValue, inputValue, this.operator);
      this.display = String(result);
      this.currentValue = result;
    }

    this.waitingForOperand = true;
    this.operator = nextOperator;
  }

  calculate(left: number, right: number, op: string): number {
    switch (op) {
      case '+': return left + right;
      case '-': return left - right;
      case '×': return left * right;
      case '÷': return left / right;
      case '^': return Math.pow(left, right);
      default: return right;
    }
  }

  calculateScientific(func: string) {
    const value = parseFloat(this.display);
    let result: number;

    switch (func) {
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'square':
        result = value * value;
        break;
      case 'inverse':
        result = 1 / value;
        break;
      default:
        return;
    }

    this.display = String(this.roundResult(result));
    this.waitingForOperand = true;
  }

  private roundResult(n: number): number {
    return Math.round(n * 1e10) / 1e10;
  }
}
