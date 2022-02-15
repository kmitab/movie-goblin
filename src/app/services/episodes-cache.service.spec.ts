import { TestBed } from '@angular/core/testing';

import { EpisodesCacheService } from './episodes-cache.service';

describe('EpisodesCacheService', () => {
  let service: EpisodesCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpisodesCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
