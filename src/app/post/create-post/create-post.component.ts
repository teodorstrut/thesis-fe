import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ForumViewModel } from 'src/app/models/forum-view.model';
import { Post } from 'src/app/models/post.model';
import { FileViewModel } from 'src/app/models/file.model';
import { FILE_TYPES } from 'src/app/constants';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  @Input() forumId: number;
  @Output() postAdded = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  fileData: FileViewModel;
  name = new FormControl('', [Validators.required]);
  description = new FormControl('');
  constructor(
    private postsService: PostsService,
    private authSerivce: AuthorizationService
  ) {}

  ngOnInit(): void {}
  onFileUploaded(event: FileViewModel) {
    this.fileData = event;
  }

  createPost(event: any) {
    if (this.name.valid) {
      if (this.fileData) {
        if (FILE_TYPES.indexOf(this.fileData.type) > 0) {
          this.fileData.data = this.fileData.data.replace(
            'data:' + this.fileData.type + ';base64,',
            ''
          );
        }
      }
      this.postsService
        .createPost(
          this.name.value,
          this.description.value,
          this.fileData,
          this.authSerivce.getCurrentUserId(),
          this.forumId
        )
        .subscribe((data) => {
          const newPost = this.createPostModel(data);
          this.postAdded.emit(newPost);
        });
    }
  }

  cancelCreate() {
    this.cancel.emit();
    this.name.reset();
    this.description.reset();
    this.fileData = null;
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
    newPost.file = this.fileData;
    newPost.likes = [];
    newPost.dislikes = [];
    return newPost;
  }
}
