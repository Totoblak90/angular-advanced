import { userIsLogged } from './boolean';
describe('Pruebas de booleanos', () => {
  it('Debe de regresar true', () => {
    const resp = userIsLogged(true);
    expect(resp).toBeTrue();
  });
  it('Debe de regresar false', () => {
    const resp = userIsLogged(false);
    expect(resp).toBeFalse();
  });

})
