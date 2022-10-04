import { TestBed } from '@angular/core/testing';

import { DocucumentsService } from './docucuments.service';

describe('DocucumentsService', () => {
  let service: DocucumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocucumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
