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
import Swal from 'sweetalert2';



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
  estadoData = 1;
  segmentos : any = [];
  selectedSegmento : any;
  actos: any[] = [];
  actosFilter : any[] = [];
  sumaTotal: number = 0;

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
      this.filtrar();
      console.log(this.actos)
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
    this.actosFilter = this.actos;
    this.sumaTotal = 0;
    const rango = this.range.value;
    if(rango.start != null || rango.end != null || rango.start || rango.end ){
      this.actosFilter = [];
      setTimeout(() => {
        this.actosFilter = this.filtrarEstado(this.filtrarSegmento(this.filterDate(rango.start, rango.end, this.actos)));
        this.actosFilter.map((resp: any) => {
          this.sumaTotal += (Number(resp.total_rural)) + (Number(resp.total_urbano)) + (Number(resp.total_urbRural));
        });
      }, 100);
    } else {
      this.actosFilter = this.filtrarEstado(this.filtrarSegmento(this.actos));
      this.actosFilter.map((resp: any) => {
        this.sumaTotal += (Number(resp.total_rural)) + (Number(resp.total_urbano)) + (Number(resp.total_urbRural));
      });
    }
  }

  filterDate(fromDate: any, ToDate: any, data: any){
    return data.filter( (resp:any) => new Date(resp.fecha_cant_eje).getTime() >= new Date( fromDate ).getTime()
      ).filter( (resp:any) =>
        new Date(resp.fecha_cant_eje).getTime() <= new Date( ToDate ).getTime()
      )
  }

  filtrarSegmento(data: any){
    if(this.selectedSegmento != null){
      console.log('desdefilteSegmento',data.filter((e:any) => e.codigo_seg == this.selectedSegmento));
      return data.filter((e:any) => e.codigo_seg == this.selectedSegmento);
    }
    return data;
  }

  filtrarEstado(data: any){
    if(this.estadoData == 3){
      return data;
    }
    console.log("desde filter data",data.filter((resp :any) => resp.estado_eje == this.estadoData));
    return data.filter((resp :any) => resp.estado_eje == this.estadoData);
  }

  reset(){
    this.actosFilter = [];
    setTimeout(() => {
      this.actosFilter = this.actos;
    }, 100);
    this.selectedSegmento = null;
  }

  changeEstado(cod: string, estado: number) {
    const data = {estado_eje: estado, codigo_cant_eje: cod}
    Swal.fire({
      title: '¿Estas Seguro?',
      text: estado == 0 ? "De eliminar el registro" : "De restaurar el registro",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ' + (estado == 0 ? 'Eliminar' : 'Restaurar')  + ' ahora'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reporteService.postEliminarEje(data)
        .subscribe(
          (resp: any) => {
            console.log('desde cambiar estado', resp);
            Swal.fire(
              (estado == 0 ? 'Eliminado' : 'Restaurado'),
              'Registro '+ (estado == 0 ? 'Eliminado' : 'Restaurado') ,
              'success'
            )
          }
        );

      }
    })
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
        header:  "PRECIO UNI URB",
        size: 9
      },
      {
        header:  "PRECIO UNI URBRURAL",
        size: 9
      },
      {
        header:  "PRECIO UNI RURAL",
        size: 9
      },
      {
        header:  "IMP. VAL. URB",
        size: 10
      },
      {
        header:  "IMP. VAL. URBRURAL",
        size: 10
      },
      {
        header:  "IMP. VAL. RURAL",
        size: 10
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
    title = 'REPORTE DE ACTIVIDADES COMERCIALES DIARIAS';
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
        x1.pre_uni_urbano_act,
        x1.pre_uni_ruralUrbano_act,
        x1.pre_uni_rural_act,
        x1.total_urbano,
        x1.total_urbRural,
        x1.total_rural,
        fecha,
        x1.cuadrilla
      ]);
    });
    this.__downloadReportExcel( this.title, this.headerAndSize, dataExcel, this.range.value, this.sumaTotal );
  }
}


