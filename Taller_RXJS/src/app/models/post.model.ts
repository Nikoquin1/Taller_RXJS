import { Comment } from './comment.model'; 

export interface Post {
  comments: Comment[];
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}
