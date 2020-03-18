import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingEmpComponent } from './training-emp.component';

describe('TrainingEmpComponent', () => {
  let component: TrainingEmpComponent;
  let fixture: ComponentFixture<TrainingEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
