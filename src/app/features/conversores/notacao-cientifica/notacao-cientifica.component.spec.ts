import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotacaoCientificaComponent } from './notacao-cientifica.component';

describe('NotacaoCientificaComponent', () => {
  let component: NotacaoCientificaComponent;
  let fixture: ComponentFixture<NotacaoCientificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotacaoCientificaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotacaoCientificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
