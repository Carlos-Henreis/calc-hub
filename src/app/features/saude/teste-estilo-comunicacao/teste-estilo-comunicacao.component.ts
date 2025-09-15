import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule }   from '@angular/material/input';
import { MatButtonModule }  from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { TestStepperComponent } from './test-stepper/test-stepper.component';
import { ResultDisplayComponent } from './result-display/result-display.component';
import { ScreenService } from '../../../core/screen.service';


@Component({
  selector: 'app-teste-estilo-comunicacao',
  standalone: true,
  imports: [MatIconModule, MatCardModule,MatStepperModule, MatInputModule, MatButtonModule, ReactiveFormsModule, TestStepperComponent, ResultDisplayComponent, CommonModule],
  templateUrl: './teste-estilo-comunicacao.component.html',
  styleUrls: ['./teste-estilo-comunicacao.component.scss']
})
export class TesteEstiloComunicacaoComponent implements OnInit {

  welcomeForm!: FormGroup;
  instructionForm!: FormGroup;
  testForm!: FormGroup;
  resultForm!: FormGroup; 
  resultData?: any;
  step = 0;
  orientation: 'horizontal' | 'vertical' = 'horizontal';
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private fb: FormBuilder, private screenService: ScreenService) {}

  ngOnInit(): void {
    this.welcomeForm = this.fb.group({ name: ['', Validators.required] });
    this.instructionForm = this.fb.group({ next: [false, Validators.requiredTrue] });
    this.testForm = this.fb.group({ completed: [false, Validators.requiredTrue] });
    this.resultForm = this.fb.group({ reviewed: [true] });
    // Ajusta orientação do stepper se for mobile
    this.orientation = this.screenService.isHandset() ? 'vertical' : 'horizontal';
  }

  startTest(): void {
    this.instructionForm.get('next')?.setValue(true);
    this.stepper.next();
  }

  onStepChange(event: any): void {
    this.step = event.selectedIndex;
  }

  onTestComplete(data: { scores: any; style: any }): void {
    this.resultData = data;
    this.testForm.get('completed')!.setValue(true);
    this.stepper.next();
  }
}