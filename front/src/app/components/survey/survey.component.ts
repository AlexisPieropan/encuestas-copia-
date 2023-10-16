import { Component } from '@angular/core';
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

  encuestaRespuestas: any = {
    hospedaje: '',
    tiempoEstadia: '',
    excursiones: [],
    comentarios: ''
  };

  submitEncuesta() {
    // ver respuesta en objeto
    console.log('Respuestas enviadas:', this.encuestaRespuestas);
    Swal.fire({
      text: 'Encuesta enviada! Muchas gracias.',
      icon: 'success',
      background: '#1a891afa',
      color: 'white',
      // toast: true,
      // position: 'bottom-end',  
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
