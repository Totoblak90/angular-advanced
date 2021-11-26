import { EventEmitter } from "@angular/core";

export class Jugador2 {

  public hp: number;
  public hpCambia: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.hp = 100;
  }
  public recibeDanio(danio: number) {
    if (danio >= this.hp) {
      this.hp = 0;
    } else {
      this.hp -= danio;
    }

    this.hpCambia.emit( this.hp )
  }
}
