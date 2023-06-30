import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCouponUseComponent } from './view-coupon-use.component';

describe('ViewCouponUseComponent', () => {
  let component: ViewCouponUseComponent;
  let fixture: ComponentFixture<ViewCouponUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCouponUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCouponUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
