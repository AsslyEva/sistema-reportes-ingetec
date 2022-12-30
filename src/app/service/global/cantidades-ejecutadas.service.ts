import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CantidadesEjecutadasService {
  url: string=environment.urlEndPoint

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  postInsertarEje(body: any){
    // let parametros = new FormData();
    // parametros.append("co_evento", body.);
    // parametros.append("co_usu", co_usu);
    // parametros.append("certificado", certificado);
    console.log(body)
    return this.http.post(`${this.url}ejecuciones/insertar`, body)
  }
}
