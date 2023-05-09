import { TestBed } from '@angular/core/testing';

import { SubirEntrenadorService } from './subir-entrenador.service';

describe('SubirEntrenadorService', () => {
  let service: SubirEntrenadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirEntrenadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
