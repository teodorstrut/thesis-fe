import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Observable, Subject } from 'rxjs';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  headerInfoLogIn = new Subject();
  headerInfoLogOut = new Subject();
  constructor() {}

  awaitLogInTrigger() {
    return this.headerInfoLogIn.asObservable();
  }

  sendLogInTrigger() {
    this.headerInfoLogIn.next();
  }

  awaitLogOutTrigger() {
    return this.headerInfoLogOut.asObservable();
  }

  sendLogOutTrigger() {
    this.headerInfoLogOut.next();
  }
}
