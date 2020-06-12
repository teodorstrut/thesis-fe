import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  @Input() forumId: number;
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
      this.imageData = this.imageData.replace('data:image/jpg;base64,', '');
      this.imageData = this.imageData.replace('data:image/jpeg;base64,', '');
      this.imageData = this.imageData.replace('data:image/png;base64,', '');
      console.log(this.imageData);
      this.postsService
        .createPost(
          this.name.value,
          this.description.value,
          this.imageData,
          this.authSerivce.getCurrentUserId(),
          this.forumId
        )
        .subscribe((data) => {
          console.log(data);
        });
    }
  }

  getNameErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    }
  }
}
