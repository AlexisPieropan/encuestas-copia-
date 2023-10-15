import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPreguntaComponent } from './add-edit-pregunta.component';

describe('AddEditPreguntaComponent', () => {
  let component: AddEditPreguntaComponent;
  let fixture: ComponentFixture<AddEditPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPreguntaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
