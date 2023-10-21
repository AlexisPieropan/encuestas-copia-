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
  //EN EL HTML SE GENERAN INDIVIDUALMENTE LOS BOTONES PARA EL TIPO DE RESP DE CADA PREG 
  valorRecuperado = localStorage.getItem('tipoRespuestas1');
  valorRecuperado2 = localStorage.getItem('tipoRespuestas2');
  valorRecuperado3 = localStorage.getItem('tipoRespuestas3');
  valorRecuperado4 = localStorage.getItem('tipoRespuestas4');
  valorRecuperado5 = localStorage.getItem('tipoRespuestas5');

  //VARIABLES PARA ALMACENAR EL VALOR DE LA RESPUESTAS QUE SE ELIGEN por cada pregunta
  resp1 = '';
  resp2 = '';
  resp3 = '';
  resp4 = '';
  resp5 = '';
  

  //!!CONSTRUCTOR VACIO INICIALMENTE
  //!!ELIMINAR LAS LINEAS QUE ESTAN DENTRO 
  constructor(private _encuestaService: EncuestaService, private _route: ActivatedRoute,) {
}

  
//OBJETO QUE ALMACENA las respuestas 
//MEJORA PARA NO REPETIR VARIABLES
  encuestaRespuestas: any = {
    resp1: '',
    resp2: '',
    resp3: '',
    resp4: '',
    resp5: '',
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
    //console.log('Respuestas enviadas:', this.encuestaRespuestas);

    //LA VARIABLE DE RESP DE CADA PREG. SE ALMACENA EN UNA VARIABLE DE LOCALSTORAGE (PARA SER RECUPERADA EN DASHBOARD)
    localStorage.setItem('respPreg1', this.resp1);
    localStorage.setItem('respPreg2', this.resp2);
    localStorage.setItem('respPreg3', this.resp3);
    localStorage.setItem('respPreg4', this.resp4);
    localStorage.setItem('respPreg5', this.resp5);
    /*
    const valorResp1 = localStorage.getItem('respPreg1');  //!! ESTA LINEA SOLO ES DE PRUEBA
    console.log("VALOR EN LOCALSTOR",valorResp1);  //!! ESTA LINEA SOLO ES DE PRUEBA
    */
   console.log("SE ALMACENO la resp1 en su variable!!!: ", this.resp1); //!! ESTA LINEA SOLO ES DE PRUEBA 
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


  //!!REVISAR
  limpiarCampos() {
    this.resp1=""; //se vacia la variable para q al recargar no entre al ciclo
    this.resp2=""; 
    this.resp3=""; 
    this.resp4=""; 
    this.resp5=""; 
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
