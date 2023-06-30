import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverBankTransactionDetailComponent } from './driver-bank-transaction-detail.component';

describe('DriverBankTransactionDetailComponent', () => {
  let component: DriverBankTransactionDetailComponent;
  let fixture: ComponentFixture<DriverBankTransactionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverBankTransactionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverBankTransactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
