import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from 'src/app/models/post.model';
import { CommentModel } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { FileViewModel } from 'src/app/models/file.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private sanitizer: DomSanitizer,
    private commentService: CommentService,
    private authService: AuthorizationService
  ) {}
  post: Post;
  comments: CommentModel[];
  showCreateComments = false;
  openReplyId: number;
  oldPostDescription = '';
  editDescription = false;
  isOwner = false;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.postId) {
        this.postService.getPostById(params.postId).subscribe((data: Post) => {
          this.post = data;

          this.checkIfCurrentUserIsOwner();
          this.commentService
            .getAllCommentsForPostId(data.id)
            .subscribe((comments: CommentModel[]) => {
              this.comments = comments;
            });
        });
      }
    });
  }

  getFileContent(file: FileViewModel) {
    return (
      'data:' +
      file.type +
      ';base64,' +
      (this.sanitizer.bypassSecurityTrustUrl(file.data) as any)
        .changingThisBreaksApplicationSecurity
    );
  }

  onShowCreateComment() {
    if (this.openReplyId === -1) {
      this.openReplyId = null;
    } else {
      this.openReplyId = -1;
    }
  }

  onNewCommentCreated(newComment: CommentModel) {
    this.comments.unshift(newComment);
    this.openReplyId = null;
  }

  onReplyOpen(replyId) {
    this.openReplyId = replyId;
  }

  onCreateCommentClosed(event: any) {
    this.openReplyId = null;
  }

  updatePostDescription() {
    if (
      this.oldPostDescription === this.post.description ||
      this.post.description.length === 0
    ) {
      return;
    }
    this.postService
      .updateDescription(this.post.id, this.post.description)
      .subscribe((data) => {
        this.oldPostDescription = this.post.description;
      });
  }

  enableEditDescription() {
    if (this.isOwner) {
      this.oldPostDescription = this.post.description;
      this.editDescription = true;
      setTimeout(this.focusDescriptionTextbox, 0);
    }
  }

  focusDescriptionTextbox() {
    document.getElementById('descriptionArea').focus();
  }

  saveNewDescription() {
    this.updatePostDescription();
    this.editDescription = false;
  }

  discardDescriptionChanges() {
    this.post.description = this.oldPostDescription;
    this.editDescription = false;
  }

  private checkIfCurrentUserIsOwner() {
    this.authService.getCurrentUserId() === this.post.userId
      ? (this.isOwner = true)
      : (this.isOwner = false);
  }
}
