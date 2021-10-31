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
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { ObservablesComponent } from './observables/observables.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressBarComponent,
    Graphic1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    ObservablesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule
  ],
  exports: [
    DashboardComponent,
    AccountSettingsComponent,
    ProgressBarComponent,
    Graphic1Component,
    PagesComponent,
  ]
})
export class PagesModule { }
