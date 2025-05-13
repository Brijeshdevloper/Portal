import { TestBed } from '@angular/core/testing';

import { SignalRServiceServiceTsService } from './signal-rservice.service.ts.service';

describe('SignalRServiceServiceTsService', () => {
  let service: SignalRServiceServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalRServiceServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
