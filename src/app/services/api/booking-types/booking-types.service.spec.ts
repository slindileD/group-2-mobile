import { TestBed } from '@angular/core/testing';

import { BookingTypesService } from './booking-types.service';

describe('BookingTypesService', () => {
  let service: BookingTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
