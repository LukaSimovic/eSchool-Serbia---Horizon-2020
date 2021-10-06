import { TestBed } from '@angular/core/testing';

import { SkolaService } from './skola.service';

describe('SkolaService', () => {
  let service: SkolaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkolaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
