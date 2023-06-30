import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderReviewsComponent } from './rider-reviews.component';

describe('RiderReviewsComponent', () => {
  let component: RiderReviewsComponent;
  let fixture: ComponentFixture<RiderReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
