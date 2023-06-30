import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSurgeSettingsComponent } from './edit-surge-settings.component';

describe('EditSurgeSettingsComponent', () => {
  let component: EditSurgeSettingsComponent;
  let fixture: ComponentFixture<EditSurgeSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSurgeSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSurgeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
