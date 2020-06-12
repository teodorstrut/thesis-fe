import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private sharedService: SharedService, private router: Router) {}
  firstName: string;
  lastName: string;
  image;
  userLoggedIn: boolean;
  colorCode: string;
  skipLinkPath: string;
  textColor: string;
  ngOnInit(): void {
    this.skipLinkPath = this.router.url + '#pagecontent';

    this.router.events.subscribe(() => {
      this.skipLinkPath = this.router.url + '#pagecontent';
    });
    this.sharedService.awaitLogInTrigger().subscribe(() => {
      this.getTokenData();
    });
    if (sessionStorage.getItem('token')) {
      this.getTokenData();
    }
  }

  getTokenData() {
    const tokenData = jwt_decode(sessionStorage.getItem('token'));
    this.firstName = tokenData.firstName;
    this.lastName = tokenData.lastName;
    this.image = tokenData.image;
    this.colorCode = tokenData.colorCode;
    this.userLoggedIn = true;
    this.decideTextColor();
  }

  eraseTokenData() {
    sessionStorage.removeItem('token');
    this.firstName = null;
    this.lastName = null;
    this.image = null;
    this.colorCode = null;
    this.userLoggedIn = false;
  }

  decideTextColor() {
    const color =
      this.colorCode.charAt(0) === '#'
        ? this.colorCode.substring(1, 7)
        : this.colorCode;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    const uicolors = [r / 255, g / 255, b / 255];
    const c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > 0.179
      ? (this.textColor = '#000000')
      : (this.textColor = '#ffffff');
  }
}
