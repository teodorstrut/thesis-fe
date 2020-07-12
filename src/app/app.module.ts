import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCommonModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationService } from './services/authorization.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedService } from './services/shared.service';
import { ForumsComponent } from './forums/forums.component';
import { ForumsService } from './services/forums.service';
import { TokenInterceptor } from './services/interceptors/token-interceptior';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateForumComponent } from './forums/create-forum/create-forum.component';
import { ForumDetailsComponent } from './forums/forum-details/forum-details.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { PostsListComponent } from './post/posts-list/posts-list.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { AddCommentComponent } from './comments-list/add-comment/add-comment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { MatSelectModule } from '@angular/material/select';
import { ScrollSharedService } from './shared-services/scroll-shared.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ForumsComponent,
    CreateForumComponent,
    ForumDetailsComponent,
    ImageUploadComponent,
    PostsListComponent,
    CreateForumComponent,
    ForumDetailsComponent,
    CreatePostComponent,
    PostDetailsComponent,
    CommentsListComponent,
    AddCommentComponent,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTooltipModule,
    MatSelectModule,
    NgbModule,
  ],
  providers: [
    AuthorizationService,
    SharedService,
    ForumsService,
    DatePipe,
    ScrollSharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
