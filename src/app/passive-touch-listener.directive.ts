import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: 'input[matInput]'
})
export class PassiveTouchListenerDirective implements AfterViewInit {

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit() {
    this.el.nativeElement.addEventListener('touchstart', (event) => {
      // Handler vazio, só para marcar passive event listener
    }, { passive: true });
  }
}
