import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileViewModel } from '../models/file.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl = 'http://localhost:8080/posts';
  constructor(private http: HttpClient) {}

  public getPosts(forumId: number, pageIndex: number, pageSize) {
    return this.http.get(
      this.apiUrl + '/forum/' + forumId + '/' + pageIndex + '/' + pageSize
    );
  }

  public createPost(
    title: string,
    description: string,
    file: FileViewModel,
    userId: number,
    forumId: number
  ) {
    return this.http.post(
      this.apiUrl + '/create',
      {
        title,
        userId,
        description,
        forumId,
        file,
      },
      { responseType: 'text' }
    );
  }

  public getPostById(postId: number) {
    return this.http.get(this.apiUrl + '/' + postId);
  }

  public likePost(postId, userId) {
    return this.http.get(this.apiUrl + '/like/' + userId + '/' + postId, {
      responseType: 'text',
    });
  }

  public dislikePost(postId, userId) {
    return this.http.get(this.apiUrl + '/dislike/' + userId + '/' + postId, {
      responseType: 'text',
    });
  }

  public updateDescription(postId: number, description: string) {
    return this.http.post(
      this.apiUrl + '/update-description/' + postId,
      description
    );
  }
}
