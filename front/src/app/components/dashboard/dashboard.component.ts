import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { ActivatedRoute } from '@angular/router';
import { Encuesta } from 'src/app/interfaces/encuesta';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  //punteros para pintar el grafico 
  @ViewChild('metricasChart', { static: false }) metricasChart: ElementRef | undefined;
  @ViewChild('metricasChart2', { static: false }) metricasChart2: ElementRef | undefined;
  @ViewChild('metricasChart3', { static: false }) metricasChart3: ElementRef | undefined;

  //variables de acumulacion
  metricaSi = 0;
  metricaNo = 0;
  metrica1al5 = 0;
  metrica1al10 = 0;
  
  metrica1 = 0;
  metrica2 = 0;
  metrica3 = 0;
  metrica4 = 0;
  metrica5 = 0;
  metrica6 = 0;
  metrica7 = 0;
  metrica8 = 0;
  metrica9 = 0;
  metrica10 = 0;

//VARIABLES DE RECUPERACION DE TIPO DE RESP "SI-NO", "1-5" ETC
//SE UTILIZA PARA LA CONDICIONAL EN EL HTML Y DE ACUERDO A ESO LLAMAR EL TIPO DE GRAFICO CORRESPONDIENTE
  valorDeSurvey1 = localStorage.getItem('tipoRespuestas1');
  valorDeSurvey2 = localStorage.getItem('tipoRespuestas2');
  valorDeSurvey3 = localStorage.getItem('tipoRespuestas3');
  valorDeSurvey4 = localStorage.getItem('tipoRespuestas4');
  valorDeSurvey5 = localStorage.getItem('tipoRespuestas5');


  //VARIABLES QUE RECUPERAN EL VALOR DE LA RESPUESTA 
  valorResp1 = localStorage.getItem('respPreg1');
  valorResp2 = localStorage.getItem('respPreg2');
  valorResp3 = localStorage.getItem('respPreg3');
  valorResp4 = localStorage.getItem('respPreg4');
  valorResp5 = localStorage.getItem('respPreg5');



  currentEncuesta: any = {}; // se guarda la info de la encuesta 
  loading: boolean = false;
  listEncuestas: Encuesta[] = []

  constructor(private _encuestaService: EncuestaService, private _route: ActivatedRoute,) { }
   

  ngOnInit() {
    //ACUMULADORES 
    this.metricaSi = Number(localStorage.getItem('metricaSi')) || 0;
    this.metricaNo = Number(localStorage.getItem('metricaNo')) || 0;

    this.metrica1al5 = Number(localStorage.getItem('metrica1al5')) || 0;
    this.metrica2 = Number(localStorage.getItem('metrica2')) || 0;
    this.metrica3 = Number(localStorage.getItem('metrica3')) || 0;
    this.metrica4 = Number(localStorage.getItem('metrica4')) || 0;
    this.metrica5 = Number(localStorage.getItem('metrica5')) || 0;


    this.metrica1al10 = Number(localStorage.getItem('metrica1al10')) || 0;

    

    this.getEncuesta(); //SE HACE EL LLAMADO A LA OBTENCION DE LA ENCUESTA
    
  }

  //FUNCION PARA OBTENER UNA DETERMINADA ENCUESTA POR EL "ID" 
  //SE ESTABLECIO UNA RUTA EN "APP.ROUTING"
  getEncuesta(){
    this.loading = true;
    const id = this._route.snapshot.params['id']; //SE OBTIENE EL ID DE LA ENCUESTA A LA QUE SE QUIERE VER LAS METRICAS 
    this._encuestaService.getEncuesta(id).subscribe((data: any) => {
    this.currentEncuesta = data;
    console.log("VALOR :",this.currentEncuesta); //comprobacion si esta obteniendo la info 
    this.loading = false;
    })

    //PARA PREG 1 con su tipo de resp solo "si-no" y "1-5"
    if(this.valorDeSurvey1=== 'si-no'){
      if (this.valorResp1  === 'Si') {
        this.metricaSi++;
        localStorage.removeItem('respPreg1'); //elimina el valor de localStorage para que no se acumule infinitamente
        console.log("VALOR DE LA METRICA SI",this.metricaSi);
      } else if (this.valorResp1  === 'No') {
        this.metricaNo++;
        localStorage.removeItem('respPreg1');//elimina el valor de localStorage para que no se acumule infinitamente
      }

    }
    
    if(this.valorDeSurvey1=== '1-5'){
      if (this.valorResp1  === '1') {
        this.metrica1al5++;
        
      } else if(this.valorResp1  === '2'){
        this.metrica2++;
        
      }else if(this.valorResp1  === '3'){
        this.metrica3++;
         
      }else if(this.valorResp1  === '4'){
        this.metrica4++;
        
      }else if(this.valorResp1  === '5'){
        this.metrica5++;
        
      }

      //PARA PREG 2 con su tipo de resp solo "si-no" y "1-5"
    if(this.valorDeSurvey2=== 'si-no'){
      if (this.valorResp2  === 'Si') {
        this.metricaSi++;
        localStorage.removeItem('respPreg2'); //elimina el valor de localStorage para que no se acumule infinitamente
        console.log("VALOR DE LA METRICA SI",this.metricaSi);
      } else if (this.valorResp2  === 'No') {
        this.metricaNo++;
        localStorage.removeItem('respPreg2');//elimina el valor de localStorage para que no se acumule infinitamente
      }

    }
    
    if(this.valorDeSurvey2=== '1-5'){
      if (this.valorResp2  === '1') {
        this.metrica1al5++;
        localStorage.removeItem('respPreg2');
      } else if(this.valorResp2  === '2'){
        this.metrica2++;
        localStorage.removeItem('respPreg2');
      }else if(this.valorResp2 === '3'){
        this.metrica3++;
        localStorage.removeItem('respPreg2');
      }else if(this.valorResp2  === '4'){
        this.metrica4++;
        localStorage.removeItem('respPreg2');
      }else if(this.valorResp2  === '5'){
        this.metrica5++;
        localStorage.removeItem('respPreg2');
      }
      localStorage.removeItem('respPreg2');
    }

    }


    //SE ALMACENA EN UNA VARIABLE EL VALOR DEL CONTADOR DE LA METRICA Y SE LO CONVIERTE A STRING
    localStorage.setItem('metricaSi', this.metricaSi.toString());
    localStorage.setItem('metricaNo', this.metricaNo.toString());

    localStorage.setItem('metrica1al5', this.metrica1al5.toString());
    localStorage.setItem('metrica2', this.metricaNo.toString());
    localStorage.setItem('metrica3', this.metricaNo.toString());
    localStorage.setItem('metrica4', this.metricaNo.toString());
    localStorage.setItem('metrica5', this.metricaNo.toString());
    
    localStorage.setItem('metrica1al10', this.metrica1al10.toString());

    //ACTUALIZACION O REFRESH DEL GRAFICO DE METRICA
    this.actualizarGraficoSiNo();
    this.actualizarGrafico1_5();
    this.actualizarGrafico1_10();

   
}
 

  


