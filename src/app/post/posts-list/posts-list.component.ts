import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ForumViewModel } from 'src/app/models/forum-view.model';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  @Input() forum: ForumViewModel;
  posts: Post[];

  constructor(
    private postsService: PostsService,
    private sanitizer: DomSanitizer,
    private authService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.posts = this.forum.posts;
  }

  getImageContent(image: string) {
    return (
      'data:image/png;base64,' +
      (this.sanitizer.bypassSecurityTrustUrl(image) as any)
        .changingThisBreaksApplicationSecurity
    );
  }

  isLikedByCurrentUser(likeList: number[]) {
    if (likeList.indexOf(this.authService.getCurrentUserId()) > -1) {
      return 'text-web-primary';
    }
  }

  isDislikedByCurrentUser(dislikeList: number[]) {
    if (dislikeList.indexOf(this.authService.getCurrentUserId()) > -1) {
      return 'text-web-primary';
    }
  }

  likePost(event: any, post: Post) {
    if (post.likes.indexOf(this.authService.getCurrentUserId()) > -1) {
      return;
    }
    if (post.dislikes.indexOf(this.authService.getCurrentUserId()) > -1) {
      post.dislikes.splice(
        post.dislikes.indexOf(this.authService.getCurrentUserId()),
        1
      );
    }
    this.postsService
      .likePost(post.id, this.authService.getCurrentUserId())
      .subscribe((data) => {
        post.likes.push(this.authService.getCurrentUserId());
      });
  }

  dislikePost(event: any, post: Post) {
    if (post.dislikes.indexOf(this.authService.getCurrentUserId()) > -1) {
      return;
    }
    if (post.likes.indexOf(this.authService.getCurrentUserId()) > -1) {
      post.likes.splice(
        post.likes.indexOf(this.authService.getCurrentUserId()),
        1
      );
    }
    this.postsService
      .dislikePost(post.id, this.authService.getCurrentUserId())
      .subscribe((data) => {
        post.dislikes.push(this.authService.getCurrentUserId());
      });
  }
}
