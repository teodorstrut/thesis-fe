import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private sharedService: SharedService) {}
  firstName: string;
  lastName: string;
  image;
  userLoggedIn: boolean;
  colorCode: string;
  ngOnInit(): void {
    this.sharedService.awaitLogInTrigger().subscribe(() => {
      this.getTokenData();
    });
    if (sessionStorage.getItem('token')) {
      this.getTokenData();
    }
    console.log(this.colorCode);
  }

  getTokenData() {
    const tokenData = jwt_decode(sessionStorage.getItem('token'));
    this.firstName = tokenData.firstName;
    this.lastName = tokenData.lastName;
    this.image = tokenData.image;
    this.colorCode = tokenData.colorCode;
    this.userLoggedIn = true;
  }

  eraseTokenData() {
    sessionStorage.removeItem('token');
    this.firstName = null;
    this.lastName = null;
    this.image = null;
    this.colorCode = null;
    this.userLoggedIn = false;
  }
}
