import { ScrollSharedService } from './../shared-services/scroll-shared.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ForumsService } from '../services/forums.service';
import { ForumViewModel } from '../models/forum-view.model';
import { ForumFilterTypes } from '../enums/forum-filter-types.enum';
import { AuthorizationService } from '../services/authorization.service';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss'],
})
export class ForumsComponent implements OnInit, OnDestroy {
  forums: ForumViewModel[] = [];
  showCreateForum: boolean;
  filterTypes = ForumFilterTypes;
  pageIndex = 0;
  pageSize = 30;
  currentForumFilter = ForumFilterTypes.Subscribed;
  scrollSubscription: Subscription;
  constructor(
    private forumsService: ForumsService,
    private authService: AuthorizationService,
    private scrollSharedService: ScrollSharedService
  ) {}

  ngOnInit(): void {
    this.scrollSubscription = this.scrollSharedService
      .awaitScrollEvent()
      .subscribe(() => {
        this.getForums();
      });
    this.getForums();
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }

  private getForums() {
    this.forumsService
      .getForums(
        ForumFilterTypes[this.currentForumFilter],
        this.pageIndex,
        this.pageSize
      )
      .subscribe((forums: any) => {
        forums.forEach((forum) => {
          this.forums.push(forum);
        });
        this.pageIndex++;
      });
  }

  onShowCreateForum() {
    this.showCreateForum = true;
  }

  onForumCreated(event: ForumViewModel) {
    this.forums.unshift(event);
    this.showCreateForum = false;
  }

  followForum(event: any, forum: ForumViewModel) {
    if (forum.followed) {
      return;
    }
    const userId = this.authService.getCurrentUserId();
    this.forumsService.followForum(forum.id, userId).subscribe((data) => {
      forum.followed = true;
      forum.followers++;
    });
  }

  unfollowForum(event: any, forum: ForumViewModel) {
    if (!forum.followed) {
      return;
    }
    const userId = this.authService.getCurrentUserId();
    this.forumsService.unfollowForum(forum.id, userId).subscribe((data) => {
      forum.followed = false;
      forum.followers--;
    });
  }

  displayDescription(text: string) {
    const lines = text.split('\n');
    const rows = lines.length;
    if (rows > 4) {
      let returnedString = '';
      for (let i = 0; i < 4; i++) {
        returnedString += lines[i] + '\n';
      }
      returnedString += '...';
      return returnedString;
    } else {
      return text;
    }
  }

  changeForumsFilterType(event: MatSelectChange) {
    this.pageIndex = 0;
    this.forums = [];
    this.getForums();
  }
}
