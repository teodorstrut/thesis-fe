import { Component, OnInit } from '@angular/core';
import { ForumsService } from '../services/forums.service';
import { ForumViewModel } from '../models/forum-view.model';
import { ForumFilterTypes } from '../enums/forum-filter-types.enum';
import { ForumFilters } from '../models/forum-filters.model';

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
  constructor(private forumsService: ForumsService) {}

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
}
