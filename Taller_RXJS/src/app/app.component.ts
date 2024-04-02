import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import { of } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

ROOT_URL = 'https://jsonplaceholder.typicode.com';

  title = 'Taller_RXJS';

  txtUser: string = '';

  usuario: User|null = null;
  publicacion:Post|null=null;

  constructor(private http: HttpClient) { }

  $user: Observable<any> = new Observable();

  searchUser() {
    /*
    this.$user = this.http.get(`${this.ROOT_URL}/users/1`);
    this.$user.subscribe(userInfo => {
      this.usuario = userInfo
    }
    
   this.http.get(`${this.ROOT_URL}/users/1`).subscribe((userInfo: any) => {
     this.usuario = userInfo
   }
   );*/
   /*
   this.http.get(`${this.ROOT_URL}/users?username=${this.txtUser}`).subscribe({
     next: (userInfo: any) => {
      if(userInfo.length > 0){
        this.usuario = userInfo[0]
      }else{
        this.usuario = null
      }
    }
   })
   */
   this.getUserAndPost();

  }
ngOninit(): void {
  this.http.get(`${this.ROOT_URL}/user/1`).subscribe((userInfo: any) => {
    this.usuario = userInfo
    this.getPost(this.usuario!.id)
  })
}
getPost(id:number){
  this.http.get(this.ROOT_URL + '/post?userId ='+ id).subscribe((postInfo: any) => {
    this.publicacion=postInfo[0];
  })
}

getUserAndPost(): void {
  this.http
  .get<User[]>(`${this.ROOT_URL}/users?username=${this.txtUser}`).pipe(
    mergeMap((userInfo: any) => {
      if (userInfo.length > 0) {
        this.usuario = userInfo[0]; // Selecciona el primer usuario encontrado
        return this.http.get<Post>(this.ROOT_URL+'/posts?userId='+this.usuario!.id);
      } else {
        this.usuario = null;
        return of(0); // Emite un array vacío si no se encuentra ningún usuario
      }
    })
  ).subscribe((postInfo: any) => {
    this.publicacion = postInfo[0]; // Asigna el primer post encontrado o null si no hay posts
  });
}


}
