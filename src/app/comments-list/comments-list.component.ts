import { Component, OnInit, Input } from '@angular/core';
import { CommentModel } from '../models/comment.model';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent implements OnInit {
  replyToComment: number;
  @Input() level: number;
  @Input() comments: CommentModel[];
  constructor() {}

  ngOnInit(): void {}

  replyToThisComment(id: number) {
    this.replyToComment = id;
  }
}
