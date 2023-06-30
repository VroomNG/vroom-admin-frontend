import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsRiderComponent } from './transaction-details-rider.component';

describe('TransactionDetailsRiderComponent', () => {
  let component: TransactionDetailsRiderComponent;
  let fixture: ComponentFixture<TransactionDetailsRiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionDetailsRiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDetailsRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
