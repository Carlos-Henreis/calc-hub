import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxaPercentualComponent } from './taxa-percentual.component';

describe('TaxaPercentualComponent', () => {
  let component: TaxaPercentualComponent;
  let fixture: ComponentFixture<TaxaPercentualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxaPercentualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxaPercentualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
