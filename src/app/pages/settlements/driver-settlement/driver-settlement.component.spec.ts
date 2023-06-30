import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSettlementComponent } from './driver-settlement.component';

describe('DriverSettlementComponent', () => {
  let component: DriverSettlementComponent;
  let fixture: ComponentFixture<DriverSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
