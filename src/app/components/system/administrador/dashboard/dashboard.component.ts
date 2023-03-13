import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
import { ReportesService } from 'src/app/service/global/reportes.service';
highcharts3D(Highcharts);

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
  HighchartsPie = Highcharts;
  chartOptionsActividades: any;
  chartOptionsTrabajador: any;
  chartOptionsPie: any;

  rankingEmpleados: any[] = [];
  rankingSedes: any[] = [];
  rankingActi: any[] = [];

  constructor(
    private __dashboarService: DashboardService,
    private __reportesService: ReportesService
  ) { }

  ngOnInit() {
    // this.obtenerTotalTrabajador();

    this.__reportesService.getRankingParticipante()
    .subscribe((resp: any)=>{
      this.rankingEmpleados = resp;
      console.log(this.rankingEmpleados)
      console.log(this.rankingEmpleados.map((e:any)=>{return e.nombre_completo}))
      this.obtenerTotalTrabajador(
        this.rankingEmpleados.map((e:any)=>{return e.nombre_completo}),
        this.rankingEmpleados.map((e:any)=>{return {name:e.nombre_completo, y: Number(e.total)}})
      );
    })

    this.__reportesService.getRankingActividades()
    .subscribe((resp: any)=>{
      this.rankingActi = resp;
      this.obtenerTotalPie(
        this.rankingActi.map((e:any)=>{return {name:e.descripcion_act, y: Number(e.total)}})
      );
    })

    this.__reportesService.getRankingSedes()
    .subscribe((resp: any)=>{
      this.rankingSedes = resp;
      this.obtenerTotalActividades(
        this.rankingSedes.map((e:any)=>{return e.descripcion_sede}),
        this.rankingSedes.map((e:any)=>{return {name:e.descripcion_sede, y: Number(e.total)}})
      );
    })
  }

  // For filter
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  dataRanking1: any[] = [];
  dataRanking2: any[] = [];
  dataRanking3: any[] = [];
  dataRankingFiltrada1: any[] = [];
  dataRankingFiltrada2: any[] = [];
  dataRankingFiltrada3: any[] = [];

  filtrar(){
    const rango = this.range.value;
    if(rango.start != null || rango.end != null || rango.start || rango.end ){
      setTimeout(() => {
        this.dataRankingFiltrada1 = this.filterDate(rango.start, rango.end, this.rankingEmpleados);
        // this.dataRankingFiltrada2 = this.filterDate(rango.start, rango.end, this.rankingActi);
        // this.dataRankingFiltrada3 = this.filterDate(rango.start, rango.end, this.rankingSedes);
        this.obtenerTotalTrabajador(
          this.dataRankingFiltrada1.map((e:any)=>{return e.nombre_completo}),
          this.dataRankingFiltrada1.map((e:any)=>{return {name:e.nombre_completo, y: Number(e.total)}})
        );
        // this.obtenerTotalPie(
        //   this.dataRankingFiltrada2.map((e:any)=>{return {name:e.descripcion_act, y: Number(e.total)}})
        // );
        // this.obtenerTotalActividades(
        //   this.dataRankingFiltrada3.map((e:any)=>{return e.descripcion_sede}),
        //   this.dataRankingFiltrada3.map((e:any)=>{return {name:e.descripcion_sede, y: Number(e.total)}})
        // );
      }, 100);
    } else {

    }
  }

  filterDate(fromDate: any, ToDate: any, data: any){
    return data.filter( (resp:any) => new Date(resp.fecha_cant_eje).getTime() >= new Date( fromDate ).getTime()
      ).filter( (resp:any) =>
        new Date(resp.fecha_cant_eje).getTime() <= new Date( ToDate ).getTime()
      )
  }

  obtenerTotalTrabajador(titulos:any, datos:any){

    this.chartOptionsTrabajador = {
      chart: {
        // renderTo: 'container',
        type: 'bar',
        backgroundColor: '#0000',
        width:'900',
        height:'500',
        marginleft: 50,
        // marginristh: 100,

        // options3d: {
        //   enabled: true,
        //   alpha: 20,
        //   beta: 5,
        //   viewDistance: 15,
        //   depth: 90,
        // }
      },

      title: {
        text: 'TOTAL DE ACTIVIDADES POR EMPLEADO',

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
            fontSize: '16px'
          }
        },

        title: {
          // text: 'Actos registrales',
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '16px'
          }
        },
      },

      yAxis: {
        // categories: this.arrayTituloActo,

        allowDecimals: false,
        min: 0,
        // max: 1000,

        title: {
          text: 'Cantidad de Actividades realizadas',
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '16px'
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
        // this.actos.map(element => {
        //   return {name:element.titulo_acto, y: element.cantidad}
        // }),
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
        type: 'column',
        backgroundColor: '#0000',
        width:'500',
        height:'500',
        margin: 70,
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          viewDistance: 25,
          depth: 100,
        },
      },
      title: {
        text: 'ACTIVIDAD POR SEDES',
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

          verticalAlign: 'top',
          labelFormat: '<b>{name}</b>',
          enabled: true
      },
      xAxis: {
        categories: titulos,
        labels: {
          skew3d: true,
          credits: false,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '10px'
          }
        },
        title: {
          // text: 'Nombre de busqueda',
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '16px'
          }
        },
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Cantidad de actividades realizadas',
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '16px'
          }
        },
        labels: {
          skew3d: true,
          style: {
            colorByPoint: false,
            color: '#ffff',
          }
        }
      },
      tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}',
      },
      series: [{
        type: 'column',
        name: 'Total de búsquedas',
        data: datos,
        // this.registros.map(element => {
        //   return {name:element.nombre_categoria, y: element.cantidad}
        // }),
        colorByPoint: true,
        animation: {
          duration: 1000,
          // Uses Math.easeOutBounce
          easing: 'easeOutBounce'
        },
        dataLabels: {
          enabled: true,
          format: '{point.y:.0f}',
          style: {
            colorByPoint: false,
            color: '#ffff',
            fontSize: '23px',
          }
        },
      }]
    };
  }


  obtenerTotalPie(datos:any){
    this.chartOptionsPie = {
      chart: {
        // renderTo: 'container',
        type: 'pie',
        backgroundColor: '#0000',
        width:'600',
        height:'600',

        margin: 20
      },

      title: {
        text: 'PROCESO DE ACTIVIDADES',
        align: 'center',
        style: {
          color: '#ffff',
        },
      },
      series:
      [
        {
          type: 'pie',
          name: 'Total de búsquedas',
          //  color: '#00A5A5',
          innerSize: '50%',
          data: datos,
          // this.horas.map(element => {
          //   return {name: element.hora, y: element.total}
          // }),
          animation: {
            duration: 2000,
            // Uses Math.easeOutBounce
            easing: 'easeOutBounce'
          },
          dataLabels: {
            enabled: true,
            // format: '{point.y:.0f}%',
            style: {
              // colorByPoint: false,
              // color: '#0',
              stroke: 0,
              fontSize: '12px',

            }
          },
        }
      ],

      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },

      credits: {
        enabled: false
      },

      legend: {
        allowOverlap: true,

      color: '#ffff',
      fontWeight: 'bold',
      backgroundColor: '#00000',
        itemStyle: {
          color: '#ffff',
          fontWeight: 'bold'
        },

        layout: 'horizontal',
        floating: true,
        align: 'left',
        x: 100,
        verticalAlign: 'top',
        y: 70
      },

      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },

      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            distance: -50,
            format: '{point.name}',
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%'
        }
      },
    };
  }

}

