import { Component, OnInit } from '@angular/core';
import { ForumsService } from '../services/forums.service';
import { AuthorizationService } from '../services/authorization.service';
import { ForumViewModel } from '../models/forum-view.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss'],
})
export class ForumsComponent implements OnInit {
  forums: ForumViewModel[];
  showCreateForum: boolean;
  constructor(private forumsService: ForumsService) {}

  ngOnInit(): void {
    this.forumsService.getAllForums().subscribe((data: any) => {
      this.forums = data;
    });
  }

  onShowCreateForum() {
    this.showCreateForum = true;
  }

  onForumCreated(event: ForumViewModel) {
    this.forums.unshift(event);
    this.showCreateForum = false;
  }
}
