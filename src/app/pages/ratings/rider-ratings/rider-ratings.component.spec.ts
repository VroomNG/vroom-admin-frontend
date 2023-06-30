import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderRatingsComponent } from './rider-ratings.component';

describe('RiderRatingsComponent', () => {
  let component: RiderRatingsComponent;
  let fixture: ComponentFixture<RiderRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
