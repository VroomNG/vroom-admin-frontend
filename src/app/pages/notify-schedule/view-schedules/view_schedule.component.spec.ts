import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScheduleComponent } from './view_schedule.component';

describe('ViewScheduleComponent', () => {
  let component: ViewScheduleComponent;
  let fixture: ComponentFixture<RefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
