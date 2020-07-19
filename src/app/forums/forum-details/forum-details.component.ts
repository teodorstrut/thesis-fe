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
  editDescription = false;
  isOwner = false;
  oldForumDescription = '';
  rows = 0;
  showMore = false;
  pageIndex = 0;
  pageSize = 50;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.forumId) {
        this.forumService
          .getForumById(params.forumId)
          .subscribe((data: any) => {
            this.forum = data;

            this.checkIfCurrentUserIsOwner();

            this.postsService
              .getPosts(this.forum.id, this.pageIndex, this.pageSize)
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
  onPostAddCancelled($event) {
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

  updateForumDescription() {
    if (
      this.oldForumDescription === this.forum.description ||
      this.forum.description.length === 0
    ) {
      return;
    }
    this.forumService
      .updateDescription(this.forum.id, this.forum.description)
      .subscribe((data) => {
        this.oldForumDescription = this.forum.description;
      });
  }

  enableEditDescription() {
    if (this.isOwner) {
      this.oldForumDescription = this.forum.description;
      this.editDescription = true;
      setTimeout(this.focusDescriptionTextbox, 0);
    }
  }

  focusDescriptionTextbox() {
    document.getElementById('descriptionArea').focus();
  }

  saveNewDescription() {
    this.updateForumDescription();
    this.editDescription = false;
  }

  discardDescriptionChanges() {
    this.forum.description = this.oldForumDescription;
    this.editDescription = false;
  }

  private checkIfCurrentUserIsOwner() {
    this.authService.getCurrentUserId() === this.forum.userId
      ? (this.isOwner = true)
      : (this.isOwner = false);
  }

  computeNumberOfRows(text: string) {
    this.rows = text.split('\n').length;
    if (!this.showMore) {
      if (this.rows > 10) {
        return 10;
      } else {
        return this.rows;
      }
    } else {
      return this.rows;
    }
  }

  toggleShowMoreDescription() {
    this.showMore = !this.showMore;
  }

  onGetMorePosts() {
    this.pageIndex++;
    this.postsService
      .getPosts(this.forum.id, this.pageIndex, this.pageSize)
      .subscribe((posts: any) => {
        posts.forEach((post) => {
          this.forum.posts.push(post);
        });
      });
  }
}
