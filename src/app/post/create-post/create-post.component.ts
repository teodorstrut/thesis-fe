import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ForumViewModel } from 'src/app/models/forum-view.model';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  @Input() forumId: number;
  @Output() postAdded = new EventEmitter<any>();
  imageData: string;
  name = new FormControl('', [Validators.required]);
  description = new FormControl('');
  constructor(
    private postsService: PostsService,
    private authSerivce: AuthorizationService
  ) {}

  ngOnInit(): void {}
  onFileUploaded(event) {
    this.imageData = event;
  }

  createPost(event: any) {
    if (this.name.valid) {
      if (this.imageData) {
        this.imageData = this.imageData.replace('data:image/jpg;base64,', '');
        this.imageData = this.imageData.replace('data:image/jpeg;base64,', '');
        this.imageData = this.imageData.replace('data:image/png;base64,', '');
      }
      this.postsService
        .createPost(
          this.name.value,
          this.description.value,
          this.imageData,
          this.authSerivce.getCurrentUserId(),
          this.forumId
        )
        .subscribe((data) => {
          const newPost = this.createPostModel(data);
          this.postAdded.emit(newPost);
        });
    }
  }

  getNameErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    }
  }

  private createPostModel(data: string) {
    const newPost = new Post();
    newPost.id = parseInt(data, 10);
    newPost.title = this.name.value;
    newPost.description = this.description.value;
    newPost.userId = this.authSerivce.getCurrentUserId();
    newPost.image = this.imageData;
    newPost.likes = [];
    newPost.dislikes = [];
    return newPost;
  }
}
