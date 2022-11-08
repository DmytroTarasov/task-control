import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../_models/user.model';
import { environment } from 'src/environments/environment';

describe('Auth Service', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService;
  const user = new User('bob@test.com', 'Bob', '2022-11-06', 'token');
  const messageSuccess = 'Profile was created successfully';
  const messageFailure = 'Password length must be at least 6 characters long';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('login', () => {
    it('should login the user', () => {
      let actualUser: User;
      authService
        .login(user.email, '111111')
        .subscribe((user: User) => (actualUser = user));

      const req = httpTestingController.expectOne(
        `${environment.serverUrl}/auth/login`
      );
      req.flush(user);

      expect(actualUser).toEqual(user);
    });

    it('should not login the user', () => {
      const errorEvent = new ErrorEvent('Invalid creds');
      const status = 400;
      const statusText = 'Bad request';
      let actualError;
      authService
        .login(user.email, '1111')
        .subscribe({
          error: (error) => (actualError = error)
        });

      const req = httpTestingController
        .expectOne(`${environment.serverUrl}/auth/login`);

      req.flush(errorEvent, { status, statusText });

      expect(actualError.error).toEqual(errorEvent);
      expect(actualError.status).toEqual(status);
      expect(actualError.statusText).toEqual(statusText);
    });
  });

  describe('signup', () => {
    it('should register the user', () => {
      let actualMessage: string;
      authService
        .signup(user.email, user.username, '111111')
        .subscribe((message) => (actualMessage = message));

      const req = httpTestingController.expectOne(
        `${environment.serverUrl}/auth/register`
      );
      req.flush(messageSuccess);

      expect(actualMessage).toEqual(messageSuccess);
    });

    it('should not register the user', () => {
      let actualMessage: string;
      authService
        .signup(user.email, user.username, '111111')
        .subscribe((message) => (actualMessage = message));

      const req = httpTestingController.expectOne(
        `${environment.serverUrl}/auth/register`
      );
      req.flush(messageFailure);

      expect(actualMessage).toEqual(messageFailure);
    });
  });

});
