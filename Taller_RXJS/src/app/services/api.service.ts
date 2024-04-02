import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User,  } from '../models/user.model';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
// Importa también las otras interfaces según sea necesario

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<{ posts: Post[]; total: number; skip: number; limit: number }> {
    return this.http.get<{ posts: Post[]; total: number; skip: number; limit: number }>(`${this.baseUrl}/posts`);
  }
}
