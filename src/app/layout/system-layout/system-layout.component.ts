import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-system-layout',
  templateUrl: './system-layout.component.html',
  styleUrls: ['./system-layout.component.scss']
})

export class SystemLayoutComponent{
  title: string = environment.systemName;
  version: string = environment.version;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    // private _authService: AuthService,
    ) {}
  ngOnInit(): void {
    // this.userdata = this._authService.usuario;
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 2000px)'])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  logout(){
    // this._authService.logout();
    Swal.fire({
      icon: "success",
      title: "Has cerrado sesión con éxito",
      text: environment.systemName,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonColor: '#00A5A5',
      confirmButtonText: '<span style="padding: 0 15px;">OK</span>'
    });
  }
}
