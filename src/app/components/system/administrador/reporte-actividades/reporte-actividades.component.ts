import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LenguajeDataTable } from 'src/app/utils/utils';
import { filter, Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsService } from 'src/app/components/shared/dialogs.service';
import { DetalleCuadrillaComponent } from 'src/app/components/shared/detalle-cuadrilla/detalle-cuadrilla.component';
import { ReportesService } from 'src/app/service/global/reportes.service';
import { SegmentosService } from 'src/app/service/global/segmentos.service';
import { downloadReportExcel } from 'src/app/components/shared/generate-excel/generate-excel';
import { environment } from 'src/environments/environment.prod';
import { DatePipe } from '@angular/common';



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
  actividad_especifica ="";
  rural = "";
  urbano = "";
  urbano_rural = "";
  fecha ='';

  segmentos : any = [];
  selectedSegmento : any;
  actos: any[] = [];
  actosFilter : any[] = [];

  dtTrigger: Subject<any> = new Subject<any>();

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    public dialog: MatDialog,
    private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private dialogsService: DialogsService,
    private reporteService: ReportesService,
    private segmentosService: SegmentosService,
    ) {

      this.form = this.fb.group({
        actividad: ['',[Validators.required]]
      });

    }
    __downloadReportExcel = downloadReportExcel;


  ngOnInit(): void {
    this.reporteService.getReportesByEje()
    .subscribe((resp: any) =>{
      this.actos = resp;
      this.actosFilter = this.actos;
    })

    this.segmentosService.getSegmentos()
    .subscribe((resp: any) => {
      this.segmentos = resp;
    })

    this.dtOptions = {
      dom: '<"top"if>rt<"bottom"lp><"clear">',
      pagingType: 'simple_numbers',
      pageLength: 4,
      lengthMenu: [[4, 10, 25, 50, -1], [4, 10, 25, 50, "Todos"]],
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

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  filtrar(){
    const rango = this.range.value;
    if(rango.start != null || rango.end != null || rango.start || rango.end ){
      this.actosFilter = [];
      setTimeout(() => {
        this.actosFilter = this.filterDate(rango.start, rango.end, this.actos);
        console.log("actosFilter",this.actosFilter);
        this.filtrarSegmento(this.actosFilter);
      }, 100);
    } else {
      this.filtrarSegmento(this.actos);
      console.log('desde filtrar sin fecha',this.actosFilter);
    }
  }

  filterDate(fromDate: any, ToDate: any, data: any){
    return data.filter( (resp:any) => new Date(resp.fecha_cant_eje).getTime() >= new Date( fromDate ).getTime()
      // console.log('dede el filter data', new Date(resp.fecha_cant_eje), new Date( fromDate ))
      ).filter( (resp:any) =>
        new Date(resp.fecha_cant_eje).getTime() <= new Date( ToDate ).getTime()
      )
  }

  filtrarSegmento(data: any){
    if(this.selectedSegmento != null){
      const datosFiltrados = data;
      this.actosFilter = [];
      setTimeout(() => {
        this.actosFilter = datosFiltrados.filter((e:any) => e.codigo_seg == this.selectedSegmento);
        console.log('desdefilteSegmento',this.actosFilter);
      }, 100);
    }
  }

  reset(){
    this.actosFilter = [];
    setTimeout(() => {
      this.actosFilter = this.actos;
    }, 100);
    this.selectedSegmento = null;
  }

  public abrirDetalle(codigo: string, lider: string) {
    this.dialogsService
      .confirm(codigo, lider)
      .subscribe((res: any) => this.result = res);
  }

    // for reports
    headerAndSize=[
      {
        header:  "N°",
        size: 5
      },
      {
        header:  "SEDE",
        size: 15
      },
      {
        header:  "SEGMENTO",
        size: 40
      },
      {
        header:  "ACTIVIDAD REALIZADA",
        size: 40
      },
      {
        header:  "CANT URB",
        size: 7
      },
      {
        header:  "CANT URBRURAL",
        size: 7
      },
      {
        header:  "CANT RURAL",
        size: 7
      },
      {
        header:  "FECHA",
        size: 12
      }
      ,
      {
        header:  "CUADRILLA",
        size: 40
      }
    ];
    title = 'REPORTE ACTIVIDADES REALIZADAS';
    informativeText = `Este reporte fue generado por el ${ environment.systemName }`


  dwnExcel(){
    let dataExcel: any[];
    dataExcel = this.actosFilter.map((x1, index) => {
      let fecha = new Date(x1.fecha_cant_eje).toLocaleDateString();
      return ([
        index + 1,
        x1.descripcion_sede,
        x1.descripcion_seg,
        x1.descripcion_act,
        x1.cantidad_urbano_eje,
        x1.cantidad_urbrural_eje,
        x1.cantidad_rural_eje,
        fecha,
        x1.cuadrilla
      ]);
    });

    this.__downloadReportExcel( this.title, this.headerAndSize, dataExcel, this.range.value );
  }
}


