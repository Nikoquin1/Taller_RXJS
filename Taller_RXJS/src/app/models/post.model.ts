export interface Post {
  comentarios: Comment[];
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}
