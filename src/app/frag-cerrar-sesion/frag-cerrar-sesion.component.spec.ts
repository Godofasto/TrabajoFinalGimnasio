import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragCerrarSesionComponent } from './frag-cerrar-sesion.component';

describe('FragCerrarSesionComponent', () => {
  let component: FragCerrarSesionComponent;
  let fixture: ComponentFixture<FragCerrarSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FragCerrarSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FragCerrarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
