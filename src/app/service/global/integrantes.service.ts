import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class IntegrantesService {
  url: string=environment.urlEndPoint
  static codigo_integrante: any;

  constructor(
    private http: HttpClient
  ) { }

  getIntegrantesByEje(cod: string){
    return this.http.get(`${this.url}integrantes/listar/ejecucion/${cod}`)
  }

  getIntegrantesBySede(cod: string){
    return this.http.get(`${this.url}integrantes/listar/sede/${cod}`)
  }

  getDetalleIntegrante(cod: string){
    return this.http.get(`${this.url}integrantes/verDetalle/${cod}`)
  }
}
