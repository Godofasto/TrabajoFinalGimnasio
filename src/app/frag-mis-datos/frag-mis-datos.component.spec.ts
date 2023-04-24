import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragMisDatosComponent } from './frag-mis-datos.component';

describe('FragMisDatosComponent', () => {
  let component: FragMisDatosComponent;
  let fixture: ComponentFixture<FragMisDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FragMisDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FragMisDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
