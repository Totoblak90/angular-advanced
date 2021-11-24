import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { ObservablesComponent } from './observables/observables.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './mantainances/users/users.component';
import { HospitalsComponent } from './mantainances/hospitals/hospitals.component';
import { DoctorsComponent } from './mantainances/doctors/doctors.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  {
    path: 'graphic1',
    component: Graphic1Component,
    data: { title: 'Graphic # 1' },
  },
  {
    path: 'progress',
    component: ProgressBarComponent,
    data: { title: 'Progress bar' },
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { title: 'Account settings' },
  },
  {
    path: 'promises',
    component: PromisesComponent,
    data: { title: 'Promises' },
  },
  {
    path: 'observables',
    component: ObservablesComponent,
    data: { title: 'Observables' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'My profile' },
  },
  {
    path: 'search/:term',
    component: SearchComponent,
    data: { title: 'Search' },
  },
  { path: 'search', redirectTo: '/dashboard', pathMatch: 'full' },

  // Mantainances
  {
    path: 'users',
    canActivate: [AdminGuard],
    component: UsersComponent,
    data: { title: 'Users admin panel' },
  },
  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: { title: 'Hospitals admin panel' },
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
    data: { title: 'Doctors admin panel' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
