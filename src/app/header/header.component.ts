import { NotificationModel } from './../models/notification.model';
import { NotificationType } from './../enums/notification-type.enum';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../services/shared.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthorizationService } from '../services/authorization.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private userService: UserService,
    private authService: AuthorizationService,
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer
  ) {}
  @ViewChild('navigationPopover', { static: true })
  navigationPopover: NgbPopover;
  @ViewChild('notificationPopover', { static: true })
  notificationPopover: NgbPopover;
  firstName: string;
  lastName: string;
  image: string;
  userLoggedIn: boolean;
  colorCode: string;
  skipLinkPath: string;
  textColor: string;
  notifications: NotificationModel[];
  notificationTypes = NotificationType;
  newNotifications = false;
  ngOnInit(): void {
    this.getNotifications();
    this.userService.awaitProfilePictureChanged().subscribe((data) => {
      this.getUserProfileImage();
    });
    this.skipLinkPath = this.router.url + '#pagecontent';
    this.router.events.subscribe(() => {
      this.skipLinkPath = this.router.url + '#pagecontent';
    });
    this.sharedService.awaitLogInTrigger().subscribe(() => {
      this.getTokenData();
      this.getUserProfileImage();
      this.getNotifications();
    });
    if (localStorage.getItem('token')) {
      this.getTokenData();
      this.getUserProfileImage();
    }
  }

  getTokenData() {
    const tokenData = jwt_decode(localStorage.getItem('token'));
    this.firstName = tokenData.firstName;
    this.lastName = tokenData.lastName;
    this.colorCode = tokenData.colorCode;
    this.userLoggedIn = true;
    this.decideTextColor();
  }

  logout() {
    this.authService.logout().subscribe((data) => {
      this.eraseTokenData();
    });
  }

  eraseTokenData() {
    localStorage.removeItem('token');
    this.firstName = null;
    this.lastName = null;
    this.image = null;
    this.colorCode = null;
    this.userLoggedIn = false;
    this.router.navigate(['login']);
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

  getUserProfileImage() {
    this.userService
      .getUserProfileImage(this.authService.getCurrentUserId())
      .subscribe(
        (data: string) =>
          (this.image =
            'data:image/png;base64,' +
            (this.sanitizer.bypassSecurityTrustUrl(data) as any)
              .changingThisBreaksApplicationSecurity)
      );
  }

  navigateToPage(route: string) {
    this.router.navigate([route]);
  }

  openMenu() {
    if (!this.navigationPopover.isOpen()) {
      this.navigationPopover.open();
    } else {
      this.navigationPopover.close();
    }
  }

  getNotifications() {
    this.notificationService
      .getNotifications()
      .subscribe((data: NotificationModel[]) => {
        this.notifications = data;
        data.forEach((n) => {
          if (!n.seen) {
            this.newNotifications = true;
          }
        });
      });
  }

  getNotificationText(notificationType: string) {
    console.log(NotificationType[notificationType]);
    console.log(notificationType);
    switch (NotificationType[notificationType]) {
      case NotificationType.NewCommentOnOwnedPost:
        return 'there is a new comment on one of your posts';
      case NotificationType.NewCommentOnOwnedComment:
        return 'has replied to your comment';

      case NotificationType.NewPostOnFollowedForum:
        return 'there is a new post on a forum you are following';
    }
  }

  markNotificationAsSeen(notification: NotificationModel) {
    this.notificationService
      .markNotificationAsSeen(notification.id)
      .subscribe((data) => {
        notification.seen = true;
        this.notificationPopover.close();
      });
  }

  checkUnreadNotifications() {
    let noMoreUnreadNotifications = true;
    this.notifications.forEach((notification) => {
      if (!notification.seen) {
        noMoreUnreadNotifications = false;
      }
    });
    return noMoreUnreadNotifications;
  }
}
