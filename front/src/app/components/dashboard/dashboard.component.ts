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
  @ViewChild('metricasChart', { static: false }) metricasChart: ElementRef | undefined;
  @ViewChild('metricasChart2', { static: false }) metricasChart2: ElementRef | undefined;
  @ViewChild('metricasChart3', { static: false }) metricasChart3: ElementRef | undefined;
  metricaSi = 0;
  metricaNo = 0;
  metrica1al5 = 0;
  metrica1al10 = 0;

//VARIABLES DE RECUPERACION DE TIPO DE RESP "SI-NO", "1-5" ETC
  valorDeSurvey1 = localStorage.getItem('tipoRespuestas1');
  valorDeSurvey2 = localStorage.getItem('tipoRespuestas2');
  valorDeSurvey3 = localStorage.getItem('tipoRespuestas3');
  valorDeSurvey4 = localStorage.getItem('tipoRespuestas4');
  valorDeSurvey5 = localStorage.getItem('tipoRespuestas5');


  currentEncuesta: any = {}; // se guarda la info de la encuesta 
  loading: boolean = false;
  listEncuestas: Encuesta[] = []

  constructor(private _encuestaService: EncuestaService, private _route: ActivatedRoute,) { }
   

  ngOnInit() {
    //ACUMULADORES 
    this.metricaSi = Number(localStorage.getItem('metricaSi')) || 0;
    this.metricaNo = Number(localStorage.getItem('metricaNo')) || 0;
    this.metrica1al5 = Number(localStorage.getItem('metrica1al5')) || 0;
    this.metrica1al10 = Number(localStorage.getItem('metrica1al10')) || 0;

    console.log("VALOR DE SI: ",this.metricaSi);

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
}
 

  


//------------------------------------------------------


//!!ACA TIENE QUE IR LA VARIABLE QUE SE ESTA OBTENIENDO DEL SURVEY
//! DE ACUERDO AL TIPO DE RESP OBTENIDO POR EL OBJECT DE SURVEY AUMENTAR LOS VALORES DE LOS ACUMULADORES
  registrarRespuesta(tipoRespuesta: string) {
    if (tipoRespuesta === 'Si') {
      this.metricaSi++;
    } else if (tipoRespuesta === 'No') {
      this.metricaNo++;
    } else if (tipoRespuesta === '1-5') {
      this.metrica1al5++;
    } else if (tipoRespuesta === '1-10') {
      this.metrica1al10++;
    }

    //SE ALMACENA EN UNA VARIABLE EL VALOR DEL CONTADOR DE LA METRICA Y SE LO CONVIERTE A STRING
    localStorage.setItem('metricaSi', this.metricaSi.toString());
    localStorage.setItem('metricaNo', this.metricaNo.toString());
    localStorage.setItem('metrica1al5', this.metrica1al5.toString());
    localStorage.setItem('metrica1al10', this.metrica1al10.toString());

    //ACTUALIZACION O REFRESH DEL GRAFICO DE METRICA
    this.actualizarGraficoSiNo();
    this.actualizarGrafico1_5();
    this.actualizarGrafico1_10();
  }

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
                0, // Puedes ajustar estos valores según tus datos
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
