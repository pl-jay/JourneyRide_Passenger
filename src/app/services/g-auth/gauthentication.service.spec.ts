import { TestBed } from '@angular/core/testing';

import { GauthenticationService } from './gauthentication.service';

describe('GauthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GauthenticationService = TestBed.get(GauthenticationService);
    expect(service).toBeTruthy();
  });
});
