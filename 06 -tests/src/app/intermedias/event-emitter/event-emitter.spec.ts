import { Jugador2 } from "./event-emitter";

let jugador: Jugador2;

describe('Pruebas para event emitters', () => {

  beforeEach(() => jugador = new Jugador2());

  it('Debe de emitir un valor cuando recibe danio', () => {
    let hp = 0;

    jugador.hpCambia.subscribe(hpCambia => hp = hpCambia);
    jugador.recibeDanio(1000);

    expect(hp).toBe(0);
  });

  it('Debe de emitir un valor cuando recibe danio y sobrevivir', () => {
    let hp = 0;

    jugador.hpCambia.subscribe(hpCambia => hp = hpCambia);
    jugador.recibeDanio(50);

    expect(hp).toBe(50);
  })
})
