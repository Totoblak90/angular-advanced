import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app.routing';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressBarComponent,
    Graphic1Component,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }
