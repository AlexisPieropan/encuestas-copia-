import { Component, OnInit } from '@angular/core';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  listEncuestas: Encuesta[] = []
  loading: boolean = false;

  constructor(private _encuestaService: EncuestaService) { }

  ngOnInit(): void {
    this.getListEncuestas();
  }


  getListEncuestas() {
    this.loading = true;    
    this._encuestaService.getListEncuestas().subscribe((data: Encuesta[]) => {
    this.listEncuestas = data;
    console.log(this.listEncuestas[0]);
    
    this.loading = false;
    })
  }

}
