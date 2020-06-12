export class CommentModel {
  id: number;
  ownerId: number;
  ownerName: string;
  text: string;
  replies: CommentModel[];
  postId: number;
  parentId: number;
}
