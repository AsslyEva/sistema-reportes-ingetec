import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { DialogsService } from 'src/app/components/shared/dialogs.service';
import { downloadReportExcel } from 'src/app/components/shared/generate-excel/generate-excel';
import { IntegrantesService } from 'src/app/service/global/integrantes.service';
import { ReportesService } from 'src/app/service/global/reportes.service';
import { SegmentosService } from 'src/app/service/global/segmentos.service';
import { LenguajeDataTable } from 'src/app/utils/utils';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-reporte-empleados',
  templateUrl: './reporte-empleados.component.html',
  styleUrls: ['./reporte-empleados.component.scss']
})
export class ReporteEmpleadosComponent implements OnDestroy , OnInit{

  value: any;
  name!: string;


  public result: any;

  required: boolean = true;


  // inicializa fecha
  todayDate : Date = new Date();
  fecha_act =  new FormControl('');

  //Configuracion para datatable
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject<any>();

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

  participantes : any = [];
  selectedParticipante : any;

  nombreParticipante : string = "";
  apellidoParticipante : string = "";

  actos: any[] = [];
  actosFilter : any[] = [];


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
    private participanteService: IntegrantesService,
    private spinner: NgxSpinnerService,
    ) {

      this.form = this.fb.group({
        actividad: ['',[Validators.required]]
      });

    }
    __downloadReportExcel = downloadReportExcel;


  ngOnInit(): void {

    this.participanteService.getIntegrantesBySede('1')
    .subscribe((resp: any) => {
      this.participantes = resp;
    })

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
        { className: "text-center align-middle border-bottom", "targets": [0, 1, 2,3,4,5,6] },
      ],
    };

  }


  changed() {
    this.nombreParticipante = this.participantes.find((e:any) => e.codigo_integrante == this.selectedParticipante).nombres_integrante;
    this.apellidoParticipante = this.participantes.find((e:any) => e.codigo_integrante == this.selectedParticipante).apellidos_integrante;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  cargarReporte(){
    this.filtrar;
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
    const rango = this.range.value;
    if(rango.start != null && rango.end != null && rango.start && rango.end && this.selectedParticipante){
        this.filterDate(rango.start, rango.end, this.selectedParticipante);
        this.changed();
        this.spinner.hide();
    } else {
      // this.actosFilter = this.filtrarParticipante(this.actosFilter);
      this.spinner.hide();
    }
  }

  filtrarParticipante(data: any){
    if(this.selectedParticipante != null){
      const datosFiltrados = data;
      return datosFiltrados.filter((e:any) => e.codigo_integrante == this.selectedParticipante);
    }
  }

  filterDate(fromDate: any, ToDate: any, id: Number): any{
    this.reporteService.getReportesParticipante(id, this.formatDate(fromDate), this.formatDate(ToDate))
      .subscribe((resp: any) => {
        this.spinner.hide();
        this.actosFilter = resp;
        return resp;
      }, (err) => {
        return [];
      })
  }

  reset(){
    this.actosFilter = [];
    this.range = new FormGroup({
      start: new FormControl<Date | null>(new Date()),
      end: new FormControl<Date | null>(new Date()),
    });
    this.selectedParticipante = null;
    this.nombreParticipante = "";
    this.apellidoParticipante = "";
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
    ];

    title = 'REPORTE ACTIVIDADES REALIZADAS: ';
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
        fecha
      ]);
    });

    this.__downloadReportExcel( this.title + this.nombreParticipante + this.apellidoParticipante, this.headerAndSize, dataExcel, this.range.value );
  }
}


