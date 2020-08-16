import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/register.model';
import jwt_decode from 'jwt-decode';
import { DomSanitizer } from '@angular/platform-browser';
import { PasswordChangeRequestModel } from '../models/password-change-request.model';
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getCurrentUserId() {
    return jwt_decode(localStorage.getItem('token')).userId;
  }

  public getCurrentUserFullName(): string {
    const userData = jwt_decode(localStorage.getItem('token'));
    return userData.firstName + ' ' + userData.lastName;
  }

  public getCurrentUserColorCode() {
    const userData = jwt_decode(localStorage.getItem('token'));
    return userData.colorCode;
  }

  public getCurrentUserFirstName() {
    const userData = jwt_decode(localStorage.getItem('token'));
    return userData.firstName;
  }

  public getCurrentUserLastName() {
    const userData = jwt_decode(localStorage.getItem('token'));
    return userData.firstName;
  }

  public getCurrentUserEmail() {
    const userData = jwt_decode(localStorage.getItem('token'));
    return userData.sub;
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

  public sendPasswordChangeRequest(
    changePasswordModel: PasswordChangeRequestModel
  ) {
    return this.http.post(
      this.apiUrl + '/reset-password',
      changePasswordModel,
      { responseType: 'text' }
    );
  }

  public sendPasswordChangeConfirmation(email: string) {
    return this.http.get(this.apiUrl + '/confirm-password-reset/' + email, {
      responseType: 'text',
    });
  }

  public logout() {
    return this.http.get(this.apiUrl + '/logout');
  }
}
