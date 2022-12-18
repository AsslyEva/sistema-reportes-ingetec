import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { SystemLayoutComponent } from './layout/system-layout/system-layout.component';

import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { CommonModule } from '@angular/common';
import { DynamicModule } from 'ng-dynamic-component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { GeneralServide } from './service/global/general.service';

@NgModule({
  declarations: [
    AppComponent,
    SystemLayoutComponent,
    PagesLayoutComponent,

  ],
  imports: [
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
    GeneralServide
  ]


})
export class AppModule { }
