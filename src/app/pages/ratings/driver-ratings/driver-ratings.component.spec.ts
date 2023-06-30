import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRatingsComponent } from './driver-ratings.component';

describe('DriverRatingsComponent', () => {
  let component: DriverRatingsComponent;
  let fixture: ComponentFixture<DriverRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
