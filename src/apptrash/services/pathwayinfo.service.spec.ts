import { TestBed } from '@angular/core/testing';

import { PathwayinfoService } from './pathwayinfo.service';

describe('PathwayinfoService', () => {
  let service: PathwayinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathwayinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
