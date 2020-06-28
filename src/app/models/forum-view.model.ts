import { Post } from './post.model';

export class ForumViewModel {
  id: number;
  userId: number;
  forumName: string;
  description: string;
  posts: Post[];
  followed: boolean;
  followers: number;
}
