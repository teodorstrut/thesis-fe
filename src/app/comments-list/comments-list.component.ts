import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentModel } from '../models/comment.model';
import { DatePipe } from '@angular/common';
import { DATE_FORMAT } from '../constants';
import { CommentService } from '../services/comment.service';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent implements OnInit {
  @Input() level: number;
  @Input() comments: CommentModel[];
  @Input() openReplyCommentId: number;
  @Input() oldComment: string;
  @Output() replyOpen = new EventEmitter<number>();
  currentUserId: number;
  showEditable: number;
  constructor(
    private datePipe: DatePipe,
    private commentService: CommentService,
    private authService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
  }

  replyToThisComment(id: number) {
    this.openReplyCommentId = id;
    this.replyOpen.emit(id);
  }

  onAddCommentClosed(event: any) {
    this.openReplyCommentId = null;
  }

  onCommentAdded(parentComment: CommentModel, event: any) {
    parentComment.replies.unshift(event);
    this.openReplyCommentId = null;
  }

  onReplyOpen(event: number) {
    this.replyOpen.emit(event);
  }

  getDate(date: Date) {
    return this.datePipe.transform(date, DATE_FORMAT);
  }

  showEditComment(comment: any) {
    comment.oldComment = comment.text;
    comment.showEditable = true;
  }

  cancelEditComment(comment) {
    comment.text = comment.oldComment;
    comment.oldComment = undefined;
    comment.showEditable = false;
  }

  updateComment(comment) {
    this.commentService
      .updateComment(comment.id, comment.text)
      .subscribe((data) => {
        comment.oldComment = undefined;
        comment.showEditable = false;
      });
  }

  removeComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe((data) => {
      this.comments.splice(
        this.comments.findIndex((c) => c.id === commentId),
        1
      );
    });
  }

  getCommentRows(text: string) {
    return text.split('\n').length;
  }
}
