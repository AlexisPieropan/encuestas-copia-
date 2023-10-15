import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEncuestaComponent } from './add-edit-encuesta.component';

describe('AddEditEncuestaComponent', () => {
  let component: AddEditEncuestaComponent;
  let fixture: ComponentFixture<AddEditEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEncuestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
