import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragMisTablasComponent } from './frag-mis-tablas.component';

describe('FragMisTablasComponent', () => {
  let component: FragMisTablasComponent;
  let fixture: ComponentFixture<FragMisTablasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FragMisTablasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FragMisTablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
