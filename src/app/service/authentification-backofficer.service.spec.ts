import { TestBed } from '@angular/core/testing';

import { AuthentificationBackofficerService } from './authentification-backofficer.service';

describe('AuthentificationBackofficerService', () => {
  let service: AuthentificationBackofficerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentificationBackofficerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
