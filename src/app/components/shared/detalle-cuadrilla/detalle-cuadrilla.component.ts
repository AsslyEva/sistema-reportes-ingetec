import { Component, EventEmitter, Output, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IntegrantesService } from 'src/app/service/global/integrantes.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-detalle-cuadrilla',
  templateUrl: './detalle-cuadrilla.component.html',
  styleUrls: ['./detalle-cuadrilla.component.scss']
})
export class DetalleCuadrillaComponent implements OnInit{

  titulo: string = "DETALLE DE CUADRILLA";
  @Output() messagestate = new EventEmitter<boolean>();
  message: any;

  // inicializa fecha
  todayDate : Date = new Date();
  fecha_act =  new FormControl('');

  form: FormGroup;

  cuadrilla: any[] = [];
  lider: any | null = null;
  constructor(
    public dialogRef: MatDialogRef<DetalleCuadrillaComponent>,
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
