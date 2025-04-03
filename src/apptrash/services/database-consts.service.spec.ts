import { TestBed } from '@angular/core/testing';

import { DatabaseConstsService } from './database-consts.service';

describe('DatabaseConstsService', () => {
  let service: DatabaseConstsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseConstsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
