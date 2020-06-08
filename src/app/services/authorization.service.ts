import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/register.model';

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

  public login(loginModel: LoginModel): Observable<any> {
    return this.http.post(this.apiUrl + '/login', {
      email: loginModel.email,
      password: loginModel.password,
    });
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
