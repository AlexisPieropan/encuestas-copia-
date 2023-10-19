import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';
import Swal from 'sweetalert2';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  // loading: boolean = false;
  // setTimeout(()=>{
  //     loading = false;
  // },1000)

  loading: boolean = false;
  currentEncuesta: any = {};
  //VARIABLES QUE RECUPERAN el tipo de respuestas que se cargaron en el componente de "agrega encuesta" (SURVEY)
  valorRecuperado = localStorage.getItem('tipoRespuestas1');
  valorRecuperado2 = localStorage.getItem('tipoRespuestas2');
  valorRecuperado3 = localStorage.getItem('tipoRespuestas3');
  valorRecuperado4 = localStorage.getItem('tipoRespuestas4');
  valorRecuperado5 = localStorage.getItem('tipoRespuestas5');


  

  //!!CONSTRUCTOR VACIO INICIALMENTE
  //!!ELIMINAR LAS LINEAS QUE ESTAN DENTRO 
  constructor(private _encuestaService: EncuestaService, private _route: ActivatedRoute,) {

    
    const valorRecuperado = localStorage.getItem('tipoRespuestas1');
    const valorRecuperado2 = localStorage.getItem('tipoRespuestas2');

  if (valorRecuperado) {
    // Realiza alguna lógica con el valor recuperado
    console.log('Valor recuperado 1:', valorRecuperado);
  } else {
    console.log('La clave "tipoRespuestas" no existe en localStorage.');
  } 
  if (valorRecuperado2) {
    // Realiza alguna lógica con el valor recuperado
    console.log('Valor recuperado 2:', valorRecuperado2);
  } else {
    console.log('La clave "tipoRespuestas" no existe en localStorage.');
  } 

}

  
//OBJETO QUE ALMACENA las respuestas 
  encuestaRespuestas: any = {
    resp1: '',
    resp2: '',
    resp3: '',
    resp4: '',
    resp5: '',
  };

    //ALMACENAR DEL OBJECT LA RESPUESTAS PARA RECUPERAR EN DASHBOARD CON LOCALSTORAGE:
  // Para almacenar un atributo de 'encuestaRespuestas' en localStorage









  ngOnInit(): void {
    this.loading = true;
    const id = this._route.snapshot.params['id'];
    this._encuestaService.getEncuesta(id).subscribe((data: any) => {
      this.currentEncuesta = data;
      this.loading = false;
    });
  }

  submitEncuesta() {
    console.log('Respuestas enviadas:', this.encuestaRespuestas);
    Swal.fire({
      text: 'Encuesta enviada! Muchas gracias.',
      icon: 'success',
      background: '#1a891afa',
      color: 'white',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    })
  }

  limpiarCampos() {
    this.encuestaRespuestas = {
      hospedaje: '',
      tiempoEstadia: '',
      excursiones: [],
      comentarios: ''
    };
    Swal.fire({
      text: 'Campos resetados.',
      icon: 'info',
      background: '#337ab7',
      color: 'white',
      toast: true,
      position: 'bottom-end',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    })
  }
}
