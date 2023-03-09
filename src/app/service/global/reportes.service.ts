import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  url: string=environment.urlEndPoint

  constructor(
    private http: HttpClient
  ) { }

  getReportesByEje(){
    return this.http.get(`${this.url}reportes/listar`)
  }

  getReportesAgrupados(){
    return this.http.get(`${this.url}reportes/listar/agrupado`)
  }

  getReportesParticipante(id: Number){
    return this.http.get(`${this.url}reportes/listar/participantes/${id}`)
  }

  postEliminarEje(data: any){
    return this.http.post(`${this.url}reportes/eliminarEje`, data)
  }

}
