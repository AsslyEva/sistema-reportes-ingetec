import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
import { ReportesService } from 'src/app/service/global/reportes.service';
import * as Highcharts from 'highcharts';
import * as HighchartsMore from 'highcharts/highcharts-more';
import * as HighchartsExporting from 'highcharts/modules/exporting';
import * as HighchartsExportData from 'highcharts/modules/export-data';
import * as HighchartsAccessibility from 'highcharts/modules/accessibility';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  // inicializa fecha
  todayDate : Date = new Date();
  fecha_act =  new FormControl('');
  fechaActual: Date = new Date();

  form!: FormGroup;

  HighchartsActividades = Highcharts;
  HighchartsTrabajador = Highcharts;
  HighchartsSedes = Highcharts;
  chartOptionsActividades: any;
  chartOptionsTrabajador: any;
  chartOptionsSedes: any;

  rankingEmpleados: any[] = [];
  rankingSedes: any[] = [];
  rankingActi: any[] = [];

  constructor(
    private __dashboarService: DashboardService,
    private __reportesService: ReportesService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.filtrar();
  }

  // For filter
  range = new FormGroup({
    start: new FormControl<Date | null>(new Date()),
    end: new FormControl<Date | null>(new Date()),
  });

  filtrar(){
    const rango = this.range.value;
    this.spinner.show();
    if(rango.start != null && rango.end != null && rango.start && rango.end ){
      this.filterDate(rango.start, rango.end);
      this.spinner.hide();
    } else {
      this.spinner.hide();
    }
  }

  filterDate(fromDate: any, ToDate: any){
    this.__reportesService.getRankingParticipante(this.formatDate(fromDate), this.formatDate(ToDate))
    .subscribe((resp: any)=>{
      this.rankingEmpleados = resp;
      console.log("participantes",resp)
      this.obtenerTotalTrabajador(
        this.rankingEmpleados.map((e:any)=>{return e.nombre_completo}),
        this.rankingEmpleados.map((e:any)=>{return {name:e.nombre_completo, y: Number(e.total)}})
      );
    })

    this.__reportesService.getRankingActividades(this.formatDate(fromDate), this.formatDate(ToDate))
    .subscribe((resp: any)=>{
      this.rankingActi = resp;
      console.log("actividades",resp)
      this.obtenerTotalActividades(
        this.rankingActi.map((e:any)=>{return e.descripcion_act}),
        this.rankingActi.map((e:any)=>{return {name:e.descripcion_act, y: Number(e.total)}})
      );
    })

    this.__reportesService.getRankingSedes(this.formatDate(fromDate), this.formatDate(ToDate))
    .subscribe((resp: any)=>{
      this.rankingSedes = resp;
      console.log("sedes",resp)
      this.obtenerTotalSedes(
        this.rankingSedes.map((e:any)=>{return e.descripcion_sede}),
        this.rankingSedes.map((e:any)=>{return {name:e.descripcion_sede, y: Number(e.total)}})
      );
    })
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

  obtenerTotalTrabajador(titulos:any, datos:any){

    this.chartOptionsTrabajador = {
      chart: {
        // renderTo: 'container',
        type: 'bar',
        backgroundColor: '#0000',
        width:'800',
        height:'500',
        marginleft: 50,
      },
      plotOptions: {
        series: {
            grouping: false,
            borderWidth: 0
        }
      },
      title: {
        text: 'TOTAL DE VALORIZACIÓN POR EMPLEADO',

        style: {
          colorByPoint: true,
          color: '#ffff',
        },
      },

      credits: {
        enabled: false
      },

      legend: {
        itemStyle: {
          color: '#ffff',
          fontWeight: 'bold'
        },

        align: "left",
        text: 'Leyenda',

        verticalAlign: "top",
        layout: "horozontal",
        x: 0,
        y: 0,
      },

      xAxis: {
        categories: titulos,
        // this.arrayTituloActo,

        labels: {
          allowOverlap: true,

          skew3d: true,
          credits: false,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '12px'
          }
        },

        title: {
          // text: 'Actos registrales',
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '10px'
          }
        },
      },

      yAxis: {
        // categories: this.arrayTituloActo,

        allowDecimals: false,
        min: 0,
        // max: 1000,

        title: {
          text: 'Cantidad de Valor realizado',
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '14px'
          }
        },
        labels: {
          allowOverlap: true,
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
          }
        },

      },

      tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} ',
      },

      series: [{
        type: 'bar',
        name: 'Total de valor realizado',
        data:  datos,
        colorByPoint: true,
        showLastLabel: true,

        // color: '#7AE6A7',
        dataLabels: {
          enabled: true,
          format: '{point.y:.0f}',
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '15px',

          }
        },
        animation: {
          duration: 1500,
          // Uses Math.easeOutBounce
          easing: 'easeOutBounce'
        }
      }]
    };
  }


  obtenerTotalActividades(titulos:any, datos:any){
    this.chartOptionsActividades = {
      chart: {
        // renderTo: 'container',
        type: 'bar',
        backgroundColor: '#0000',
        width:'800',
        height:'500',
        marginleft: 50,
      },
      plotOptions: {
        series: {
            grouping: false,
            borderWidth: 0
        }
      },
      title: {
        text: 'TOTAL DE ACTIVIDADES REALIZADAS POR ACTIVIDADES',

        style: {
          colorByPoint: true,
          color: '#ffff',
        },
      },

      credits: {
        enabled: false
      },

      legend: {
        itemStyle: {
          color: '#ffff',
          fontWeight: 'bold'
        },

        align: "left",
        text: 'Leyenda',

        verticalAlign: "top",
        layout: "horozontal",
        x: 0,
        y: 0,
      },

      xAxis: {
        categories: titulos,
        // this.arrayTituloActo,

        labels: {
          allowOverlap: true,

          skew3d: true,
          credits: false,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '12px'
          }
        },

        title: {
          // text: 'Actos registrales',
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '10px'
          }
        },
      },

      yAxis: {
        // categories: this.arrayTituloActo,

        allowDecimals: false,
        min: 0,
        // max: 1000,

        title: {
          text: 'Cantidad de actividades realizadas',
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '14px'
          }
        },
        labels: {
          allowOverlap: true,
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
          }
        },

      },

      tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} ',
      },

      series: [{
        type: 'bar',
        name: 'Total de actividades realizadas',
        data:  datos,
        colorByPoint: true,
        showLastLabel: true,

        // color: '#7AE6A7',
        dataLabels: {
          enabled: true,
          format: '{point.y:.0f}',
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '15px',

          }
        },
        animation: {
          duration: 1500,
          // Uses Math.easeOutBounce
          easing: 'easeOutBounce'
        }
      }]
    };
  }


  obtenerTotalSedes(titulos:any, datos:any){
    this.chartOptionsSedes = {
      chart: {
        // renderTo: 'container',
        type: 'bar',
        backgroundColor: '#0000',
        width:'800',
        height:'500',
        marginleft: 50,
      },
      plotOptions: {
        series: {
            grouping: false,
            borderWidth: 0
        }
      },
      title: {
        text: 'TOTAL DE VALORIZACIÓN REALIZADAS POR SEDES',

        style: {
          colorByPoint: true,
          color: '#ffff',
        },
      },

      credits: {
        enabled: false
      },

      legend: {
        itemStyle: {
          color: '#ffff',
          fontWeight: 'bold'
        },

        align: "left",
        text: 'Leyenda',

        verticalAlign: "top",
        layout: "horozontal",
        x: 0,
        y: 0,
      },

      xAxis: {
        categories: titulos,
        // this.arrayTituloActo,

        labels: {
          allowOverlap: true,

          skew3d: true,
          credits: false,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '12px'
          }
        },

        title: {
          // text: 'Actos registrales',
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '10px'
          }
        },
      },

      yAxis: {
        // categories: this.arrayTituloActo,

        allowDecimals: false,
        min: 0,
        // max: 1000,

        title: {
          text: 'Cantidad de valorización realizada',
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '14px'
          }
        },
        labels: {
          allowOverlap: true,
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
          }
        },

      },

      tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} ',
      },

      series: [{
        type: 'bar',
        name: 'Total de valorización realizada',
        data:  datos,
        colorByPoint: true,
        showLastLabel: true,

        // color: '#7AE6A7',
        dataLabels: {
          enabled: true,
          format: '{point.y:.0f}',
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '15px',

          }
        },
        animation: {
          duration: 1500,
          // Uses Math.easeOutBounce
          easing: 'easeOutBounce'
        }
      }]
    };
  }

}

