import { TestBed } from '@angular/core/testing';

import { BackofficerServiceService } from './backofficer-service.service';

describe('BackofficerServiceService', () => {
  let service: BackofficerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackofficerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
