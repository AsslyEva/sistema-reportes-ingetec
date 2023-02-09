import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReporteActividadesComponent } from './reporte-actividades/reporte-actividades.component';
import { ReporteValorizacionComponent } from './reporte-valorizacion/reporte-valorizacion.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppComponent } from 'src/app/app.component';
import { DynamicModule } from 'ng-dynamic-component';
import { DataTablesModule } from 'angular-datatables';
import { DialogsService } from '../../shared/dialogs.service';
import { ReporteEmpleadosComponent } from './reporte-empleados/reporte-empleados.component';
import { AgregarEmpleadosComponent } from './agregar-empleados/agregar-empleados.component';
import { AgregarEmpleadoComponent } from './agregar-empleados/agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './agregar-empleados/editar-empleado/editar-empleado.component';
import { EditarService } from './agregar-empleados/editar.service';
// import { GeneralServide } from 'src/app/service/global/general.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AdministradorRoutingModule,
    DataTablesModule,
    DynamicModule,
    FormsModule,
    // NoopAnimationsModule,


  ],
  declarations: [
    ReporteActividadesComponent,
    ReporteValorizacionComponent,
    ReporteEmpleadosComponent,
    AgregarEmpleadosComponent,
    AgregarEmpleadoComponent,
    EditarEmpleadoComponent,
  ],
  providers: [
    DialogsService,
    EditarService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
  ],

  bootstrap: [AppComponent]

})


export class AdministradorModule { }
