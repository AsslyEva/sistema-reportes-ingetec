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
import { NgxSpinnerService } from 'ngx-spinner';



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
  fecha_act =  new FormControl();

  //Configuracion para datatable
  dtOptions: ADTSettings = {};

  // inicializacion de variables
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
  serializedDate = new FormControl(new Date().toISOString());

  dtTrigger: Subject<any> = new Subject<any>();

  range = new FormGroup({
    start: new FormControl<Date | null>(new Date()),
    end: new FormControl<Date | null>(new Date()),
  });

  constructor(
    public dialog: MatDialog,
    private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private dialogsService: DialogsService,
    private reporteService: ReportesService,
    private segmentosService: SegmentosService,
    private spinner: NgxSpinnerService,

    ) {

      this.form = this.fb.group({
        actividad: ['',[Validators.required]]
      });

    }
    __downloadReportExcel = downloadReportExcel;


  ngOnInit(): void {
    this.spinner.show();
    this.reporteService.getReportesByEje(this.formatDate(this.todayDate.toString()), this.formatDate(this.todayDate.toString()))
    .subscribe((resp: any) =>{
      this.actosFilter = resp;
      this.spinner.hide();
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

  formatDate(date: string) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
  }

  filtrar(){
    this.spinner.show();
    this.sumaTotal = 0;
    const rango = this.range.value;
    if(rango.start != null && rango.end != null && rango.start && rango.end ){
        this.filterDate(rango.start, rango.end);
        setTimeout(() => {
          this.actosFilter = this.filtrarEstado(this.filtrarSegmento(this.actosFilter));
          this.actosFilter.map((resp: any) => {
            this.sumaTotal += (Number(resp.total_rural)) + (Number(resp.total_urbano)) + (Number(resp.total_urbRural));
          });
        }, 100);
    } else {
      this.actosFilter = this.filtrarEstado(this.filtrarSegmento(this.actosFilter));
      this.actosFilter.map((resp: any) => {
        this.sumaTotal += (Number(resp.total_rural)) + (Number(resp.total_urbano)) + (Number(resp.total_urbRural));
      });
      this.spinner.hide();
    }
  }

  filterDate(fromDate: any, ToDate: any): any{
    this.reporteService.getReportesByEje(this.formatDate(fromDate), this.formatDate(ToDate))
      .subscribe((resp: any) => {
        this.spinner.hide();
        this.actosFilter = resp;
        return resp;
        // this.filtrar();
      }, (err) => {
        this.spinner.hide();
        return [];
      })
  }

  filtrarSegmento(data: any){
    if(this.selectedSegmento != null){
      return data.filter((e:any) => e.codigo_seg == this.selectedSegmento);
    }
    return data;
  }

  filtrarEstado(data: any){
    if(this.estadoData == 3){
      return data;
    }
    return data.filter((resp :any) => resp.estado_eje == this.estadoData);
  }

  reset(){
    this.reporteService.getReportesByEje(this.formatDate(this.todayDate.toString()), this.formatDate(this.todayDate.toString()))
    .subscribe((resp: any) =>{
      this.actosFilter = resp;
      this.spinner.hide();
    })
    this.range = new FormGroup({
      start: new FormControl<Date | null>(new Date()),
      end: new FormControl<Date | null>(new Date()),
    });
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
            this.spinner.show();
            Swal.fire(
              (estado == 0 ? 'Eliminado' : 'Restaurado'),
              'Registro '+ (estado == 0 ? 'Eliminado' : 'Restaurado') ,
              'success'
            )
            // recargar
            this.reporteService.getReportesByEje('2023-02-01', '2023-02-07')
            .subscribe((resp: any) =>{
              this.actos = resp;
              this.spinner.hide();
              this.filtrar();
            })
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

  redondearDecimales(numero: number, decimales: number) {
    const numeroRegexp = new RegExp('\\d\\.(\\d){' + decimales + ',}');   // Expresion regular para numeros con un cierto numero de decimales o mas
    if (numeroRegexp.test(numero.toString())) {         // Ya que el numero tiene el numero de decimales requeridos o mas, se realiza el redondeo
        return Number(numero.toFixed(decimales));
    } else {
        return Number(numero.toFixed(decimales)) === 0 ? 0 : numero;  // En valores muy bajos, se comprueba si el numero es 0 (con el redondeo deseado), si no lo es se devuelve el numero otra vez.
    }
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
    this.__downloadReportExcel( this.title, this.headerAndSize, dataExcel, this.range.value, this.redondearDecimales(this.sumaTotal, 3) );
  }
}


