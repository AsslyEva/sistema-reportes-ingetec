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
    return this.http.post(`${this.url}login`, {name: user, password: password})
  }

  registrar(body: any){
    return this.http.post(`${this.url}register`, body)
  }
}
