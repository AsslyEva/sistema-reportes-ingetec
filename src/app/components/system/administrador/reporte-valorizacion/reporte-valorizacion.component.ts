import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LenguajeDataTable } from 'src/app/utils/utils';
import { Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-reporte-valorizacion',
  templateUrl: './reporte-valorizacion.component.html',
  styleUrls: ['./reporte-valorizacion.component.scss']
})
export class ReporteValorizacionComponent implements OnInit {
// dom: any[];
 //Configuracion para datatable
 dtOptions: ADTSettings = {};
 sede = "";
 segmento = "";
 partida = "";
 descripcion_actividades ="";
 unidad = 'Und'
 precio_urbano = "";
 precio_rural = "";
 cantidades_urbano = "";
 cantidades_rural = "";
 importe_urbano = "";
 importe_rural = "";

 valorizacion: any[] = [
   {
     sede: "TARMA",
     segmento : "CONEXIONES NUEVAS BT",
     partida: "101CN02",
     descripcion_actividades: "Aéreo Trifásico",
     precio_urbano: "400",
     precio_rural: "200",
     cantidades_urbano: "15",
     cantidades_rural: "150",
     importe_urbano: "s/ 523",
     importe_rural: "s/ 5412",
   },

   {
     sede: "TARMA",
     segmento : "CONEXIONES NUEVAS BT",
     partida: "101CN02",
     descripcion_actividades: "Aéreo Trifásico",
     precio_urbano: "400",
     precio_rural: "200",
     cantidades_urbano: "15",
     cantidades_rural: "150",
     importe_urbano: "s/ 523",
     importe_rural: "s/ 5412",
   },
 ];


 dtTrigger: Subject<any> = new Subject<any>();

 
 constructor(
   private httpClient: HttpClient  
   ) {}

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
}
