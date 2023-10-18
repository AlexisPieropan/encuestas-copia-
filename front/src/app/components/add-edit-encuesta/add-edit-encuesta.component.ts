import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Encuesta } from 'src/app/interfaces/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-add-edit-encuesta',
  templateUrl: './add-edit-encuesta.component.html',
  styleUrls: ['./add-edit-encuesta.component.css']
})
export class AddEditEncuestaComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(
    private fb: FormBuilder,
    private _encuestaService: EncuestaService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      preg1: [''],
      preg2: [''],
      preg3: [''],
      preg4: [''],
      preg5: [''],
      preg6: [''],
      preg7: [''],
      preg8: [''],
      preg9: [''],
      preg10: [''],
      tipoRespuestas: ['si-no'], // Valor predeterminado, puedes cambiarlo
      tipoRespuestas2: ['si-no'] // Valor predeterminado, puedes cambiarlo
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getEncuesta(this.id);
    }

    //!!SE PUEDE BORRAR
    // Recuperar el valor de tipoRespuestas del localStorage si está almacenado
    const tipoRespuestas = localStorage.getItem('tipoRespuestas');
    if (tipoRespuestas) {
      this.form.get('tipoRespuestas')?.setValue(tipoRespuestas);
    }
    //!!---------------------------------------------------------
  }

  // ... (otras partes de tu componente)
  getEncuesta(id: number) {
    this.loading = true;
    this._encuestaService.getEncuesta(id).subscribe((data: Encuesta) => {
      this.loading = false;
      this.form.setValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        preg1: data.preg1,
        preg2: data.preg2,
        preg3: data.preg3,
        preg4: data.preg4,
        preg5: data.preg5,
        preg6: data.preg6,
        preg7: data.preg7,
        preg8: data.preg8,
        preg9: data.preg9,
        preg10: data.preg10,
        tipoRespuestas1: ['si-no'], // Valor predeterminado, donde se almacena el tipo de respuesta 
        tipoRespuestas2: ['si-no'] // Valor predeterminado, donde se almacena el tipo de respuesta 
      })
    })
  }

  addEncuesta() {
    /*  console.log(this.form.value.name);
     console.log(this.form.get('name')?.value); */

    const encuesta: Encuesta = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      preg1: this.form.value.preg1,
      preg2: this.form.value.preg2,
      preg3: this.form.value.preg3,
      preg4: this.form.value.preg4,
      preg5: this.form.value.preg5,
      preg6: this.form.value.preg6,
      preg7: this.form.value.preg7,
      preg8: this.form.value.preg8,
      preg9: this.form.value.preg9,
      preg10: this.form.value.preg10,
    }
    this.loading = true;

    if (this.id !== 0) {
      // Es editar 
      encuesta.id = this.id;
      this._encuestaService.updateEncuesta(this.id, encuesta).subscribe(() => {
        Swal.fire({
          text: `La encuesta ${encuesta.nombre} fue actualizada con exito`,
          icon: 'success',
          background: '#1a891afa',
          color: 'white',
          toast: true,
          position: 'bottom-end',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.loading = false;
        this.router.navigate(['/main']);
      })
    } else {
      // Es agregagar
      this._encuestaService.saveEncuesta(encuesta).subscribe(() => {
        Swal.fire({
          text: `La encuesta ${encuesta.nombre} fue registrada con exito`,
          icon: 'success',
          background: '#1a891afa',
          color: 'white',
          toast: true,
          position: 'bottom-end',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.loading = false;
        this.router.navigate(['/main']);
      })
    }
localStorage.setItem('tipoRespuestas', this.form.get('tipoRespuestas')?.value); //SE ALMACENA EL TIPO DE RESPUESTA QUE SE SELECCIONO EN LOCAL STORAGE
localStorage.setItem('tipoRespuestas2', this.form.get('tipoRespuestas2')?.value); //SE ALMACENA EL TIPO DE RESPUESTA QUE SE SELECCIONO EN LOCAL STORAGE

  }
}
