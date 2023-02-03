import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { LoggedUser, UserInfo } from '../../model/user.model';
import { environment } from '../../../../environments/environment';

describe('LoginService', () => {
  let service: LoginService;
  let httpController: HttpTestingController;

  const url = environment.backendUrl + 'auth/login';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login and return an loggedUser', () => {
    const userInfo = new UserInfo('ivanaj0610@gmail.com', 'pass');
    const mockLoggedUser = new LoggedUser(
      'ivanaj0610@gmail.com',
      '2564501',
      '26102522',
      'client'
    );

    service.login(userInfo).subscribe((res) => {
      expect(res).toEqual(mockLoggedUser);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}`,
    });

    req.flush(mockLoggedUser);
  });
});
