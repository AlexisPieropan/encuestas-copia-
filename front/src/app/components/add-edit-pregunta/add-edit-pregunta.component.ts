import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

import { Pregunta } from 'src/app/interfaces/pregunta';
import { PreguntaService} from 'src/app/services/pregunta.service';

@Component({
  selector: 'app-add-edit-pregunta',
  templateUrl: './add-edit-pregunta.component.html',
  styleUrls: ['./add-edit-pregunta.component.css']
})
export class AddEditPreguntaComponent implements OnInit {

  formP: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';


  constructor(private fb: FormBuilder,
    private _preguntaService: PreguntaService,
    private router: Router,
    private aRouter: ActivatedRoute) {

      
    this.formP = this.fb.group({
      pregunta: ['', Validators.required],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));

     }

     //CONEXION CON EL BACK
  ngOnInit(): void {


    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getPregunta(this.id);
    }
  }

  getPregunta(id: number) {
    this.loading = true;
    this._preguntaService.getPregunta(id).subscribe((data: Pregunta) => {
      this.loading = false;
      this.formP.setValue({
        texto: data.texto,
        tipo: data.tipo,
        tipoResp: data.tipoResp
      })
    })
  }

  addEncuesta() {
    /*  console.log(this.form.value.name);
     console.log(this.form.get('name')?.value); */

    const encuesta: Pregunta = {
      texto: this.formP.value.texto,
      tipo: this.formP.value.tipo,
      tipoResp: this.formP.value.tipoResp
    }
    this.loading = true;

    if (this.id !== 0) {
      // Es editar 
      encuesta.id = this.id;
      this._preguntaService.updatePregunta(this.id, encuesta).subscribe(() => {


        Swal.fire({
          text: `La encuesta ${encuesta.texto} fue actualizada con exito`,
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
      this._preguntaService.savePregunta(encuesta).subscribe(() => {


        Swal.fire({
          text: `La encuesta ${encuesta.texto} fue registrada con exito`,
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
  }
}


