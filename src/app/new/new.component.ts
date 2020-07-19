import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  posts: Post[] = [];
  pageIndex = 0;
  pageSize = 50;
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService
      .getNewestPosts(this.pageIndex, this.pageSize)
      .subscribe((posts: Post[]) => {
        posts.forEach((p) => this.posts.push(p));
      });
  }

  onGetMorePosts() {
    this.pageIndex++;
    this.postsService
      .getNewestPosts(this.pageIndex, this.pageSize)
      .subscribe((posts: Post[]) => {
        posts.forEach((p) => this.posts.push(p));
      });
  }
}
