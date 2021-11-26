import { incrementar } from './numeros';

describe('Pruebas con números', () => {
  it('Debe de retornar 100 cuando el valor ingresado es mayor a 100', () => {
    const respuesta = incrementar(150);
    expect(respuesta).toBe(100);
  });
  it('Debe de regresar el valor ingresado +1 cuando dicho valor es menor a 100', () => {
    const valor = 20;
    const respuesta = incrementar(valor);
    expect(respuesta).toBe(valor + 1);
  });
});
