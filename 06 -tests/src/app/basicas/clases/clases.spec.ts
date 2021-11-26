import { Jugador } from './clases';

describe('Pruebas de clase', () => {

  let jugador = new Jugador();

  beforeAll(() => {
    // console.log('beforeAll')
  })

  beforeEach(() => {
    // console.log('beforeEach')
    // jugador.hp = 100;
    jugador = new Jugador();
  });

  afterAll(() => {
    // console.log('afterAll')
  });

  afterEach(() => {
    // console.log('AfterEach')
    // jugador.hp = 100;
  })

  it('Debe de retornar 80 de hp si le hago 20 de daño', () => {
    const res = jugador.recibeDanio(20)
    expect(res).toBe(80);
  });
  it('Debe de retornar 50 de hp si le hago 50 de daño', () => {
    const res = jugador.recibeDanio(50)
    expect(res).toBe(50);
  });
  it('Debe de retornar 0 de hp si le hago 100 o más de daño', () => {
    const res = jugador.recibeDanio(150)
    expect(res).toBe(0);
  });
})
