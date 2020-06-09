import { Component, OnInit } from '@angular/core';
import { ForumViewModel } from 'src/app/models/forum-view.model';
import { ForumsService } from 'src/app/services/forums.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.scss'],
})
export class ForumDetailsComponent implements OnInit {
  constructor(
    private forumService: ForumsService,
    private route: ActivatedRoute
  ) {}
  forum: ForumViewModel;
  comments: any[];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.forumId) {
        this.forumService
          .getForumById(params.forumId)
          .subscribe((data: any) => {
            this.forum = data;
          });
      }
    });
  }
}
