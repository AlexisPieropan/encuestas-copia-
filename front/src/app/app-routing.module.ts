import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

import { ListEncuestaComponent } from './components/list-encuesta/list-encuesta.component';
import { AddEditEncuestaComponent } from './components/add-edit-encuesta/add-edit-encuesta.component';


const routes: Routes = [
  { path: '', component: ListEncuestaComponent },
  { path: 'add', component: AddEditEncuestaComponent },
  { path: 'edit/:id', component: AddEditEncuestaComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
