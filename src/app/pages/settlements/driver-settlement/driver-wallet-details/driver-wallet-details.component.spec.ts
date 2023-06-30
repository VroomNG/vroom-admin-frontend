import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverWalletDetailsComponent } from './driver-wallet-details.component';

describe('DriverWalletDetailsComponent', () => {
  let component: DriverWalletDetailsComponent;
  let fixture: ComponentFixture<DriverWalletDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverWalletDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverWalletDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
