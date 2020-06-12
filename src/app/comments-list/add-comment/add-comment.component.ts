import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CommentModel } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  @Input() isReply: boolean;
  @Input() postId: number;
  @Input() parentId: number;
  @Output() newCommentAdded = new EventEmitter<any>();
  constructor(
    private authService: AuthorizationService,
    private commentService: CommentService
  ) {}
  commentText = new FormControl('', [Validators.required]);
  ngOnInit(): void {}
  getCommentErrorMessage() {
    if (this.commentText.hasError('required')) {
      return 'Your comment cannot be empty';
    }
  }

  postComment() {
    if (this.commentText.valid) {
      const newComment = new CommentModel();
      newComment.ownerId = this.authService.getCurrentUserId();
      newComment.postId = this.postId;
      newComment.text = this.commentText.value;
      newComment.parentId = this.parentId;
      this.commentService.createComment(newComment).subscribe((data: any) => {
        newComment.id = data.id;
        this.newCommentAdded.emit(newComment);
      });
    }
  }
}
