import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversoresComponent } from './conversores.component';

describe('ConversoresComponent', () => {
  let component: ConversoresComponent;
  let fixture: ComponentFixture<ConversoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
