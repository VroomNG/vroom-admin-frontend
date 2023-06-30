import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetryMTDComponent } from './retry-mtd.component';

describe('RetryMTDComponent', () => {
  let component: RetryMTDComponent;
  let fixture: ComponentFixture<RetryMTDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetryMTDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetryMTDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
