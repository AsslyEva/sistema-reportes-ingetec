import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { ResBar, ResColumn, ResPie } from 'src/app/model/global/dashboard/dashboard';
import { DashboardRequest } from 'src/app/model/global/dashboard/dashboardRequest';
import { environment } from 'src/environments/environment';
import { AuthService } from '../global/auth.service';
import { UsersService } from '../global/users.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseEndPoint = `${environment.urlEndPoint}dashboard`;
  private httpHeader = new HttpHeaders();
  private _refresh$ = new Subject<any>();

  url: string=environment.urlEndPoint

  constructor(
    private http: HttpClient,
    private authCheckService: AuthService
  ) { }

  public getTotalBusquedas(fechaIni: String, fechaFin: String){
    return this.http.get<Response>(
      `${this.baseEndPoint}/total_busquedas?fecha_ini=${fechaIni}&fecha_fin=${fechaFin}`,

      {
        headers: this.authCheckService.obtenerDatosToken(this.httpHeader)
      }
    ).pipe(
      tap(()=>{
        this._refresh$.next('');
      }),
      catchError(e => {
        this.authCheckService.isAuthenticated();
        return throwError(e);
      })
    );
  }



  public getTotalTrabjador(fechaInicio: string, fechaFin: string): Observable<ResColumn[]>{

    return this.http.get<ResColumn[]>(
      `${this.baseEndPoint}/top5_busq_frec?fecha_ini=${fechaInicio}&fecha_fin=${fechaFin}`,
      {
        headers: this.authCheckService.obtenerDatosToken(this.httpHeader)
      }
    ).pipe(
      catchError(e =>{
        this.authCheckService.isAuthenticated();
        return throwError(e);
      })
    );

  }

  public getTotalActvidades(fechaInicio: string, fechaFin: string): Observable<ResBar[]>{

    return this.http.get<ResBar[]>(
      `${this.baseEndPoint}/top5_busq_frec?fecha_ini=${fechaInicio}&fecha_fin=${fechaFin}`,
      {
        headers: this.authCheckService.obtenerDatosToken(this.httpHeader)
      }
    ).pipe(
      catchError(e =>{
        this.authCheckService.isAuthenticated();
        return throwError(e);
      })
    );

  }

  public getTotalPie(fechaInicio: string, fechaFin: string): Observable<ResPie[]>{

    return this.http.get<ResPie[]>(
      `${this.baseEndPoint}/top5_busq_frec?fecha_ini=${fechaInicio}&fecha_fin=${fechaFin}`,
      {
        headers: this.authCheckService.obtenerDatosToken(this.httpHeader)
      }
    ).pipe(
      catchError(e =>{
        this.authCheckService.isAuthenticated();
        return throwError(e);
      })
    );

  }

}