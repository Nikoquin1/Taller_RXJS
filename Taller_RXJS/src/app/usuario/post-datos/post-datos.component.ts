import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { catchError, forkJoin, mergeMap, of } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-post-datos',
  templateUrl: './post-datos.component.html',
  styleUrls: ['./post-datos.component.css']
})
export class PostDatosComponent {
  @Input() userId?: number;

  usuario: User|null = null;
  publicaciones:Post[]=[];
  ROOT_URL = 'https://dummyjson.com';
  constructor(private http: HttpClient) { }


  ngOnChanges(): void {

    if (this.userId) {

    this.getUserAndPosts();
      console.log(this.userId)
    }
  }

  getUserAndPosts(): void {
    console.log('holaaaaaaaaaaa');
    this.http.get<Post[]>(`${this.ROOT_URL}/posts/user/${this.userId}`)
      .pipe( 
        mergeMap((postsInfo: any) => {

         this.publicaciones = postsInfo.posts; 
         console.log(this.publicaciones)
          console.log("AYDUA")
          if (this.publicaciones.length > 0) {
            console.log("AYDUA")
            const commentsObservables = this.publicaciones.map(post =>
              this.http.get<Comment[]>(`${this.ROOT_URL}/comments/post/${post.id}`)
            );
            return forkJoin(commentsObservables);
          } else {
            return of([]);
          }
        }),
      )
      .subscribe((allComments: Comment[][])=> {
        allComments.forEach((comments, index) => {
          console.log(`Comentarios para el post con ID ${this.publicaciones[index].id}:`, comments);
        });
      });
  }
}
