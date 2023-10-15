import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';



@Component({
  selector: 'app-list-encuesta',
  templateUrl: './list-encuesta.component.html',
  styleUrls: ['./list-encuesta.component.css']
})
export class ListEncuestaComponent implements OnInit {
  listEncuestas: Encuesta[] = []
  loading: boolean = false;


  constructor(private _encuestaService: EncuestaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListEncuestas();
  }

  //FUNCION QUE RECUPERA EL LISTADO DE ENCUESTAS 
  getListEncuestas() {
    this.loading = true;    
    this._encuestaService.getListEncuestas().subscribe((data: Encuesta[]) => {
    this.listEncuestas = data;
    this.loading = false;
    })
  }

  //FUNCIONALIDAD PARA EL BOTON DE ELIMINAR UNA ENCUESTA
  deleteEncuesta(id: number) {
    this.loading = true;
    this._encuestaService.deleteEncuesta(id).subscribe(() => {
      this.getListEncuestas();
      this.toastr.warning('La encuesta fue eliminada con exito', 'Encuesta eliminada');
    })
  }

}
