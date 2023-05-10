import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaldaBicepsComponent } from './espalda-biceps.component';

describe('EspaldaBicepsComponent', () => {
  let component: EspaldaBicepsComponent;
  let fixture: ComponentFixture<EspaldaBicepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaldaBicepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaldaBicepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
