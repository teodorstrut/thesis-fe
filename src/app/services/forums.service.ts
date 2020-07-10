import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ForumViewModel } from '../models/forum-view.model';

@Injectable({
  providedIn: 'root',
})
export class ForumsService {
  private apiUrl = 'http://localhost:8080/forums';
  constructor(private http: HttpClient) {}

  public getAllForums() {
    return this.http.get(this.apiUrl + '/all');
  }

  public createForum(forumViewModel: ForumViewModel) {
    return this.http.post(this.apiUrl + '/create', {
      userId: forumViewModel.userId,
      description: forumViewModel.description,
      forumName: forumViewModel.forumName,
    });
  }

  public getForumById(id: number) {
    return this.http.get(this.apiUrl + '/get/' + id);
  }

  public followForum(forumId, userId) {
    return this.http.get(this.apiUrl + '/follow/' + userId + '/' + forumId, {
      responseType: 'text',
    });
  }

  unfollowForum(forumId: number, userId: number) {
    return this.http.get(this.apiUrl + '/un-follow/' + userId + '/' + forumId, {
      responseType: 'text',
    });
  }

  updateDescription(forumId: number, description: string) {
    return this.http.post(
      this.apiUrl + '/update-description/' + forumId,
      description,
      { responseType: 'text' }
    );
  }
}
