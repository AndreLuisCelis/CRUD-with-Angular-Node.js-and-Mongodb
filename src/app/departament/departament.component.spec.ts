import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentComponent } from './departament.component';

describe('DepartamentComponent', () => {
  let component: DepartamentComponent;
  let fixture: ComponentFixture<DepartamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
