import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTripsComponent } from './report-trips.component';

describe('ReportTripsComponent', () => {
  let component: ReportTripsComponent;
  let fixture: ComponentFixture<ReportTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
