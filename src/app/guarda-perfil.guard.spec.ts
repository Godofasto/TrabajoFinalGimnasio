import { TestBed } from '@angular/core/testing';

import { GuardaPerfilGuard } from './guarda-perfil.guard';

describe('GuardaPerfilGuard', () => {
  let guard: GuardaPerfilGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardaPerfilGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
