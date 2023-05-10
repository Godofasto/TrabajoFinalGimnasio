import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiernaHombroComponent } from './pierna-hombro.component';

describe('PiernaHombroComponent', () => {
  let component: PiernaHombroComponent;
  let fixture: ComponentFixture<PiernaHombroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiernaHombroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiernaHombroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
