import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { catchError, forkJoin, mergeMap, of } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-post-datos',
  templateUrl: './post-datos.component.html',
  styleUrls: ['./post-datos.component.css'],
})
export class PostDatosComponent {
  @Input() userId?: number;

  usuario: User | null = null;
  publicaciones: Post[] = [];
  ROOT_URL = 'https://dummyjson.com';
  iconoReacciones: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    if (this.userId) {
      this.getUserAndPosts();
      console.log(this.userId);
    }
  }

  actualizarIconosReacciones(): void {
    this.iconoReacciones = this.publicaciones.map((post) => {
      const maxIconNumber = 5;
      let iconoNombre = '0-circle';
      if (post.reactions > 0 && post.reactions <= maxIconNumber) {
        iconoNombre = `${post.reactions}-circle`;
      }
      return `<p class="card-text"><small class="text-muted">Reacciones: <i class="bi bi-${iconoNombre}"></i></small></p>`;
    });
  }

  getUserAndPosts(): void {
    this.http
      .get<Post[]>(`${this.ROOT_URL}/posts/user/${this.userId}`)
      .pipe(
        mergeMap((postsInfo: any) => {
          this.publicaciones = postsInfo.posts;
          this.actualizarIconosReacciones();
          console.log(this.publicaciones);
          if (this.publicaciones.length > 0) {
            const commentsObservables = this.publicaciones.map((post) =>
              this.http.get<Comment[]>(
                `${this.ROOT_URL}/comments/post/${post.id}`
              )
            );
            console.log(`comentarios observables: `, commentsObservables);
            return forkJoin(commentsObservables);
          } else {
            return of([]);
          }
        })
      )
      .subscribe((allComments: Comment[][]) => {
        allComments.forEach((comments, index) => {
          console.log(`Comentarios para el post con ID ${this.publicaciones[index].id}:`, comments);
        });
      });
  }
}