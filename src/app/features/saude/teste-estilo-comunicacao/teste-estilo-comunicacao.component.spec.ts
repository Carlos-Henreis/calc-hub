import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteEstiloComunicacaoComponent } from './teste-estilo-comunicacao.component';

describe('TesteEstiloComunicacaoComponent', () => {
  let component: TesteEstiloComunicacaoComponent;
  let fixture: ComponentFixture<TesteEstiloComunicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesteEstiloComunicacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteEstiloComunicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
