import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderSettlementComponent } from './rider-settlement.component';

describe('RiderSettlementComponent', () => {
  let component: RiderSettlementComponent;
  let fixture: ComponentFixture<RiderSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
