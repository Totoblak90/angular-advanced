import { FormBuilder } from '@angular/forms';
import { Formulario } from './formulario';

describe('Formularios', () => {
  let componente: Formulario;
  beforeEach(() => (componente = new Formulario(new FormBuilder())));

  it('Debe de crear un formulario con el campo email y el campo password', () => {
    expect(componente.form.contains('email')).toBeTruthy();
    expect(componente.form.contains('password')).toBeTruthy();
  })
  it('El email es requerido', () => {
    const control = componente.form.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  })
  it('El password es requerido', () => {
    const control = componente.form.get('password');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  })
  it('El email debe tener un formato correcto', () => {
    const control = componente.form.get('email');
    control.setValue('tobias.blaksley@hotmail.com');
    expect(control.valid).toBeTruthy();
  })
});
