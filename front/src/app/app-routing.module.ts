import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { SurveyComponent } from './components/survey/survey.component';
import { LoginComponent } from './components/login/login.component';
import { ListEncuestaComponent } from './components/list-encuesta/list-encuesta.component';
import { AddEditEncuestaComponent } from './components/add-edit-encuesta/add-edit-encuesta.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'main', component: ListEncuestaComponent, data: { showHeader: true, showFooter: true }  },
  { path: 'add', component: AddEditEncuestaComponent, data: { showHeader: true, showFooter: true }   },
  { path: 'edit/:id', component: AddEditEncuestaComponent, data: { showHeader: true, showFooter: true }   },
  { path: 'survey/:id', component: SurveyComponent, data: { showHeader: true, showFooter: true }   },
  { path: 'dashboard/:id', component: DashboardComponent, data: { showHeader: true, showFooter: true }   },
  { path: '', component: LoginComponent, data: { showHeader: false, showFooter: false } },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
