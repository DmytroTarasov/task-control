import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User } from '../_models/user.model';
import { environment } from 'src/environments/environment';

describe('Auth Service', () => {
  let httpMock: HttpTestingController;
  let authService: AuthService;
  const user = new User('bob@test.com', 'Bob', '2022-11-06', 'token');
  const resSuccess = { message: 'Profile was created successfully' };
  const resFailure = { message: 'Password length must be at least 6 characters long' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('login', () => {
    it('should login the user', () => {
      authService
        .login(user.email, '111111')
        .subscribe(user => expect(user).toEqual(user));

      const req = httpMock.expectOne(`${environment.serverUrl}/auth/login`);
      req.flush(user);
    });

    it('should not login the user', () => {
      const errorEvent = new ErrorEvent('Invalid creds');
      const status = 400;
      const statusText = 'Bad request';
      authService
        .login(user.email, '1111')
        .subscribe({
          error: (error) => {
            expect(error.error).toEqual(errorEvent);
            expect(error.status).toEqual(status);
            expect(error.statusText).toEqual(statusText);
          }
        });

      const req = httpMock.expectOne(`${environment.serverUrl}/auth/login`);
      req.flush(errorEvent, { status, statusText });
    });
  });

  describe('signup', () => {
    it('should register the user', () => {
      authService
        .signup(user.email, user.username, '111111')
        .subscribe((res) => expect(res).toEqual(resSuccess));

      const req = httpMock.expectOne(`${environment.serverUrl}/auth/register`);
      req.flush(resSuccess);
    });

    it('should not register the user', () => {
      authService
        .signup(user.email, user.username, '111111')
        .subscribe((res) => expect(res).toEqual(resFailure));

      const req = httpMock.expectOne(`${environment.serverUrl}/auth/register`);
      req.flush(resFailure);
    });
  });

});
