import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleCuadrillaComponent } from './detalle-cuadrilla/detalle-cuadrilla.component';
import { AngularMaterialModule } from './angular-material.module';
import { DialogsService } from './dialogs.service';
import { TitleFrameComponent } from './title-frame/title-frame.component';
import { TituloDialogComponent } from './titulo-dialog/titulo-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgxSpinnerModule,
    DataTablesModule,

  ],
  declarations: [
    DetalleCuadrillaComponent,
    TitleFrameComponent,
    TituloDialogComponent,
],
  exports: [
    DetalleCuadrillaComponent,
    AngularMaterialModule,
    TitleFrameComponent,
    TituloDialogComponent,
    NgxSpinnerModule
],
  entryComponents: [
    DetalleCuadrillaComponent
],
  providers: [
    DialogsService
]
})
export class SharedModule { }