import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormularioComponent } from './formulario/formulario.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    UsuarioRoutingModule,
  ],
  declarations: [
    FormularioComponent
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

  
})
export class UsuarioModule { }
