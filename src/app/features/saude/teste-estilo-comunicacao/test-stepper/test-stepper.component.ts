import { Component, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatButtonModule }  from '@angular/material/button';
import { EventEmitter } from '@angular/core';
import { AssessmentService, AssessmentResponse, AssessmentItem } from '../services/assessment.service';

@Component({
  selector: 'app-test-stepper',
  imports: [MatCardModule, MatProgressBarModule, MatRadioModule, ReactiveFormsModule, FormsModule, CommonModule, MatButtonModule],
  templateUrl: './test-stepper.component.html',
  styleUrl: './test-stepper.component.scss'
})
export class TestStepperComponent  implements OnInit {
  @Output() complete = new EventEmitter<{ scores: any; style: any }>();

  items: AssessmentItem[] = [];

  totalItems = this.items.length;
  scoresList = [1,2,3,4,5];

  currentIndex = 0;
  currentScore: number | null = null;

  cardBgColor: string = '#fff';
  fontColor: string = '#000';

  private materialColors: string[] = [
    '#F5F5F5', // grey-100
    '#E3F2FD', // blue-50
    '#E8F5E9', // green-50
    '#FFFDE7', // yellow-50
    '#FFF3E0', // orange-50
    '#F3E5F5', // purple-50
    '#E0F7FA'  // cyan-50
  ];
  constructor(private svc: AssessmentService) {}

  ngOnInit(): void {
    this.items = this.svc.getItems();
    this.totalItems = this.items.length;
    this.setRandomCardColor();
    this.loadScore();
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadScore();
    }
  }

  next(): void {
    const response: AssessmentResponse = {
      itemId: this.items[this.currentIndex].id,
      score: this.currentScore!,
      timestamp: new Date()
    };
    this.svc.saveResponse(response);

    if (this.currentIndex + 1 === this.totalItems) {
      this.finish();
    } else {
      this.currentIndex++;
      this.loadScore();
      this.setRandomCardColor();
    }
  }

  loadScore(): void {
    const allResponses = this.svc.getResponsesValue();  // use o getter
    const existing = allResponses.find(r => r.itemId === this.items[this.currentIndex].id);
    this.currentScore = existing ? existing.score : null;
  }

  finish(): void {
    const all = this.svc.getResponsesValue();
    const scores = this.svc.calculateScores(all);
    const styleKey = this.svc.determineCommunicationStyle(scores);
    const style = this.svc.getStyle(styleKey);
    this.complete.emit({ scores, style });
  }

  private setRandomCardColor(): void {
    const color = this.materialColors[Math.floor(Math.random() * this.materialColors.length)];
    this.cardBgColor = color;

    // cálculo de contraste simples (YIQ)
    const rgb = parseInt(color.substring(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    this.fontColor = yiq >= 128 ? '#000' : '#fff';
  }
}