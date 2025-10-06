import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasesNumericasComponent } from './bases-numericas.component';

describe('BasesNumericasComponent', () => {
  let component: BasesNumericasComponent;
  let fixture: ComponentFixture<BasesNumericasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasesNumericasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasesNumericasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
