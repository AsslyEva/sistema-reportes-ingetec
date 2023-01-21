import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LenguajeDataTable } from 'src/app/utils/utils';
import { Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { HttpClient } from '@angular/common/http';
import { ReportesService } from 'src/app/service/global/reportes.service';
import { downloadReportExcel } from 'src/app/components/shared/generate-excel/generate-excel';
import { environment } from 'src/environments/environment.prod';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SegmentosService } from 'src/app/service/global/segmentos.service';
@Component({
  selector: 'app-reporte-valorizacion',
  templateUrl: './reporte-valorizacion.component.html',
  styleUrls: ['./reporte-valorizacion.component.scss']
})
export class ReporteValorizacionComponent implements OnInit {
  name!: string;
  nameParticipante = 'Bryan Villegas Cuba';


  public result: any;

  required: boolean = true;


  // inicializa filtro
  todayDate : Date = new Date();
  fecha_act =  new FormControl('');

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  form: FormGroup;
  segmentos : any = [];
  selectedSegmento : any;
  valorizaciones: any[] = [];
  valorizacion: any[] = [];


  // dom: any[];
 //Configuracion para datatable
 dtOptions: ADTSettings = {};
 sede = "";
 segmento = "";
 partida = "";
 descripcion_actividades ="";
 unidad = 'Und'
 precio_urbano = "";
 precio_urbano_rural = "";
 precio_rural = "";
 cantidades_urbano = "";
 cantidades_urbano_rural = "";
 cantidades_rural = "";
 importe_urbano = "";
 importe_rural = "";




 dtTrigger: Subject<any> = new Subject<any>();


  constructor(
    private reportesService: ReportesService,
    private segmentosService: SegmentosService,
    private fb:FormBuilder,

  ) {
    this.form = this.fb.group({
      actividad: ['',[Validators.required]]
    });
  }
  __downloadReportExcel = downloadReportExcel;

 ngOnInit(): void {
   this.reportesService.getReportesAgrupados()
   .subscribe((resp:any) => {
      this.valorizaciones = resp;
      this.valorizacion = this.valorizaciones;
   })
   this.segmentosService.getSegmentos()
   .subscribe((resp: any) => {
     this.segmentos = resp;
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
       { className: "text-center align-middle border-bottom", "targets": [0, 1, 2] },
     ],
   };
  //  this.httpClient.get<any[]>('data/data.json')
  //  .subscribe(data => {
  //    this.valorizacion = (data as any).data;
  //    // Calling the DT trigger to manually render the table
  //    this.dtTrigger.subscribe();
  //  });
 }

 ngOnDestroy(): void {
   // Do not forget to unsubscribe the event
   this.dtTrigger.unsubscribe();
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
        header:  "PARTIDA",
        size: 9
      },
      {
        header:  "ACTIVIDAD",
        size: 40
      },
      {
        header:  "UNIDAD",
        size: 7
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
      }
    ];
    title = 'REPORTE ACTIVIDADES AGRUPADAS';
    informativeText = `Este reporte fue generado por el ${ environment.systemName }`


  dwnExcel(){
    let dataExcel: any[];
    dataExcel = this.valorizacion.map((x1, index) => {
      let fecha = new Date(x1.fecha_cant_eje).toLocaleDateString();
      return ([
        index + 1,
        x1.descripcion_sede,
        x1.descripcion_seg,
        x1.partida_act,
        x1.descripcion_act,
        x1.unidad_act,
        x1.cantidad_urbano_eje,
        x1.cantidad_urbrural_eje,
        x1.cantidad_rural_eje,
        x1.pre_uni_urbano_act,
        x1.pre_uni_ruralUrbano_act,
        x1.pre_uni_rural_act,
        x1.pre_uni_urbano_act * x1.cantidad_urbano_eje,
        x1.pre_uni_ruralUrbano_act * x1.cantidad_urbrural_eje,
        x1.pre_uni_rural_act * x1.cantidad_rural_eje
      ]);
    });

    this.__downloadReportExcel( this.title, this.headerAndSize, dataExcel, {} );
  }

  filtrar(){
    const rango = this.range.value;
    if(rango.start != null || rango.end != null || rango.start || rango.end ){
      this.valorizacion = [];
      setTimeout(() => {
        this.valorizacion = this.filterDate(rango.start, rango.end, this.valorizaciones);
        console.log("valorizacion",this.valorizacion);
        this.filtrarSegmento(this.valorizacion);
      }, 100);
    } else {
      this.filtrarSegmento(this.valorizaciones);
      console.log('desde filtrar sin fecha',this.valorizacion);
    }
  }

  filterDate(fromDate: any, ToDate: any, data: any){
    return data.filter( (resp:any) => new Date(resp.fecha_cant_eje).getTime() > new Date( fromDate ).getTime()
      // console.log('dede el filter data', new Date(resp.fecha_cant_eje), new Date( fromDate ))
      ).filter( (resp:any) =>
        new Date(resp.fecha_cant_eje).getTime() < new Date( ToDate ).getTime()
      )
  }

  filtrarSegmento(data: any){
    if(this.selectedSegmento != null){
      const datosFiltrados = data;
      this.valorizacion = [];
      setTimeout(() => {
        this.valorizacion = datosFiltrados.filter((e:any) => e.codigo_seg == this.selectedSegmento);
        console.log('desdefilterSegmento',this.valorizacion);
      }, 100);
    }
  }

  reset(){
    this.valorizacion = [];
    setTimeout(() => {
      this.valorizacion = this.valorizaciones;
    }, 100);
    this.selectedSegmento = null;
  }
}
