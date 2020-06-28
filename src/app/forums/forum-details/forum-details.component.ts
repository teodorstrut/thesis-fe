import { Component, OnInit } from '@angular/core';
import { ForumViewModel } from 'src/app/models/forum-view.model';
import { ForumsService } from 'src/app/services/forums.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.scss'],
})
export class ForumDetailsComponent implements OnInit {
  constructor(
    private forumService: ForumsService,
    private postsService: PostsService,
    private authService: AuthorizationService,
    private route: ActivatedRoute
  ) {}

  forum: ForumViewModel;
  comments: any[];
  showCreatePost = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.forumId) {
        this.forumService
          .getForumById(params.forumId)
          .subscribe((data: any) => {
            this.forum = data;
            this.postsService
              .getAllPosts(this.forum.id)
              .subscribe((posts: any) => {
                this.forum.posts = posts;
              });
          });
      }
    });
  }

  onShowCreatePost() {
    this.showCreatePost = !this.showCreatePost;
  }

  onPostAdded(newPost: Post) {
    this.forum.posts.unshift(newPost);
    this.showCreatePost = !this.showCreatePost;
  }

  followForum() {
    if (this.forum.followed) {
      return;
    }
    const userId = this.authService.getCurrentUserId();
    this.forumService.followForum(this.forum.id, userId).subscribe((data) => {
      this.forum.followed = true;
    });
  }

  unfollowForum() {
    if (!this.forum.followed) {
      return;
    }
    const userId = this.authService.getCurrentUserId();
    this.forumService.unfollowForum(this.forum.id, userId).subscribe((data) => {
      this.forum.followed = false;
    });
  }
}
