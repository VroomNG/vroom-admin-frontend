import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancefareviewComponent } from './distancefareview.component';

describe('DistancefareviewComponent', () => {
  let component: DistancefareviewComponent;
  let fixture: ComponentFixture<DistancefareviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistancefareviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistancefareviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
