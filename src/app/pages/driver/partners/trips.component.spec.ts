import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPartnerComponent } from './trips.component';

describe('ViewPartnerComponent', () => {
  let component: ViewPartnerComponent;
  let fixture: ComponentFixture<RefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