//------------------------------------------------------


//!!ACA TIENE QUE IR LA VARIABLE QUE SE ESTA OBTENIENDO DEL SURVEY
//! DE ACUERDO AL TIPO DE RESP OBTENIDO POR EL OBJECT DE SURVEY AUMENTAR LOS VALORES DE LOS ACUMULADORES
  

  //INICIALIZACION DEL GRAFICO 
  ngAfterViewInit() {
    this.actualizarGraficoSiNo();
    this.actualizarGrafico1_5();
    this.actualizarGrafico1_10();
    
  }


  //GENERAR EL GRAFICO 

  //GRAFICO PARA TIPO DE RESP SI-NO
  actualizarGraficoSiNo() {
    if (this.metricasChart) {
      const metricasChart = new Chart(this.metricasChart.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Sí', 'No'], // Etiquetas para cada número
          datasets: [
            {
              label: 'Respuestas',
              data: [
                this.metricaSi,
                this.metricaNo,
              ],
              backgroundColor: [
                'rgba(0, 0, 255, 0.2)', // Azul para las barras
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      metricasChart.canvas.style.backgroundColor = 'white';
    }
  }


  //GRAFICO PARA TIPO DE RESP 1-5
  actualizarGrafico1_5() {
    if (this.metricasChart2) {
      const metricasChart2 = new Chart(this.metricasChart2.nativeElement, {
        type: 'bar',
        data: {
          labels: ['1', '2', '3', '4', '5'], // Etiquetas para cada número
          datasets: [
            {
              label: 'Respuestas',
              data: [  
                this.metrica1al5, // Estos son los datos de 1 al 5
                this.metrica2, 
                this.metrica3,
                this.metrica4,
                this.metrica5,
              ],
              backgroundColor: [
                'rgba(0, 0, 255, 0.2)', // Azul para las barras
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      metricasChart2.canvas.style.backgroundColor = 'white';
    }
  }

  
  //GRAFICO PARA TIPO DE RESP 1-10
  actualizarGrafico1_10() {
    if (this.metricasChart3) {
      const metricasChart3 = new Chart(this.metricasChart3.nativeElement, {
        type: 'bar',
        data: {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], // Etiquetas para cada número
          datasets: [
            {
              label: 'Respuestas',
              data: [
                this.metrica1al10, // Estos son los datos de 1 al 10
                0,
                0,
                0,
                0,
              ],
              backgroundColor: [
                'rgba(0, 0, 255, 0.2)', // Azul para las barras
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
                'rgba(0, 0, 255, 0.2',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      metricasChart3.canvas.style.backgroundColor = 'white';
    }
  }

}
