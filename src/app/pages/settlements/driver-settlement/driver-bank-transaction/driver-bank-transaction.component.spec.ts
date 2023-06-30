import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverBankTransactionComponent } from './driver-bank-transaction.component';

describe('DriverBankTransactionComponent', () => {
  let component: DriverBankTransactionComponent;
  let fixture: ComponentFixture<DriverBankTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverBankTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverBankTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
