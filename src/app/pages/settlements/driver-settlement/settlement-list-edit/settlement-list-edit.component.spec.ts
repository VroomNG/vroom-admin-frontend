import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementListEditComponent } from './settlement-list-edit.component';

describe('SettlementListEditComponent', () => {
  let component: SettlementListEditComponent;
  let fixture: ComponentFixture<SettlementListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
