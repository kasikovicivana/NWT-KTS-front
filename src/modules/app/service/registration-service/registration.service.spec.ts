import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { RegistrationService } from './registration.service';
import { User } from '../../model/user.model';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpController: HttpTestingController;

  const url = environment.backendUrl + 'auth/register';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RegistrationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call register and return an user', () => {
    const userInfo = new User(
      1,
      'Ivana',
      'Jankovic',
      'ivanaj0610@gmail.com',
      'pass',
      'Trebinje',
      '062545784',
      'Client'
    );
    const mockUser = new User(
      1,
      'Ivana',
      'Jankovic',
      'ivanaj0610@gmail.com',
      'pass',
      'Trebinje',
      '062545784',
      'Client'
    );

    service.registerUser(userInfo).subscribe((res) => {
      expect(res).toEqual(mockUser);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}`,
    });

    req.flush(mockUser);
  });
});
