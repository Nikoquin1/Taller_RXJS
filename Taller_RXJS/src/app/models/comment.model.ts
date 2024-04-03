import { User } from "./user.model";

export interface Comment {
  id: number;
  postId: number;
  body: string;
  username: string;
  userId: number;
  user: User;
}