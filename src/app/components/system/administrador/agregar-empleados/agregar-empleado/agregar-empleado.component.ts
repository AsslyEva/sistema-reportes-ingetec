import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleCuadrillaComponent } from 'src/app/components/shared/detalle-cuadrilla/detalle-cuadrilla.component';
import { IntegrantesService } from 'src/app/service/global/integrantes.service';
import { UsersService } from 'src/app/service/global/users.service';


class Integrante {
  constructor(
    public nombres_integrante: string,
    public apellidos_integrante: string,
    public nombre_usuario: string,
    public contrasena_usuario: string,
    public rol_usuario: string
  ){}
}

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.scss']
})
export class AgregarEmpleadoComponent implements OnInit{

  titulo: string = "AGREGAR EMPELADO";
  newIntegrante: Integrante = new Integrante("","","","","");
  @Output() messagestate = new EventEmitter<boolean>();
  message: any;

  // inicializa fecha
  todayDate : Date = new Date();
  fecha_act =  new FormControl('');

  form: FormGroup;

  cuadrilla: any[] = [];
  lider: any | null = null;
  constructor(
    public dialogRef: MatDialogRef<AgregarEmpleadoComponent>,
    private fb:FormBuilder,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.form = this.fb.group({
        nombres_integrante: ['',[Validators.required]],
        apellidos_integrante: ['',[Validators.required]],
        nombre_usuario: ['',[Validators.required]],
        contrasena_usuario: ['',[Validators.required]],
        rol_usuario: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  onSubmit(formulario: any){
    this.userService.registrar(formulario)
    .subscribe((resp :any) =>{
      console.log(resp);
      this.closeState;
    })
  }

  closeState(){
    this.messagestate.emit(false)
  }

  cerrar(){
    this.dialogRef.close();
  }
}
