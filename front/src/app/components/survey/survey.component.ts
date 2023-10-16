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
  
  constructor(private _encuestaService: EncuestaService, private _route: ActivatedRoute,) { }

  encuestaRespuestas: any = {
    resp1: '',
    resp2: '',
    resp3: '',
    resp4: '',
    resp5: '',
    resp6: '',
    resp7: '',
    resp8: '',
    resp9: '',
    resp10: '',
  };

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
