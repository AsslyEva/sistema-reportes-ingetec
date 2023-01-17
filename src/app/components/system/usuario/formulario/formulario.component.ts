import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption, ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { map, Observable, startWith } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {Sort} from '@angular/material/sort';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Segmento } from 'src/app/model/global/segmento';
import { ActividadEspecifica } from 'src/app/model/global/actividad_especiifica';
import { SedesService } from 'src/app/service/global/sedes.service';
import { SegmentosService } from 'src/app/service/global/segmentos.service';
import { ActividadesService } from 'src/app/service/global/actividades.service';
import { IntegrantesService } from 'src/app/service/global/integrantes.service';
import { CantidadesEjecutadasService } from 'src/app/service/global/cantidades-ejecutadas.service';
import { Integrante } from 'src/app/model/global/integrantes';

export interface User {
  name: string;
}

export interface Actividad {
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

export interface integrantes {
    id: number;
  name: string;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  required: boolean = true;
  // matDatepickerFilter: boolean = true;

  // inicializacion sedes
  sede = new FormControl('');
  sedesList: any;
  selectedSede: any;

  // configuracion actividades
  productForm: FormGroup;
  rural =  new FormControl('0');
  urbano =  new FormControl('0');
  urbano_rural =  new FormControl('0');


  // public value!: number;
  // public value2!: number;
  // public value3!: number;


  public maxValue: number = 999;
  public minValue: number = 0;




  // *// inicializacion segmento
  segmento = new FormControl('');
  selectedSegmento: Segmento | any;
  segmentos: Segmento[] = [];

  // *// inicializacion actividades
  actividad_especifica = new FormControl('');
  selectActividad_especifica: ActividadEspecifica | any;
  actividades_especifica: ActividadEspecifica[] = [];

  // configuracion autocomplete
  myControl = new FormControl<string | User>('');
  filteredOptions: Observable<User[]> | undefined;

  // inicializacion lider
  lider = new FormControl('');
  selectedLider: any;

  // inicializa fecha
  todayDate : Date = new Date();
  fecha_act =  new FormControl('');
  tomorrow = new Date();
  yesterday = new Date();
  dateForm!: FormGroup;

  // inicializacion integrantes
  integrantes = new FormControl('');
  integrantesList: any[] =[];
  // array is Integrantes
  arrayIntegrantes: any[] =[];

  selectedIntegrantes: any;

  equals(objOne: any, objTwo: any): boolean {
    console.log("objOne",objOne)
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.codigo_integrante == objTwo.codigo_integrante;
    }
    return false
  }

// BOTON SELECCIONAR DE INTEGRANTES
  selectAll(select: MatSelect, values: any, array: any) {

    select.value = this.integrantesList;
    array = values;
    this.arrayIntegrantes = this.integrantesList;
    console.log(this.arrayIntegrantes);
    console.log(select.value);
  }

  deselectAll(select: MatSelect) {
    this.arrayIntegrantes = [];
    select.value = [];
  }

  // color configuracion selec
  colorControl = new FormControl('primary' as ThemePalette);

