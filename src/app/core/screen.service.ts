import { Injectable, computed, Signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  // Signals para breakpoints específicos
  private handsetSignal: Signal<boolean>;
  private tabletSignal: Signal<boolean>;

  // Computed para cada tipo
  isHandset = computed(() => this.handsetSignal());
  isTablet = computed(() => this.tabletSignal());
  isDesktop = computed(() => !this.isHandset() && !this.isTablet());

  // Tipo atual de tela
  currentScreen = computed<'handset' | 'tablet' | 'desktop'>(() => {
    if (this.isHandset()) return 'handset';
    if (this.isTablet()) return 'tablet';
    return 'desktop';
  });

  constructor(private breakpointObserver: BreakpointObserver) {
    this.handsetSignal = toSignal(
      this.breakpointObserver
        .observe([Breakpoints.Handset])
        .pipe(map(result => result.matches)),
      { initialValue: false }
    );

    this.tabletSignal = toSignal(
      this.breakpointObserver
        .observe([Breakpoints.Tablet])
        .pipe(map(result => result.matches)),
      { initialValue: false }
    );
  }
}