import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/register.model';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  public getCurrentUserId() {
    return jwt_decode(sessionStorage.getItem('token')).userId;
  }

  getCurrentUserFullName(): string {
    const userData = jwt_decode(sessionStorage.getItem('token'));
    return userData.firstName + ' ' + userData.lastName;
  }

  public login(loginModel: LoginModel): Observable<any> {
    return this.http.post(
      this.apiUrl + '/login',
      {
        email: loginModel.email,
        password: loginModel.password,
      },
      { responseType: 'text' }
    );
  }

  public register(registerModel: RegisterModel): Observable<any> {
    return this.http.post(this.apiUrl + '/register', {
      email: registerModel.email,
      password: registerModel.password,
      firstName: registerModel.firstName,
      lastName: registerModel.lastName,
    });
  }
}
