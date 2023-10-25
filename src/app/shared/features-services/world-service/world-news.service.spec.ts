import { TestBed } from '@angular/core/testing';

import { WorlNewsService } from './world-news.service';

describe('WorlNewsService', () => {
  let service: WorlNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorlNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
