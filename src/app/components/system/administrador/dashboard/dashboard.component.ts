import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
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

  // Rango de fecha
  range = new FormGroup({
    inicio: new FormControl<Date | any>(new Date(this.fechaActual.getFullYear(),0,1)),
    fin: new FormControl<Date | any>(new Date()),
  });


  HighchartsActividades = Highcharts;
  HighchartsTrabajador = Highcharts;
  HighchartsPie = Highcharts;
  chartOptionsActividades: any;
  chartOptionsTrabajador: any;
  chartOptionsPie: any;

  menu: any = [
    {
      title: 'Total de actividades por empleado',
      numero: 1,
      conteo: 0,
    },
    {
      title: 'Total de Actividades realizadas',
      numero: 2,
      conteo: 0,
    },
    {
      title: 'Total de descargas QR',
      numero: 3,
      conteo: 0,
    },
    {
      title: 'Total de envios a correo',
      numero: 4,
      conteo: 0,
    },
  ];

  constructor(
    private __dashboarService: DashboardService

  ) { }

  ngOnInit() {
    this.obtenerTotalActividades();
    this.obtenerTotalTrabajador();
    this.obtenerTotalPie();
  }

  filtrar(){
    let fechaInicio = new Date(this.range.get('inicio')?.value).toLocaleDateString('es-PY',{year:"numeric",month:"2-digit", day:"2-digit"});
    let fechaFinal = new Date(this.range.get('fin')?.value).toLocaleDateString('es-PY',{year:"numeric",month:"2-digit", day:"2-digit"});

    this.__dashboarService.getTotalBusquedas(fechaInicio, fechaFinal)
      .subscribe(
        (resp: any) => {
        }
      )
  }

  filterDate(fromDate: any, ToDate: any, data: any){
    return data.filter( (resp:any) => new Date(resp.fecha_cant_eje).getTime() >= new Date( fromDate ).getTime()
      // console.log('dede el filter data', new Date(resp.fecha_cant_eje), new Date( fromDate ))
      ).filter( (resp:any) =>
        new Date(resp.fecha_cant_eje).getTime() <= new Date( ToDate ).getTime()
      )
  }


  obtenerTotalTrabajador(){
    Highcharts.setOptions({
      colors: ['#9AA7E6', '#9BE667','#E6C050','#AD685F',  '#7EE6D4' ]
    });
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
        y: 0
        // layout: 'vertical',
        // floating: true,
        // align: 'left',
        // x: -10,
        // verticalAlign: 'top',
        // y: -10
      },

      xAxis: {
        categories: ['ASSLY ANCHIRAICO AYLAS', 'BRYAN VILLEGAS', 'VICOR AYAIPOMA', 'AXEL DDDDDDDD', 'JOHEL SANDOVAL SANDOVAL', 'DHORLY RUTH ANCHIRAICO YLAS', 'SHIRLEY BLASS SOSA', 'RUBEN ARESTE PIRCA'],
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
        data: [5, 3, 4, 7, 2, 4, 6, 7, 11, 14 , 17, 3, 5],
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


  obtenerTotalActividades(){
    Highcharts.setOptions({
      colors: ['#9AA7E6', '#7EE6D4', '#E6C050', '#AD685F' , '#9BE667' ]
    });
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
        text: 'ACTIVIDAD MAS REALIZADA',
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

        // layout: 'horizontal',
        // floating: true,
        // align: 'left',
        // x: 100,
        // verticalAlign: 'top',
        // y: 70
      },

      xAxis: {
        categories: ['actividad 1', 'actviidad 2', 'actividad 4', 'actviidad 6', 'Jactviidad 6'],
        // this.arrayRegistro,
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
        data: [5, 3, 4, 7, 2],
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
  

  obtenerTotalPie(){
    Highcharts.setOptions({
      colors: ['#9AA7E6', '#AD685F'  , '#9BE667' , '#7EE6D4', '#E6C050']
    });

    this.chartOptionsPie = {
      chart: {
        // renderTo: 'container',
        type: 'pie',
        backgroundColor: '#0000',
        width:'600',
        height:'600',

        margin: 20,
        // options3d: {
        //    enabled: true,
        //    alpha: 40,
        //    beta: 0,
        //   viewDistance: 10,
        // }
      },

      title: {
        text: 'PROCESO DE ACTIVIDADES',
        align: 'center',
        // verticalAlign: 'middle',
        // y: 60,
        style: {
          // colorByPoint: true,
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
         data: [
          ['Chrome', 73.86],
          ['Edge', 11.97],
          ['Firefox', 5.52],
          ['Safari', 2.98],
          ['Internet Explorer', 1.90],
          {
            name: 'Otros',
            y: 0.77,
            dataLabels: {
              enabled: false
            }
          }
        ],
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

