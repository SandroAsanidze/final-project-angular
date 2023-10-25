import { TestBed } from '@angular/core/testing';

import { TechnicsService } from './technics.service';

describe('TechnicsService', () => {
  let service: TechnicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
