import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { DialogsService } from 'src/app/components/shared/dialogs.service';
import { IntegrantesService } from 'src/app/service/global/integrantes.service';
import { LenguajeDataTable } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { integrantes } from '../../usuario/formulario/formulario.component';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { EditarService } from './editar.service';

@Component({
  selector: 'app-agregar-empleados',
  templateUrl: './agregar-empleados.component.html',
  styleUrls: ['./agregar-empleados.component.scss']
})
export class AgregarEmpleadosComponent implements OnDestroy , OnInit{
  //Configuracion para datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  integrantes: any[] = [];
  actosFilter : any[] = [];


    // activar
    estadoDesactivado= true;


  constructor(
    public editarService: EditarService,
    private dialog: MatDialog,
    private integrantesService: IntegrantesService,
    private httpClient: HttpClient
  ){}


  ngOnInit(): void {

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

    this.integrantesService.getIntegrantesUsuarios()
    .subscribe(
      (resp: any) => {
        this.integrantes = resp;
      }
    );

  }
 
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  agregarEmpleado() {
    const dialodRef = this.dialog.open( AgregarEmpleadoComponent, {
      width: '30%',
      autoFocus: false,
      disableClose: true,
      panelClass: 'myapp-no-padding-dialog',
    } )
  }

  result: any;
  editarEmpleado(codigo: any) {
    this.editarService
      .confirm(codigo)
    //   .subscribe((res: any) => this.result = res);

    // const dialodRef = this.dialog.open( EditarEmpleadoComponent, {
    //   width: '30%',
    //   autoFocus: false,
    //   disableClose: true,
    //   panelClass: 'myapp-no-padding-dialog',
    // } )
  }

  eliminarEmpleado(){

    Swal.fire({
      title: '¿Estas Seguro?',
      text: "De eliminar al usuario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar ahora'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado',
          'Usuario Eliminado',
          'success'
        )
      }
    })
  }


  changeEstadoDesactivado() {
    this.estadoDesactivado = !this.estadoDesactivado;
    console.log("estado ", this.estadoDesactivado);
  }
  
}
