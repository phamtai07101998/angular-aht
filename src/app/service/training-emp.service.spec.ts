import { TestBed } from '@angular/core/testing';

import { TrainingEmpService } from './training-emp.service';

describe('TrainingEmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainingEmpService = TestBed.get(TrainingEmpService);
    expect(service).toBeTruthy();
  });
});
