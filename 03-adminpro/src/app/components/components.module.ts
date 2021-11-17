import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { IncreaserComponent } from './increaser/increaser/increaser.component';
import { DognoughtChartComponent } from './dognought-chart/dognought-chart.component';
import { ModalImgComponent } from './modal-img/modal-img.component';



@NgModule({
  declarations: [
    IncreaserComponent,
    DognoughtChartComponent,
    ModalImgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncreaserComponent,
    DognoughtChartComponent,
    ModalImgComponent
  ]
})
export class ComponentsModule { }
