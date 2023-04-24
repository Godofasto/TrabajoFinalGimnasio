import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragMisCitasComponent } from './frag-mis-citas.component';

describe('FragMisCitasComponent', () => {
  let component: FragMisCitasComponent;
  let fixture: ComponentFixture<FragMisCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FragMisCitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FragMisCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
