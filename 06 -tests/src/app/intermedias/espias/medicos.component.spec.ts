import { empty, Observable, of, throwError } from 'rxjs';
import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';

describe('MedicosComponent', () => {
  let componente: MedicosComponent;
  const servicio = new MedicosService(null);

  beforeEach(() => {
    componente = new MedicosComponent(servicio);
  });

  it('Get médicos debe devolver un array de médicos', () => {
    const medicos = ['Medico1', 'Medico2'];
    spyOn(servicio, 'getMedicos').and.callFake(() => {
      return of(medicos);
    });

    componente.ngOnInit();
    expect(componente.medicos.length).toBeGreaterThan(0);
  });

  it('La función agregar médico del componente debe llamar a la función agregar médico del servicio', () => {
    const espia = spyOn(servicio, 'agregarMedico').and.callFake((medico) => {
      return empty();
    });
    componente.agregarMedico();
    expect(espia).toHaveBeenCalled();
  });

  it('La funcion agregar médico debe agregar un médico al array de médicos del componente', () => {
    const medico = { id: 1, nombre: 'Tobias' };
    spyOn(servicio, 'agregarMedico').and.returnValue(of(medico));
    componente.agregarMedico();
    expect(componente.medicos).toContain(medico);
  });

  it('Si la función del servicio agregar médico cae en un error, debe guardar el mensaje de error en la propiedad mensajeError', () => {
    const msjError = 'Error desconocido';
    spyOn(servicio, 'agregarMedico').and.returnValue(throwError(msjError));
    componente.agregarMedico();
    expect(componente.mensajeError).toBe(msjError);
  });

  it('Debe de llamar al método borrar médico del servicio cuando ejecuto la función borrar médico del componente y CONFIRMO el borrado', () => {
    const id = '1';
    spyOn(window, 'confirm').and.returnValue(true);
    const borrarMedico = spyOn(servicio, 'borrarMedico').and.callFake((id) => {
      return empty();
    });
    componente.borrarMedico(id);
    expect(borrarMedico).toHaveBeenCalledWith(id);
  });

  it('No debe de llamar al método borrar médico del servicio cuando ejecuto la función borrar médico del componente y NIEGO el borrado', () => {
    const id = '1';
    spyOn(window, 'confirm').and.returnValue(false);
    const borrarMedico = spyOn(servicio, 'borrarMedico').and.callFake((id) => {
      return empty();
    });
    componente.borrarMedico(id);
    expect(borrarMedico).not.toHaveBeenCalledWith(id);
  });
});
