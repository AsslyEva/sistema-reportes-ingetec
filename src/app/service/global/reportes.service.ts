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

  getReportesByEje(fecha_ini: any, fecha_fin:any){
    return this.http.get(`${this.url}reportes/listar/${fecha_ini}/${fecha_fin}`)
  }

  getReportesAgrupados(){
    return this.http.get(`${this.url}reportes/listar/agrupado`)
  }

  getReportesParticipante(id: Number, fecha_ini: any, fecha_fin:any){
    return this.http.get(`${this.url}reportes/listar/participantes/${id}/${fecha_ini}/${fecha_fin}`)
  }

  postEliminarEje(data: any){
    return this.http.post(`${this.url}reportes/eliminarEje`, data)
  }

  getRankingParticipante(fecha_ini: any, fecha_fin:any){
    return this.http.get(`${this.url}reportes/ranking/participantes/${fecha_ini}/${fecha_fin}`)
  }

  getRankingSedes(fecha_ini: any, fecha_fin:any){
    return this.http.get(`${this.url}reportes/ranking/sedes/${fecha_ini}/${fecha_fin}`)
  }

  getRankingActividades(fecha_ini: any, fecha_fin:any){
    return this.http.get(`${this.url}reportes/ranking/actividades/${fecha_ini}/${fecha_fin}`)
  }
}
