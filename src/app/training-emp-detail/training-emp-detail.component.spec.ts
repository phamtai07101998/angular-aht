import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingEmpDetailComponent } from './training-emp-detail.component';

describe('TrainingEmpDetailComponent', () => {
  let component: TrainingEmpDetailComponent;
  let fixture: ComponentFixture<TrainingEmpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingEmpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingEmpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
