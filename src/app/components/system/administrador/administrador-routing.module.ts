import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEmpleadosComponent } from './agregar-empleados/agregar-empleados.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReporteActividadesComponent } from './reporte-actividades/reporte-actividades.component';
import { ReporteEmpleadosComponent } from './reporte-empleados/reporte-empleados.component';
import { ReporteValorizacionComponent } from './reporte-valorizacion/reporte-valorizacion.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: ReporteActividadesComponent
  },
  {
    path: 'valorizacion',
    component: ReporteValorizacionComponent
  },

  {
    path: 'empleados',
    component: ReporteEmpleadosComponent
  },

  {
    path: 'addEmpleados',
    component: AgregarEmpleadosComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdministradorRoutingModule { }
