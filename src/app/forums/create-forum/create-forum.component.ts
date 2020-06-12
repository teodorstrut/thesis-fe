import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ForumsService } from 'src/app/services/forums.service';
import { ForumViewModel } from 'src/app/models/forum-view.model';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-create-forum',
  templateUrl: './create-forum.component.html',
  styleUrls: ['./create-forum.component.scss'],
})
export class CreateForumComponent implements OnInit {
  @Output() forumCreated = new EventEmitter<ForumViewModel>();

  constructor(
    private forumService: ForumsService,
    private userService: AuthorizationService
  ) {}
  forumName = new FormControl('', [Validators.required]);
  description: string;
  ngOnInit(): void {
    this.description = '';
  }
  getForumNameErrorMessage() {
    if (this.forumName.hasError('required')) {
      return 'You must enter a name';
    }
  }

  createForum() {
    if (this.forumName.valid) {
      const newForum = new ForumViewModel();
      newForum.description = this.description;
      newForum.forumName = this.forumName.value;
      newForum.userId = this.userService.getCurrentUserId();
      this.forumService.createForum(newForum).subscribe((data: any) => {
        newForum.id = data.response;
        this.forumCreated.emit(newForum);
      });
    }
  }
}
