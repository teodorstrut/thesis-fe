import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForumsComponent } from './forums/forums.component';
import { ForumDetailsComponent } from './forums/forum-details/forum-details.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'popular', component: HomeComponent },
  { path: 'new', component: HomeComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
