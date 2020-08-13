import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit {
  posts: Post[] = [];
  pageIndex = 0;
  pageSize = 30;
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService
      .getPopularPosts(this.pageIndex, this.pageSize)
      .subscribe((posts: Post[]) => {
        posts.forEach((p) => this.posts.push(p));
      });
  }

  onGetMorePosts() {
    this.pageIndex++;
    this.postsService
      .getPopularPosts(this.pageIndex, this.pageSize)
      .subscribe((posts: Post[]) => {
        posts.forEach((p) => this.posts.push(p));
      });
  }
}
