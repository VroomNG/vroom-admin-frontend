import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRidersComponent } from './report-riders.component';

describe('ReportRidersComponent', () => {
  let component: ReportRidersComponent;
  let fixture: ComponentFixture<ReportRidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
