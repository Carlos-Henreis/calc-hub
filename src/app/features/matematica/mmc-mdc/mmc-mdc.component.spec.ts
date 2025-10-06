import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmcMdcComponent } from './mmc-mdc.component';

describe('MmcMdcComponent', () => {
  let component: MmcMdcComponent;
  let fixture: ComponentFixture<MmcMdcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MmcMdcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmcMdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
