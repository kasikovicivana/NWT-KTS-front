import { TestBed } from '@angular/core/testing';

import { ReviewDriverChangesService } from './review-driver-changes.service';

describe('ReviewDriverChangesServiceService', () => {
  let service: ReviewDriverChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewDriverChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
