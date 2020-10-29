import { TestBed } from '@angular/core/testing';

import { SharedResourceService } from './shared-resource.service';

describe('SharedResourceService', () => {
  let service: SharedResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
