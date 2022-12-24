import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { map, Observable, startWith } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {Sort} from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Segmento } from 'src/app/model/interfaces/global/segmento';
import { ActividadEspecifica } from 'src/app/model/interfaces/global/actividad_especiifica';
import { GeneralServide } from 'src/app/service/global/general.service';
import { SedesService } from 'src/app/service/global/sedes.service';
import { SegmentosService } from 'src/app/service/global/segmentos.service';
import { ActividadesService } from 'src/app/service/global/actividades.service';

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



// export const INTEGRANTES: integrantes[] = [
//   { id: 2, name: "ASSLY" },
//   { id: 3, name: "BRYAN" },
//   { id: 4, name: "FRANCO" },
//   { id: 5, name: "JANESSY" }
// ];

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
  rural =  new FormControl('');
  urbano =  new FormControl('');
  
  // *// inicializacion segmento
  selectedSegmento: Segmento | null = null;
  segmentos: Segmento[] = [];
  // segmentosList: string[] = ['INSTALACION', 'CORTE', 'REPARTO'];
 
  // *// inicializacion actividades
  actividades_especifica: ActividadEspecifica[] = [];
  // actividad_especificaList: string[] = ['Aéreo Monofásico', 'Aéreo Trifásico', 'Subterráneo Monofásico sin rotura ni resane de vereda'];
 // array is selectedIntegrantes
//  selectedActividad_especifica!: any[];
 

  // configuracion autocomplete
  myControl = new FormControl<string | User>('');
  filteredOptions: Observable<User[]> | undefined;

  // inicializacion lider
  lider = new FormControl('');

  // inicializa fecha
  todayDate : Date = new Date();
  fecha_act =  new FormControl('');


// inicializacion integrantes
integrantes = new FormControl('');
integrantesList: string[] = ['ANA', 'ERIKA', 'VICTOR', 'BRYAN', 'FRANCO', 'JANESSY'];
searchUserForm!: FormGroup;
 // array is selectedIntegrantes
 selectedIntegrantes!: any[];
 SelectActividad_especifica!: any[];
 
 selectAll(select: MatSelect, values: any, array: any) {
  select.value = values;
  array = values;
  console.log(this.selectedIntegrantes); 
  // console.log(this.selectedActividad_especifica); // selectedIntegrantes is still undefined
  // selectedIntegrantes is still undefined
}

deselectAll(select: MatSelect) {
  this.selectedIntegrantes = [];
  // this.selectedActividad_especifica = [];
  select.value = [];
}


  // color configuracion selec
  colorControl = new FormControl('primary' as ThemePalette);

  constructor(
    private fb:FormBuilder,
    private _formBuilder: FormBuilder,
    private generalService: GeneralServide,
    private sedesService: SedesService,
    private segmentosService : SegmentosService,
    private actividadesService : ActividadesService
    ) {
      
    this.productForm = this.fb.group({
      actividades: this.fb.array([]) ,
    });

    this.ActividadFormGroup = this.fb.group({
      actividades: this.fb.array([]) ,
    });


  }

  SedeFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  LiderFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  IntegrantesFormGroup: FormGroup = this._formBuilder.group({thirdCtrl: ['']});
  SegmentoFormGroup: FormGroup = this._formBuilder.group({fourthCtrl: ['']});
  ActividadFormGroup: FormGroup = this._formBuilder.group({fifthCtrl: ['']});
  CantidadFormGroup: FormGroup = this._formBuilder.group({sixthCtrl: ['']});
  FechaFormGroup: FormGroup = this._formBuilder.group({seventhCtrl: ['']});
  EvidenciaFormGroup: FormGroup = this._formBuilder.group({eighthCtrl: ['']});


  
  
  ngOnInit(): void {
    this.sedesService.getSedes()
    .subscribe((resp)=> {
      this.sedesList=resp
    })

    // this.segmentos = this.generalService.getSegmento();
    // this.onSelect(this.selectedSegmento.id_segmento);
  }


  changeSede(){
    console.log (this.selectedSede)

    this.segmentosService.getSegmentos(this.selectedSede)
    .subscribe((resp: Segmento[])=> {
      this.segmentos = resp;
    })
  }
  // onSelect(segmentoid: number) {
  //   console.log('value: ' + 'agrega actividad');
  //   this.actividades_especifica = this.generalService.getActividadEspecifica().filter((item) => item.segmentoid == segmentoid); 
  //  }

  /* MANEJO DEL ARRAY DE CANTIDADES */

  //Inicializa el array de cantidades
  actividades() : FormArray {
    return this.productForm.get("actividades") as FormArray
  }

  //Guardar valores para las cantidades
  nuevaActividad(): FormGroup {
    return this.fb.group({
      fecha_actividad: this.fecha_act.value,
      detalle_segmento: this.selectedSegmento,
      detalle_actividad: this.actividades_especifica,
      cantidad_rural: this.rural.value,
      cantidad_urbano: this.urbano.value,
    })
  }

  //Añadir los valores de las cantidades al array de cantidades
  agregarActividades() {
    if (this.fecha_act.value && this.segmentos && this.actividades_especifica && this.rural.value && this.urbano.value) {
      this.actividades().push(this.nuevaActividad());
      console.log(this.actividades().value)
      //limpiar controls
      this.fecha_act.reset();
      this.segmentos;
      this.actividades_especifica;
      this.rural.reset();
      this.urbano.reset();
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




  onSubmit() {
    console.log(this.productForm.value);
  }

  disableThirdHeader = false;
  actividad = [];

  sortedData = this.actividad.slice();
  sortData() {
  }


}