  constructor(
    private fb:FormBuilder,
    private _formBuilder: FormBuilder,
    private sedesService: SedesService,
    private segmentosService : SegmentosService,
    private actividadesService : ActividadesService,
    private integrantesService : IntegrantesService,
    private cantidadesEjeService : CantidadesEjecutadasService,
    ) {
    this.tomorrow.setDate(this.tomorrow.getDate());
    this.productForm = this.fb.group({
      actividades: this.fb.array([]) ,
    });

    this.ActividadFormGroup = this.fb.group({
      actividades: this.fb.array([]) ,
    });

    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

// cofiguracion de matStep
  SedeFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  CuadrillaFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  LiderFormGroup: FormGroup = this._formBuilder.group({thirdCtrl: ['']});
  IntegrantesFormGroup: FormGroup = this._formBuilder.group({fourthCtrl: ['']});
  SegmentoFormGroup: FormGroup = this._formBuilder.group({fifthCtrl: ['']});
  ActividadFormGroup: FormGroup = this._formBuilder.group({sixthCtrl: ['']});
  CantidadFormGroup: FormGroup = this._formBuilder.group({seventhCtrl: ['']});
  FechaFormGroup: FormGroup = this._formBuilder.group({eighthCtrl: ['']});
  // EvidenciaFormGroup: FormGroup = this._formBuilder.group({ninethCtrl: ['']});

  ngOnInit(): void {
    this.sedesService.getSedes()
    .subscribe((resp)=> {
      this.sedesList=resp
    })
  }

  changeSede(){
    console.log (this.selectedSede)

    this.segmentosService.getSegmentosBySede(this.selectedSede)
    .subscribe((resp: Segmento[])=> {
      this.segmentos = resp;
    })

    this.integrantesService.getIntegrantesBySede(this.selectedSede)
    .subscribe((resp: any) => {
      this.integrantesList = resp;
    })
  }

  changeSegmento(){
    console.log (this.selectedSegmento)

    this.actividadesService.getActividades(this.selectedSegmento)
    .subscribe((resp: ActividadEspecifica[])=> {
      this.actividades_especifica = resp;
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


  /* MANEJO DEL ARRAY DE CANTIDADES */

  //Inicializa el array de cantidades
  actividades() : FormArray {
    return this.productForm.get("actividades") as FormArray
  }

  //Guardar valores para las cantidades
  nuevaActividad(): FormGroup {
    return this.fb.group({
      fecha_cant_eje: this.formatDate(this.fecha_act.value!),
      codigo_segmento: this.segmento.value,
      codigo_act: this.actividad_especifica.value,
      detalle_segmento: this.segmentos.find(element => element.codigo_seg == parseInt(this.selectedSegmento))?.descripcion_seg,
      detalle_actividad: this.actividades_especifica.find(element => element.codigo_act == parseInt(this.selectActividad_especifica))?.descripcion_act,
      cantidad_rural_eje: this.rural.value,
      cantidad_urbano_eje: this.urbano.value,
      cantidad_urbrural_eje: this.urbano_rural.value,
      codigo_sede: this.selectedSede,
      lider_eje: this.selectedLider,
      integrantes: [ this.arrayIntegrantes ]

    })

  }


  //Añadir los valores de las canti  dades al array de cantidades
  agregarActividades() {
    if (
      this.fecha_act.value
      && this.segmento.value
      && this.actividad_especifica.value
      && this.rural.value
      && this.urbano.value
      && this.urbano_rural.value ) {
      this.actividades().push(this.nuevaActividad());
      console.log(this.actividades().value)
      console.log('integrantes', this.arrayIntegrantes)
      //limpiar controls
      //this.fecha_act.reset();
      this.segmento.reset();
      this.actividad_especifica.reset();
      this.rural.setValue('0');
      this.urbano.setValue('0');
      this.urbano_rural.setValue('0');
    } else {
      Swal.fire(
        'Es necesario ingresar tdodos los datos, en caso no exista coloque "0", para agregarlo',
        environment.systemName,
        'warning'
      );
    }
  }

  //Quitar cantidad del array
  quitarActividades(i:number) {
    this.actividades().removeAt(i);
  }

  toChange(){
    console.log(this.todayDate);
  }

  onSubmit() {
    const arrayActividades = this.actividades().value;

    arrayActividades.forEach((element: any)=> {
      this.cantidadesEjeService.postInsertarEje( element ).
      subscribe( (resp: any) => {

        console.log(resp);
        Swal.fire(
          {
            position: 'center',
            icon: 'success',
            title: 'Registraste exitosamente tu ejecución',
            showConfirmButton: false,
            timer: 1500
          }
        )
        this.SedeFormGroup.reset();
        this.lider.reset();
        this.LiderFormGroup.reset();
        this.CuadrillaFormGroup.reset();

        // elimina tabla actividades
        this.actividades().removeAt(this.selectedSegmento);
        this.actividades().removeAt(this.selectedSegmento);
        this.actividades().removeAt(this.selectActividad_especifica);

        // solo resetea actividaes
        this.actividades().reset();
      },

      (err) => {

        if (err.status != 500) {

          let errorIcon = "error" ;
          let errorTitle = "Error no especifico al momento de ingresar al módulo";
          let errorDescription = "Por favor comunicarse con soporte del " + environment.systemName;

          switch ( err.status ) {
            case 400:
              errorTitle = err.error.error_description;
              if ( err.error.error == "invalid_grant" ) {//valida si usuario o contraseña no coincide
                errorDescription = "Por favor verificar si sus credenciales son correctas";
              }
              break;
            case 401:
              errorIcon = "info";
              errorTitle = err.error.error_description;
              errorDescription = "Por favor enviar este mensaje al soporte del sistema";
              break;
            case 403:
              errorIcon = "warning";
              errorTitle = err.error.error_description;
              break;
            case 0:
              errorTitle = "El servidor del sistema se encuentra en actualización o apagado";
              break;
          }

          Swal.fire({
            icon: errorIcon as SweetAlertIcon,
            title: errorTitle,
            text: errorDescription,
            // allowEnterKey: false,
            // allowEscapeKey: false,
            allowOutsideClick: false,
            confirmButtonColor: '#00A5A5',
            confirmButtonText: '<span style="padding: 0 15px;">OK</span>'
          });

        } else {

          Swal.fire({
            icon: "error",
            title: "Se ha producido un error al intentar ingresar al módulo (Esto puede ser debido por una desconexión a la base de datos o algun error en el programa)",
            text: "Intente nuevamente, si persiste por favor comunicarse con Mesa de Ayuda o personal de soporte del " + environment.systemName,
            // allowEnterKey: false,
            // allowEscapeKey: false,
            allowOutsideClick: false,
            confirmButtonColor: '#00A5A5',
            confirmButtonText: '<span style="padding: 0 15px;">OK</span>'
          });

        }

      }

    );
    });
  }

  disableThirdHeader = false;
  actividad = [];

  sortedData = this.actividad.slice();
  sortData() {
  }

}
