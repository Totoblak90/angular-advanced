import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styleUrls: ['./increaser.component.css']
})
export class IncreaserComponent {
  @Output() changedValue: EventEmitter<number> = new EventEmitter();
  @Input() porcentaje: number;
  @Input() btnClass = 'btn btn-primary';

  setPorcentaje(value: number): void {
    const num = +value;
    if (this.porcentaje >= 100 && num >= 0) {
      this.porcentaje = 100;
      return;
    }

    if (this.porcentaje <= 0 && num < 0) {
      this.porcentaje = 0;
      return;
    }
    this.porcentaje = this.porcentaje + num;
    this.changedValue.emit(this.porcentaje);
  }

  inputValueChange(value: number): void {
    if (value >= 100) {
      this.porcentaje = 100;
    } else if ( value <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = +value;
    }

    this.changedValue.emit(this.porcentaje);
  }

}
