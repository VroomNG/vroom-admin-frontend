import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAcessTrailComponent } from './view-acess-trail.component';

describe('ViewAcessTrailComponent', () => {
  let component: ViewAcessTrailComponent;
  let fixture: ComponentFixture<ViewAcessTrailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAcessTrailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAcessTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
