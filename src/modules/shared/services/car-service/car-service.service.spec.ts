import { TestBed } from '@angular/core/testing';

import { CarService } from './car.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CarServiceService', () => {
  let service: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
