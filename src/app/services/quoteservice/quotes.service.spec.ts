import { TestBed } from '@angular/core/testing';

import { QuoteService } from './quote-service.service';

describe('QuotesService', () => {
  let service: QuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
