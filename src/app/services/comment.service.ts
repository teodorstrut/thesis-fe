import { Injectable } from '@angular/core';
import { CommentModel } from '../models/comment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8080/comments';

  createComment(comment: CommentModel) {
    return this.http.post(this.apiUrl + '/create', comment);
  }

  getAllCommentsForPostId(postId: number) {
    return this.http.get(this.apiUrl + '/get/' + postId);
  }

  deleteComment(commentId) {
    return this.http.delete(this.apiUrl + '/remove/' + commentId, {
      responseType: 'text',
    });
  }

  updateComment(commentId: any, newComment: any) {
    return this.http.post(this.apiUrl + '/update/' + commentId, newComment, {
      responseType: 'text',
    });
  }
}
