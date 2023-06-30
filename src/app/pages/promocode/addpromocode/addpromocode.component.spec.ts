import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpromocodeComponent } from './addpromocode.component';

describe('AddpromocodeComponent', () => {
  let component: AddpromocodeComponent;
  let fixture: ComponentFixture<AddpromocodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpromocodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpromocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
