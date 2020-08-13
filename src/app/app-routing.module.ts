import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForumsComponent } from './forums/forums.component';
import { ForumDetailsComponent } from './forums/forum-details/forum-details.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { PopularComponent } from './popular/popular.component';
import { NewComponent } from './new/new.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordConfirmationComponent } from './reset-password-confirmation/reset-password-confirmation.component';

const routes: Routes = [
  { path: '', component: PopularComponent },
  { path: 'popular', component: PopularComponent },
  { path: 'new', component: NewComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'forums',
    component: ForumsComponent,
  },
  {
    path: 'forum/:forumId',
    component: ForumDetailsComponent,
  },
  {
    path: 'post/:postId',
    component: PostDetailsComponent,
  },
  {
    path: 'resetPassword/:email',
    component: ResetPasswordConfirmationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
