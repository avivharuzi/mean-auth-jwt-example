import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CoreComponent } from './core.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../material/material.module";



@NgModule({
  declarations: [HomeComponent, NotFoundComponent, CoreComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    HomeComponent, NotFoundComponent
  ]
})
export class CoreModule { }
