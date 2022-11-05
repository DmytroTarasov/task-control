import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<User>(`${environment.serverUrl}/auth/login`, {
      email,
      password,
    });
  }

  signup(email: string, username: string, password: string) {
    return this.http.post<{ message: string }>(
      `${environment.serverUrl}/auth/register`,
      {
        email,
        password,
        username,
      }
    );
  }
}
