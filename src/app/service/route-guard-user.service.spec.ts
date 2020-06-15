import { TestBed } from '@angular/core/testing';

import { RouteGuardUserService } from './route-guard-user.service';

describe('RouteGuardUserService', () => {
  let service: RouteGuardUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteGuardUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
