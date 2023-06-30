import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyScheduleComponent } from './notify-schedule.component';

describe('NotifyScheduleComponent', () => {
  let component: NotifyScheduleComponent;
  let fixture: ComponentFixture<NotifyScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
