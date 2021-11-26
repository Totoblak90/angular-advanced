import { obtenerJugadores } from './arrays';
describe('Pruebas de arrays', () => {
  it('Debe tener al menos 3 ítems, contener a Messi, ninguno de sus ítems ser falsy y cada uno debe ser de tipo string', () => {
    const testArray = obtenerJugadores();
    expect(testArray.length).toBeGreaterThanOrEqual(3);
    expect(testArray).toContain('Messi');
    testArray.forEach((player) => expect(player).toBeTruthy());
    testArray.forEach((player) => expect(typeof player).toBe('string'));
  });
});
