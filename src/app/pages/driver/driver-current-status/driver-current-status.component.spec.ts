import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCurrentStatusComponent } from './driver-current-status.component';

describe('DriverCurrentStatusComponent', () => {
  let component: DriverCurrentStatusComponent;
  let fixture: ComponentFixture<DriverCurrentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverCurrentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverCurrentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
