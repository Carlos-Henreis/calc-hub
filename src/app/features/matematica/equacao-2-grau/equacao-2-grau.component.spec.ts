import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Equacao2GrauComponent } from './equacao-2-grau.component';

describe('Equacao2GrauComponent', () => {
  let component: Equacao2GrauComponent;
  let fixture: ComponentFixture<Equacao2GrauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Equacao2GrauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Equacao2GrauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
