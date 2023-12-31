import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEncuestaComponent } from './list-encuesta.component';

describe('ListEncuestaComponent', () => {
  let component: ListEncuestaComponent;
  let fixture: ComponentFixture<ListEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEncuestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
