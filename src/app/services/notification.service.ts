import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/users';
  constructor(private http: HttpClient) {}

  public getNotifications() {
    return this.http.get(this.apiUrl + '/get-notifications');
  }

  public markNotificationAsSeen(notificationId: number) {
    return this.http.get(this.apiUrl + '/mark-as-seen/' + notificationId, {
      responseType: 'text',
    });
  }
}
