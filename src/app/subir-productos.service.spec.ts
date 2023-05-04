import { TestBed } from '@angular/core/testing';

import { SubirProductosService } from './subir-productos.service';

describe('SubirProductosService', () => {
  let service: SubirProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
