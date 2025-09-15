import { Component, ElementRef, input, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import html2canvas from 'html2canvas-pro';
import { QRCodeComponent } from 'angularx-qrcode';


@Component({
  selector: 'app-result-display',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, QRCodeComponent],
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.scss']
})
export class ResultDisplayComponent {
  @Input() resultData: any;
  @Input() userName: string = 'Usuário';
  @ViewChild('resultContainer', { static: false }) resultContainer!: ElementRef;
  qrValue: string = 'https://calchub.cahenre.com.br/saude/estilo-comunicacao';
  currentDate: string = new Date().toLocaleDateString('pt-BR');

  async shareResult(): Promise<void> {
    await document.fonts.ready;

    const container = document.getElementById('resultDisplay');
    if (!container) {
      console.error('Elemento não encontrado');
      return;
    }


    const canvas = await html2canvas(container, {
      scale: window.devicePixelRatio,
      useCORS: true,
      allowTaint: false,
      width: container.offsetWidth,
      height: container.offsetHeight,
      foreignObjectRendering: false
    });

    const blob: Blob = await new Promise(resolve => canvas.toBlob(resolve as any, 'image/png'));
     const file = new File([blob], 'certificado.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      // Web Share API v2 com arquivo
      console.log('Compartilhando via Web Share API com arquivo');
      await navigator.share({
        files: [file],
        title: 'Meu Certificado de Comunicação',
        text: 'Confira meu estilo de comunicação empresarial!'
      });
    } else {
      // Fallback: copia imagem no clipboard (base64) ou abre numa nova aba
      const dataUrl = canvas.toDataURL('image/png');
      await navigator.clipboard.writeText(dataUrl);
      alert('Link da imagem copiado para a área de transferência!');
    }
  }

  async downloadPDF(): Promise<void> {
    await this.capture();
  }

  restart(): void {
    window.location.reload();
  }

  getScoreArray() {
  if (!this.resultData?.scores) return [];
  
  const labels = {
    E: 'Social',
    A: 'Interpessoal', 
    C: 'Estruturada',
    N: 'Emocional',
    O: 'Criativa'
  };

  return Object.entries(this.resultData.scores).map(([key, value]: [string, any]) => ({
    label: labels[key as keyof typeof labels],
    value: value.toFixed(1),
    percentage: (value / 5) * 100
  }));
}

  async capture() {
  try {
    await document.fonts.ready;

    const container = document.getElementById('resultDisplay');
    if (!container) {
      console.error('Elemento não encontrado');
      return;
    }


    const canvas = await html2canvas(container, {
      scale: window.devicePixelRatio,
      useCORS: true,
      allowTaint: false,
      width: container.offsetWidth,
      height: container.offsetHeight,
      foreignObjectRendering: false
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = 'resultado-comunicacao.png';
    link.href = imgData;
    link.click();
  } catch (error) {
    console.error('Erro ao gerar imagem:', error);
  }
}
}
