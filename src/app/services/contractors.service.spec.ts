import { TestBed } from '@angular/core/testing';

import { ContractorsService } from './contractors.service';

describe('ContractorsService', () => {
  let service: ContractorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
