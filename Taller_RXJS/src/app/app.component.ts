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
  title = 'Taller_RXJS';
  
}
