import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vo2maxComponent } from './vo2max.component';

describe('Vo2maxComponent', () => {
  let component: Vo2maxComponent;
  let fixture: ComponentFixture<Vo2maxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vo2maxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vo2maxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
