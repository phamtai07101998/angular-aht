import { TestBed } from '@angular/core/testing';

import { ContractEmpService } from './contract-emp.service';

describe('ContractEmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractEmpService = TestBed.get(ContractEmpService);
    expect(service).toBeTruthy();
  });
});
