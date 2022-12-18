import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-cuadrilla',
  templateUrl: './detalle-cuadrilla.component.html',
  styleUrls: ['./detalle-cuadrilla.component.scss']
})
export class DetalleCuadrillaComponent{
  
  titulo: string = "DETALLE DE CUADRILLA";
  @Output() messagestate = new EventEmitter<boolean>();
  message: any;

  // inicializa fecha
  todayDate : Date = new Date();
  fecha_act =  new FormControl('');
  
  form: FormGroup;

  actos: any[] = [
    {
      id_actividad: 1,
      sede: "TARMA",
      lider : "Javier Coella",
      integrantes : ["Bryanssssssssssssssssssssssssssssssssssss" , "Asslyssssssssssssssssssssssssssssssssssssssssssssssssss" , "Franco"],
      segmento : "CONEXIONES NUEVAS BT",
      actividad_especifica : "Subterráneo Monofásico sin rotura ni resane de vereda",
      urbano : 2,
      rural : 5,
      fecha : new Date(),
    },

  ];
  constructor(
    public dialogRef: MatDialogRef<DetalleCuadrillaComponent>,
    private fb:FormBuilder,
    ) {
    this.form = this.fb.group({
      actividad: ['',[Validators.required]]
    });
  }

  closeState(){
    this.messagestate.emit(true)
  }

  cerrar(){
    this.dialogRef.close();
  }
}
