import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { SystemLayoutComponent } from './layout/system-layout/system-layout.component';

import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DynamicModule } from 'ng-dynamic-component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { HighchartsChartModule } from 'highcharts-angular';

export const MY_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    SystemLayoutComponent,
    PagesLayoutComponent,

  ],
  imports: [
    HighchartsChartModule,
    RouterModule,
    DynamicModule,
    BrowserModule, 
    NgxSpinnerModule,
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
  ],

  bootstrap: [
    AppComponent
  ], 
  
  entryComponents: [
    AppComponent
  ],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    
// PARA RECARGAR LA APGINA
    { provide:LocationStrategy, useClass: HashLocationStrategy}
  ]


})
export class AppModule { }
