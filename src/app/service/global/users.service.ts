import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url: string=environment.urlEndPoint;

  constructor(
    private http: HttpClient
  ) { }

  login(user: any, password: any){
    return this.http.post(`${this.url}login`, {nombre_usuario: user, contrasena_usuario: password})
  }

  registrar(body: any){
    return this.http.post(`${this.url}register`, body)
  }

  loggedIn(){
    return (!!localStorage.getItem('token'));
  }

  isAdmin(){
    return (!!localStorage.getItem('token') && !!localStorage.getItem('rol') && localStorage.getItem('rol') == '2');
  }
}
