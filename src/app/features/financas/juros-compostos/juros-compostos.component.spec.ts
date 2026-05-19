import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JurosCompostosComponent } from './juros-compostos.component';

describe('JurosCompostosComponent', () => {
  let component: JurosCompostosComponent;
  let fixture: ComponentFixture<JurosCompostosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JurosCompostosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(JurosCompostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
