import { FileViewModel } from './file.model';

export class Post {
  public title: string;
  public id: number;
  public description: string;
  public file: FileViewModel;
  // Owner
  public userId: number;
  public likes: number[];
  public dislikes: number[];
  public userName: string;
  public forumName: string;
  public forumId: string;
}
