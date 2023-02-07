import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleCuadrillaComponent } from 'src/app/components/shared/detalle-cuadrilla/detalle-cuadrilla.component';
import { IntegrantesService } from 'src/app/service/global/integrantes.service';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.scss']
})
export class EditarEmpleadoComponent {


  titulo: string = "EDITAR EMPELADO";
  @Output() messagestate = new EventEmitter<boolean>();
  message: any;

  // inicializa fecha
  todayDate : Date = new Date();
  fecha_act =  new FormControl('');

  form: FormGroup;

  cuadrilla: any[] = [];
  lider: any | null = null;
  constructor(
    public dialogRef: MatDialogRef<EditarEmpleadoComponent>,
    private fb:FormBuilder,
    private integrantesService: IntegrantesService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.form = this.fb.group({
      actividad: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.integrantesService.getIntegrantesByEje(this.data.codigo)
    .subscribe((resp: any) => {
      this.cuadrilla = resp;
    })

    this.integrantesService.getDetalleIntegrante(this.data.lider)
    .subscribe((resp: any) => {
      this.lider = resp
    })
    console.log(this.data)
  }

  closeState(){
    this.messagestate.emit(true)
  }

  cerrar(){
    this.dialogRef.close();
  }
}