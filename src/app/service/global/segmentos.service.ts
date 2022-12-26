import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Segmento } from 'src/app/model/global/segmento';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SegmentosService {
  url: string=environment.urlEndPoint

  constructor(
    private http: HttpClient
  ) { }

  getSegmentos(cod: string){
    return this.http.get<Segmento[]>(`${this.url}segmento/listar/sede/${cod}`)
  }
}
