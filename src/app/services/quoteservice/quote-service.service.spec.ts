import { TestBed } from '@angular/core/testing';

import { QuoteServiceService } from './quote-service.service';

describe('QuoteServiceService', () => {
  let service: QuoteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
