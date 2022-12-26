import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteActividadesComponent } from './reporte-actividades/reporte-actividades.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdministradorRoutingModule { }
