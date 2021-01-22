import { TestBed } from '@angular/core/testing';

import { ServerTimerService } from './server-timer.service';

describe('ServerTimerService', () => {
  let service: ServerTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
