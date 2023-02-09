import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleCuadrillaComponent } from 'src/app/components/shared/detalle-cuadrilla/detalle-cuadrilla.component';
import { IntegrantesService } from 'src/app/service/global/integrantes.service';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.scss']
})
export class EditarEmpleadoComponent implements OnInit{


  titulo: string = "EDITAR EMPELADO";
  @Output() messagestate = new EventEmitter<boolean>();
  message: any;

  // inicializa fecha
  todayDate : Date = new Date();
  fecha_act =  new FormControl('');

  form: FormGroup;

  integrante = {
    nombres_integrante: "",
    apellidos_integrante: "",
    nombre_usuario: "",
    contrasena_usuario: "",
    rol_usuario: ""
  };

  constructor(
    public dialogRef: MatDialogRef<EditarEmpleadoComponent>,
    private fb:FormBuilder,
    private integrantesService: IntegrantesService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.form = this.fb.group({
          codigo_integrante: [this.data.data,[Validators.required]],
          nombres_integrante: ['',[Validators.required]],
          apellidos_integrante: ['',[Validators.required]],
          nombre_usuario: ['',[Validators.required]],
          contrasena_usuario: ['',[Validators.required]],
          rol_usuario: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {

    this.integrantesService.getDetalleIntegrante(this.data.data)
    .subscribe((resp: any) => {
      this.integrante = resp;
      console.log("desde editar", this.integrante)
    })
  }

  onSubmit(formulario :any){
    this.integrantesService.postIntegrantesActualizar(formulario)
    .subscribe((resp :any) =>{
      console.log(resp);
      this.closeState;
    })
  }

  closeState(){
    this.messagestate.emit(true)
  }

  cerrar(){
    this.dialogRef.close();
  }
}
