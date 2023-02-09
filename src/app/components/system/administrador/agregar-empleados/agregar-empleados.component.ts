import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { DialogsService } from 'src/app/components/shared/dialogs.service';
import { IntegrantesService } from 'src/app/service/global/integrantes.service';
import { LenguajeDataTable } from 'src/app/utils/utils';
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
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  integrantes: any[] = [];
  actosFilter : any[] = [];

  constructor(
    public editarService: EditarService,
    private dialog: MatDialog,
    private integrantesService: IntegrantesService
  ){}


  ngOnInit(): void {

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
        { className: "text-center align-middle border-bottom", "targets": [0, 1, 2,3,4] },
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
}
