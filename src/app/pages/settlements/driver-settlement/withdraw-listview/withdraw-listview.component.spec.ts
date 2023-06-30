import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawListviewComponent } from './withdraw-listview.component';

describe('WithdrawListviewComponent', () => {
  let component: WithdrawListviewComponent;
  let fixture: ComponentFixture<WithdrawListviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawListviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
