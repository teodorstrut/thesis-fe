import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';
  private userProfilePictureChanged = new Subject<any>();
  constructor(private http: HttpClient) {}

  public updateUserProfileImage(userId: number, imageData) {
    return this.http.post(
      this.apiUrl + '/update-profile-photo/' + userId,
      imageData,
      { responseType: 'text' }
    );
  }

  public awaitProfilePictureChanged() {
    return this.userProfilePictureChanged.asObservable();
  }
  public sendProfilePictureChanged(profileImage: any) {
    this.userProfilePictureChanged.next(profileImage);
  }

  public getUserProfileImage(userId: number) {
    return this.http.get(this.apiUrl + '/get-profile-image/' + userId, {
      responseType: 'text',
    });
  }
}
