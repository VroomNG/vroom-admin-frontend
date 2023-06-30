import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverFeedComponent } from './driver-feed.component';

describe('DriverFeedComponent', () => {
  let component: DriverFeedComponent;
  let fixture: ComponentFixture<DriverFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
