import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private toastr: ToastrService) {}

  submitEncuesta() {
    // ver respuesta en objeto
    console.log('Respuestas enviadas:', this.encuestaRespuestas);
    this.toastr.success('Encuesta enviada! Muchas gracias.');
  }

  limpiarCampos() {
    this.encuestaRespuestas = {
      hospedaje: '',
      tiempoEstadia: '',
      excursiones: [],
      comentarios: ''
    };
    this.toastr.info('Campos resetados');
  }
}
