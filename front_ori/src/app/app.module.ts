import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { SurveyComponent } from './components/survey/survey.component';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material';
import { FooterComponent } from './components/footer/footer.component';
import { AddEditEncuestaComponent } from './components/add-edit-encuesta/add-edit-encuesta.component';
import { ListEncuestaComponent } from './components/list-encuesta/list-encuesta.component';
// import {MatInputModule} from '@angular/material/input';
// import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListProductsComponent,
    AddEditProductComponent,
    ProgressBarComponent,
    SurveyComponent,
    LoginComponent,
    FooterComponent,
    AddEditEncuestaComponent,
    ListEncuestaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right'
    }), // ToastrModule added
    MatFormFieldModule,
    FormsModule,
    // MatInputModule,
    // MatButtonModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
