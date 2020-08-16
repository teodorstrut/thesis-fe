import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { FileViewModel } from 'src/app/models/file.model';
import { ScrollSharedService } from 'src/app/shared-services/scroll-shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  @Input() posts: Post[];
  @Output() getMorePosts = new EventEmitter<any>();

  scrollSubscription: Subscription;

  constructor(
    private postsService: PostsService,
    private sanitizer: DomSanitizer,
    private authService: AuthorizationService,
    private scrollSharedService: ScrollSharedService
  ) {}

  ngOnInit(): void {
    this.scrollSubscription = this.scrollSharedService
      .awaitScrollEvent()
      .subscribe((_) => this.getMorePosts.emit());
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
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
