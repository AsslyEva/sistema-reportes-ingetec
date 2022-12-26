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
 actividad ="";
 lider = "";
 integrantes = "";
 fecha ='';
 
 actos: any[] = [
   {
     sede: "TARMA",
     segmento : "CONEXIONES NUEVAS BT",
     lider : "AAA AYLAS",
     integrantes : "AAAAAAAaaa , AAAAaaaaaa ,AAAAAaa,AAAAAaaa",
     actividad : "Subterráneo Monofásico sin rotura ni resane de vereda",
     fecha : new Date(),
   },

   {
     sede: "TARMA",
     segmento : "REINSTALACION DE SERVICIO RS",
     lider : "AAA AYLAS",
     integrantes : "AAAAAAAaaaa , AAAAaaa ,AAAAA ,AAAAAaaaa",
     actividad : "Instalación de medidor monofásico, caja e ITM",
     fecha : new Date(),
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
   this.httpClient.get<any[]>('data/data.json')
   .subscribe(data => {
     this.actos = (data as any).data;
     // Calling the DT trigger to manually render the table
     this.dtTrigger.subscribe();
   });
 }

 ngOnDestroy(): void {
   // Do not forget to unsubscribe the event
   this.dtTrigger.unsubscribe();
 }
}
