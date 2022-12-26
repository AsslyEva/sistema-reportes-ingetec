import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActividadEspecifica } from 'src/app/model/global/actividad_especiifica';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  url: string=environment.urlEndPoint

  constructor(
    private http: HttpClient
  ) { }

  getActividades(cod: string){
    return this.http.get<ActividadEspecifica[]>(`${this.url}actividades/listar/segmento/${cod}`)
  }
}