import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpromocodeComponent } from './detailpromocode.component';

describe('DetailpromocodeComponent', () => {
  let component: DetailpromocodeComponent;
  let fixture: ComponentFixture<DetailpromocodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailpromocodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpromocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
