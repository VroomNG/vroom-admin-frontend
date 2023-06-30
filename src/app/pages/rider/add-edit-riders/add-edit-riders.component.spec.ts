import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRidersComponent } from './add-edit-riders.component';

describe('AddEditRidersComponent', () => {
  let component: AddEditRidersComponent;
  let fixture: ComponentFixture<AddEditRidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditRidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
