import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchviewListComponent } from './dispatchview-list.component';

describe('DispatchviewListComponent', () => {
  let component: DispatchviewListComponent;
  let fixture: ComponentFixture<DispatchviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchviewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
