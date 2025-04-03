import { TestBed } from '@angular/core/testing';

import { NameConverterService } from './name-converter.service';

describe('NameConverterService', () => {
  let service: NameConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
