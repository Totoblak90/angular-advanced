import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  porcentaje1 = 50;
  porcentaje2 = 25;

  get getPorcentaje1(): string {
    return `${ this.porcentaje1 }%`;
  }

  get getPorcentaje2(): string {
    return `${ this.porcentaje2 }%`;
  }
}
