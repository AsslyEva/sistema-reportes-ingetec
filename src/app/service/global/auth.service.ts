import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _token : any ;

  constructor() { }

  // private jwtservice: JwtHelperService = new JwtHelperService();

  public get token(): string | null {
    if (this._token != null) {
      return this._token;
    } else if (
      this._token == null &&
      localStorage.getItem("tokenCapacitaciones") != null
    ) {
      this._token = String(localStorage.getItem("tokenCapacitaciones"));
      return this._token;
    }
    return null;
  }

  obtenerDatosToken( accesstoken: any ): any {
    if (accesstoken != null) {
      // return this.jwtservice.decodeToken(accesstoken);
    }
    return null;
  }

  isAuthenticated () {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }
}
