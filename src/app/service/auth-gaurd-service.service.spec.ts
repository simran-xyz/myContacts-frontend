import { TestBed } from '@angular/core/testing';

import { AuthGaurdServiceService } from './auth-gaurd-service.service';

describe('AuthGaurdServiceService', () => {
  let service: AuthGaurdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGaurdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
