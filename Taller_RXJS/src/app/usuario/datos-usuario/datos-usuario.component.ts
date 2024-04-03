import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent {

  ROOT_URL = 'https://dummyjson.com';

  title = 'Taller_RXJS';

  txtUser: string = '';

  usuario: User|null = null;
  publicacion:Post|null=null;

  todosLosUsuarios: User[] = [];

  constructor(private http: HttpClient) { }

  searchUser() {

   this.http.get(`${this.ROOT_URL}/users/filter?key=username&value=${this.txtUser}`).subscribe({
     next: (userInfo: any) => {
      if(userInfo.users.length > 0){
        this.usuario = userInfo.users[0]
        console.log(this.usuario)
      }else{
        this.usuario = null
      }
    }
   })

}

/*
import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  ROOT_URL = 'https://dummyjson.com';

  title = 'Taller_RXJS';

  txtUser: string = '';

  usuario: User|null = null;
  publicacion:Post|null=null;

  todosLosUsuarios: User[] = [];


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
   
  
   this.getUserAndPost();
  }
ngOninit(): void {

  this.getAllUsers();
  //this.getUserAndPost();
}

ngONChange(): void {
  
  this.http.get(`${this.ROOT_URL}/user/1`).subscribe((userInfo: any) => {
    this.usuario = userInfo
    this.getPost(this.usuario!.id)
  })

  this.getUserAndPost();
}

getPost(id:number){
  

  this.http.get(this.ROOT_URL + '/post?userId ='+ id).subscribe((postInfo: any) => {
    this.publicacion=postInfo[0];
  })
}

getUserAndPost(): void {
  this.txtUser ="atuny0";
  this.http
  .get<User[]>(`${this.ROOT_URL}/users?username=${this.txtUser}`).pipe(
    mergeMap((userInfo: any) => {
      if (userInfo.length > 0) {
        this.usuario = userInfo[0]; 
        return this.http.get<Post>(this.ROOT_URL+'/posts?userId='+this.usuario!.id);
      } else {
        this.usuario = null;
        return of(0); 
      }
    })
  ).subscribe((postInfo: any) => {
    this.publicacion = postInfo[0]; 
    console.log(this.publicacion)
  });

}
getAllUsers(): void {
  this.http.get<User[]>(`${this.ROOT_URL}/users`).subscribe({
    next: (users: User[]) => {
      console.log(users);
      this.todosLosUsuarios = users;
      console.log(this.todosLosUsuarios);
    },
    error: (error) => {
      console.error('Error al obtener los usuarios', error);
    }
  });
}



}
*/
}