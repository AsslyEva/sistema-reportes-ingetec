import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';
// import { AuthService } from 'src/app/service/auth/auth.service';
// import Swal, { SweetAlertIcon } from 'sweetalert2';
     
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: string = environment.systemName;
  version: string = environment.version;
  hide = true;
  formLogin !: FormGroup;

  get usuarioForm(){
    return this.formLogin.get('usuario')
  }
  get passwordForm(){
    return this.formLogin.get('password')
  }

  constructor(
    private router: Router,
    // private authService: AuthService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.formLogin = new FormGroup({
      // usuario: new FormControl('', [Validators.required]),
      // password: new FormControl('', [Validators.required]),
    });
  }

  login () {
    // this.spinner.hide();
    this.router.navigate(["/usuario"]);

    // let username = this.formLogin.get('usuario')?.value;
    // let pass = this.formLogin.get('password')?.value;

    // if ( this.formLogin.valid) {
    //   this.spinner.show();
    //   this.authService.login(username, pass).subscribe(

    //     (response) => {
    //       this.spinner.hide();
    //       this.authService.saveUser(response.access_token);
    //       this.authService.saveToken(response.access_token);
    //       this.router.navigate(["/administrador"]);
    //       Swal.fire(
    //         `Hola ${this.authService.usuario.fullName} has iniciado sesión con éxito.`,
    //         environment.systemName,
    //         'success'
    //       )
    //     },
    //     (err) => {
    //       this.spinner.hide();

    //       if (err.status != 500) {

    //         let errorIcon = "error" ;
    //         let errorTitle = "Error no especifico al momento de ingresar al módulo";
    //         let errorDescription = "Por favor comunicarse con soporte del " + environment.systemName;

    //         switch ( err.status ) {
    //           case 400:
    //             errorTitle = err.error.error_description;
    //             if ( err.error.error == "invalid_grant" ) {//valida si usuario o contraseña no coincide
    //               errorDescription = "Por favor verificar si sus credenciales son correctas";
    //             }
    //             break;
    //           case 401:
    //             errorIcon = "info";
    //             errorTitle = err.error.error_description;
    //             errorDescription = "Por favor enviar este mensaje a la mesa de ayuda de su Zona Registral para mejor detalle";
    //             break;
    //           case 403:
    //             errorIcon = "warning";
    //             errorTitle = err.error.error_description;
    //             break;
    //           case 0:
    //             errorTitle = "El servidor del sistema se encuentra en actualización o apagado";
    //             break;
    //         }

    //         Swal.fire({
    //           icon: errorIcon as SweetAlertIcon,
    //           title: errorTitle,
    //           text: errorDescription,
    //           // allowEnterKey: false,
    //           // allowEscapeKey: false,
    //           allowOutsideClick: false,
    //           confirmButtonColor: '#00A5A5',
    //           confirmButtonText: '<span style="padding: 0 15px;">OK</span>'
    //         });

    //       } else {

    //         Swal.fire({
    //           icon: "error",
    //           title: "Se ha producido un error al intentar ingresar al módulo (Esto puede ser debido por una desconexión a la base de datos o algun error en el programa)",
    //           text: "Intente nuevamente, si persiste por favor comunicarse con Mesa de Ayuda o personal de soporte del " + environment.systemName,
    //           // allowEnterKey: false,
    //           // allowEscapeKey: false,
    //           allowOutsideClick: false,
    //           confirmButtonColor: '#00A5A5',
    //           confirmButtonText: '<span style="padding: 0 15px;">OK</span>'
    //         });

    //       }

    //     }

    //   );

    // } else {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Por favor ingrese con su usuario y contraseña de red",
    //     text: environment.systemName,
    //     // allowEnterKey: false,
    //     // allowEscapeKey: false,
    //     allowOutsideClick: false,
    //     confirmButtonColor: '#00A5A5',
    //     confirmButtonText: '<span style="padding: 0 15px;">OK</span>'
    //   });
    // }
  }
}
