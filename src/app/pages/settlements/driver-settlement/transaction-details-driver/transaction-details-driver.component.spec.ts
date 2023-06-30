import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsDriverComponent } from './transaction-details-driver.component';

describe('TransactionDetailsDriverComponent', () => {
  let component: TransactionDetailsDriverComponent;
  let fixture: ComponentFixture<TransactionDetailsDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionDetailsDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDetailsDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
