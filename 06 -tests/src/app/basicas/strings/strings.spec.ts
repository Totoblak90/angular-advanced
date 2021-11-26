import { saludo } from './strings';

describe('Pruebas de strings', () => {
  it('Debe regresar un nombre', () => {
    const saludo1 = saludo('Tobias');
    expect(typeof saludo1).toBe('string');
    // expect(typeof saludo1).toBe('boolean');
  });
  it('Debe de retornar el parámetro enviado', () => {
    const nombre = 'Tobias'
    const saludo1 = saludo(nombre);
    expect(saludo1).toContain(nombre)
    expect(nombre).toBeTruthy()
  });
});
