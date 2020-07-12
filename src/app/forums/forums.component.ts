import { Component, OnInit } from '@angular/core';
import { ForumsService } from '../services/forums.service';
import { ForumViewModel } from '../models/forum-view.model';
import { ForumFilterTypes } from '../enums/forum-filter-types.enum';
import { ForumFilters } from '../models/forum-filters.model';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss'],
})
export class ForumsComponent implements OnInit {
  forumFilters: ForumFilters;
  forums: ForumViewModel[];
  showCreateForum: boolean;
  filterTypes = ForumFilterTypes;
  constructor(
    private forumsService: ForumsService,
    private authService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.forumsService.getAllForums().subscribe((data: any) => {
      this.forums = data;
    });
    this.forumFilters = new ForumFilters();
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
}
