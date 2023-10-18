import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('metricasChart', { static: false }) metricasChart: ElementRef | undefined;
  metricaSi = 0;
  metricaNo = 0;
  metrica1al5 = 0;
  metrica1al10 = 0;

  ngOnInit() {
    this.metricaSi = Number(localStorage.getItem('metricaSi')) || 0;
    this.metricaNo = Number(localStorage.getItem('metricaNo')) || 0;
    this.metrica1al5 = Number(localStorage.getItem('metrica1al5')) || 0;
    this.metrica1al10 = Number(localStorage.getItem('metrica1al10')) || 0;
  }

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

    localStorage.setItem('metricaSi', this.metricaSi.toString());
    localStorage.setItem('metricaNo', this.metricaNo.toString());
    localStorage.setItem('metrica1al5', this.metrica1al5.toString());
    localStorage.setItem('metrica1al10', this.metrica1al10.toString());

    this.actualizarGrafico();
  }

  ngAfterViewInit() {
    this.actualizarGrafico();
  }

  actualizarGrafico() {
    if (this.metricasChart) {
      const metricasChart = new Chart(this.metricasChart.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Sí', 'No', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], // Etiquetas para cada número
          datasets: [
            {
              label: 'Respuestas',
              data: [
                this.metricaSi,
                this.metricaNo,
                this.metrica1al5, // Estos son los datos de 1 al 5
                0, // Puedes ajustar estos valores según tus datos
                0,
                0,
                0,
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
      metricasChart.canvas.style.backgroundColor = 'white';
    }
  }
}
