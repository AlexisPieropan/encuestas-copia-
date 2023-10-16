import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

import { Encuesta } from 'src/app/interfaces/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-add-edit-encuesta',
  templateUrl: './add-edit-encuesta.component.html',
  styleUrls: ['./add-edit-encuesta.component.css']
})
export class AddEditEncuestaComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';


  constructor(private fb: FormBuilder,
    private _encuestaService: EncuestaService,
    private router: Router,
    // private toastr: ToastrService,
    private aRouter: ActivatedRoute) {

      
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantPreg: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));

     }

     //CONEXION CON EL BACK
  ngOnInit(): void {


    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getEncuesta(this.id);
    }
  }

  getEncuesta(id: number) {
    this.loading = true;
    this._encuestaService.getEncuesta(id).subscribe((data: Encuesta) => {
      this.loading = false;
      this.form.setValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        cantPreg: data.cantPreg
      })
    })
  }

  addEncuesta() {
    /*  console.log(this.form.value.name);
     console.log(this.form.get('name')?.value); */

    const encuesta: Encuesta = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      cantPreg: this.form.value.cantPreg
    }
    this.loading = true;

    if (this.id !== 0) {
      // Es editar 
      encuesta.id = this.id;
      this._encuestaService.updateEncuesta(this.id, encuesta).subscribe(() => {
        Swal.fire({
          text: `La encuesta ${encuesta.nombre} fue actualizada con exito`,
          icon: 'success',
          background: '#1a891afa',
          color: 'white',
          toast: true,
          position: 'bottom-end',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.loading = false;
        this.router.navigate(['/main']);
      })
    } else {
      // Es agregagar
      this._encuestaService.saveEncuesta(encuesta).subscribe(() => {
        Swal.fire({
          text: `La encuesta ${encuesta.nombre} fue registrada con exito`,
          icon: 'success',
          background: '#1a891afa',
          color: 'white',
          toast: true,
          position: 'bottom-end',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        this.loading = false;
        this.router.navigate(['/main']);
      })
    }
  }
}



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import Swal from 'sweetalert2'

// import { Encuesta } from 'src/app/interfaces/encuesta';
// import { EncuestaService } from 'src/app/services/encuesta.service';

// @Component({
//   selector: 'app-add-edit-encuesta',
//   templateUrl: './add-edit-encuesta.component.html',
//   styleUrls: ['./add-edit-encuesta.component.css']
// })
// export class AddEditEncuestaComponent implements OnInit {

//   form: FormGroup;
//   loading: boolean = false;
//   id: number;
//   operacion: string = 'Agregar ';


//   constructor(private fb: FormBuilder,
//     private _encuestaService: EncuestaService,
//     private router: Router,
//     // private toastr: ToastrService,
//     private aRouter: ActivatedRoute) {

      
//     this.form = this.fb.group({
//       nombre: ['', Validators.required],
//       descripcion: ['', Validators.required],
//       cantPreg: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
//     });
//     this.id = Number(aRouter.snapshot.paramMap.get('id'));

//      }

//      //CONEXION CON EL BACK
//   ngOnInit(): void {


//     if (this.id != 0) {
//       // Es editar
//       this.operacion = 'Editar ';
//       this.getEncuesta(this.id);
//     }
//   }

//   getEncuesta(id: number) {
//     this.loading = true;
//     this._encuestaService.getEncuesta(id).subscribe((data: Encuesta) => {
//       this.loading = false;
//       this.form.setValue({
//         nombre: data.nombre,
//         descripcion: data.descripcion,
//         cantPreg: data.cantPreg
//       })
//     })
//   }

//   addEncuesta() {
//     /*  console.log(this.form.value.name);
//      console.log(this.form.get('name')?.value); */

//     const encuesta: Encuesta = {
//       nombre: this.form.value.nombre,
//       descripcion: this.form.value.descripcion,
//       cantPreg: this.form.value.cantPreg
//     }
//     this.loading = true;

//     if (this.id !== 0) {
//       // Es editar 
//       encuesta.id = this.id;
//       this._encuestaService.updateEncuesta(this.id, encuesta).subscribe(() => {
//         Swal.fire({
//           text: `La encuesta ${encuesta.nombre} fue actualizada con exito`,
//           icon: 'success',
//           background: '#1a891afa',
//           color: 'white',
//           toast: true,
//           position: 'bottom-end',
//           timer: 2000,
//           timerProgressBar: true,
//           showConfirmButton: false,
//         })
//         this.loading = false;
//         this.router.navigate(['/main']);
//       })
//     } else {
//       // Es agregagar
//       this._encuestaService.saveEncuesta(encuesta).subscribe(() => {
//         Swal.fire({
//           text: `La encuesta ${encuesta.nombre} fue registrada con exito`,
//           icon: 'success',
//           background: '#1a891afa',
//           color: 'white',
//           toast: true,
//           position: 'bottom-end',
//           timer: 2000,
//           timerProgressBar: true,
//           showConfirmButton: false,
//         })
//         this.loading = false;
//         this.router.navigate(['/main']);
//       })
//     }
//   }
// }


