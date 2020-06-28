export class Post {
  public title: string;
  public id: number;
  public description: string;
  public image: any;
  // Owner
  public userId: number;
  public likes: number[];
  public dislikes: number[];
}
