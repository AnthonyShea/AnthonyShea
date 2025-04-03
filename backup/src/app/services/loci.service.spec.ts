import { TestBed } from '@angular/core/testing';

import { LociService } from './loci.service';

describe('LociService', () => {
  let service: LociService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LociService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
