import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DatosUsuarioComponent } from './usuario/datos-usuario/datos-usuario.component';
import { PostDatosComponent } from './usuario/post-datos/post-datos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DatosUsuarioComponent,
    PostDatosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    //realizar peticiones http
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
