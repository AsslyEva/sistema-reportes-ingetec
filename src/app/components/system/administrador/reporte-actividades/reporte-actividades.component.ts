import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LenguajeDataTable } from 'src/app/utils/utils';
import { Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsService } from 'src/app/components/shared/dialogs.service';
import { DetalleCuadrillaComponent } from 'src/app/components/shared/detalle-cuadrilla/detalle-cuadrilla.component';



export interface Actividad {
  id_actividad: number;
  fecha?: Date;
  lider?: string;
  integrantes?: string;
  segmento?: string;
  actividad_especifica?: string;
  cantidad?: number;
  cantidad_rural: string | undefined;
  cantidad_urbano: string | undefined;
  fecha_acti?: Date;
}


@Component({
  selector: 'app-reporte-actividades',
  templateUrl: './reporte-actividades.component.html',
  styleUrls: ['./reporte-actividades.component.scss']
})

export class ReporteActividadesComponent implements OnDestroy , OnInit {


  name!: string;
  animal!: string;


  public result: any;






  required: boolean = true;


  // inicializa fecha
  todayDate : Date = new Date();
  fecha_act =  new FormControl('');

  //Configuracion para datatable
  dtOptions: ADTSettings = {};

  // inicializacion de variables  
  // actos: Actividad[] = [];
  form: FormGroup;

  sede = "";
  lider = "";
  integrantes = [] = [];
  segmento = "";
  actividad_especifica ="";
  rural = "";
  urbano = "";
  fecha ='';
  
  actos: any[] = [
    {
      id_actividad: 1,
      sede: "TARMA",
      lider : "Javier Coella",
      integrantes : ["Bryan" , "Assly" , "Franco"],
      segmento : "CONEXIONES NUEVAS BT",
      actividad_especifica : "Subterráneo Monofásico sin rotura ni resane de vereda",
      urbano : 2,
      rural : 5,
      fecha : new Date(),
    },

    {
      id_actividad: 4,
      sede: "TARMA",
      lider : "Efrain Aylas",
      integrantes : ["Bryan" , "Diana" , "Franco"],
      segmento : "REINSTALACION DE SERVICIO RS",
      actividad_especifica : "Instalación de medidor monofásico, caja e ITM",
      urbano : 0,
      rural : 3,
      fecha : new Date(),
    },
  ];


  dtTrigger: Subject<any> = new Subject<any>();

  
  constructor(
    public dialog: MatDialog,
    private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private dialogsService: DialogsService,
    // private httpClient: HttpClient  
    ) {

      this.form = this.fb.group({
        actividad: ['',[Validators.required]]
      });
    }
 
  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      dom: '<"top"if>rt<"bottom"lp><"clear">',
      pagingType: 'simple_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"]],
      language: LenguajeDataTable(),
      responsive: true,
      autoWidth: false,
      processing: true,
      order: [],
      columnDefs: [
        {
          targets: 2,
          orderable: false,
        },
        { className: "text-center align-middle border-bottom", "targets": [0, 1, 2] },
      ],
    };
    // this.httpClient.get<any[]>('data/data.json')
    // .subscribe(data => {
    //   this.actos = (data as any).data;
    //   // Calling the DT trigger to manually render the table
    //   this.dtTrigger.subscribe();
    // });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // abrirDetalle(){
  //   const dialogRef = this.dialog.open(DetalleEvidenciaComponent
  //     , {height: '400px'}
  //     );
  
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log(`Dialog result: ${result}`);
  //     });
  //   }


    public abrirDetalle() {
      this.dialogsService
        .confirm('Confirm Dialog', 'Are you sure you want to do this?')
        .subscribe((res: any) => this.result = res);
    }

}


