import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url: string=environment.urlEndPoint

  constructor(
    private http: HttpClient
  ) { }

  login(body: any){
    return this.http.post(`${this.url}login`, body)
  }

  registrar(body: any){
    return this.http.post(`${this.url}register`, body)
  }
}
