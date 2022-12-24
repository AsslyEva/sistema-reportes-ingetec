import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SedesService {

  url: string=environment.urlEndPoint

  constructor(
    private http: HttpClient
  ) { }

  getSedes(){
    return this.http.get(`${this.url}sedes/listar`)
  }
}
