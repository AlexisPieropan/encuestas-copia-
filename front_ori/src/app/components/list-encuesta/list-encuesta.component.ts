import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';
import Swal from 'sweetalert2'


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
    Swal.fire({
      text: `Esto eliminará la encuesta. Desea continuar?`,
      icon: 'question',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#3a4a58",
      confirmButtonText: 'Confirmar',
      confirmButtonColor: "#3a4a58",
      showCancelButton: true,
      background: '#26262a',
      color: 'white'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this._encuestaService.deleteEncuesta(id).subscribe(() => {
          this.getListEncuestas();
          this.toastr.warning('Encuesta eliminada con exito');
        })
      } else{
        Swal.DismissReason.cancel
      };
    });
  }
}