import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { IncreaserComponent } from './increaser/increaser/increaser.component';
import { DognoughtChartComponent } from './dognought-chart/dognought-chart.component';
import { ModalImgComponent } from './modal-img/modal-img.component';
import { SearchTableComponent } from './search-table/search-table.component';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    IncreaserComponent,
    DognoughtChartComponent,
    ModalImgComponent,
    SearchTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    PipesModule,
    RouterModule
  ],
  exports: [
    IncreaserComponent,
    DognoughtChartComponent,
    ModalImgComponent,
    SearchTableComponent
  ]
})
export class ComponentsModule { }
