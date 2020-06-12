import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from 'src/app/models/post.model';
import { CommentModel } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';

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
    private commentService: CommentService
  ) {}
  post: Post;
  comments: CommentModel[];
  showCreateComments = false;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.postId) {
        this.postService.getPostById(params.postId).subscribe((data: Post) => {
          this.post = data;
          this.commentService
            .getAllCommentsForPostId(data.id)
            .subscribe((comments: CommentModel[]) => {
              this.comments = comments;
            });
        });
      }
    });
  }

  getImageContent(image: string) {
    return (
      'data:image/png;base64,' +
      (this.sanitizer.bypassSecurityTrustUrl(image) as any)
        .changingThisBreaksApplicationSecurity
    );
  }

  onShowCreateComment() {
    this.showCreateComments = !this.showCreateComments;
  }

  onNewCommentCreated(newComment: CommentModel) {
    this.showCreateComments = false;
  }
}
