import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app.routing';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { ObservablesComponent } from './observables/observables.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './mantainances/users/users.component';
import { HospitalsComponent } from './mantainances/hospitals/hospitals.component';
import { DoctorsComponent } from './mantainances/doctors/doctors.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressBarComponent,
    Graphic1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    ObservablesComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule
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
