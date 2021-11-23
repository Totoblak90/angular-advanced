import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetImagePipe } from './get-image.pipe';



@NgModule({
  declarations: [
    GetImagePipe
  ],
  exports: [ GetImagePipe ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
