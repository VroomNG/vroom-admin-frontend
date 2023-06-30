import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancefareComponent } from './distancefare.component';

describe('DistancefareComponent', () => {
  let component: DistancefareComponent;
  let fixture: ComponentFixture<DistancefareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistancefareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistancefareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
