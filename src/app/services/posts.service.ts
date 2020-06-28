import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl = 'http://localhost:8080/posts';
  constructor(private http: HttpClient) {}

  public getAllPosts(forumId: number) {
    return this.http.get(this.apiUrl + '/forum/' + forumId);
  }

  public createPost(
    title: string,
    description: string,
    image: any,
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
        image,
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
}
