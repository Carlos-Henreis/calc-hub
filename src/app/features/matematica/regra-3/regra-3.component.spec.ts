import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Regra3Component } from './regra-3.component';

describe('Regra3Component', () => {
  let component: Regra3Component;
  let fixture: ComponentFixture<Regra3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Regra3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Regra3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
