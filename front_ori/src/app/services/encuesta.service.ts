import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Encuesta } from '../interfaces/encuesta'; //se importa el servicio encuesta 

@Injectable({
  providedIn: 'root'
})

export class EncuestaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/encuestas/'   //----- viene del back es la URL de la API para acceder y recuperar la info
  }

  //OBTENER LISTA DE ENCUESTA
  getListEncuestas(): Observable<Encuesta[]> {
   return this.http.get<Encuesta[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  //ELIMINAR ENCUESTA
  deleteEncuesta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  //GUARDAR ENCUESTA
  saveEncuesta(encuesta: Encuesta): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,encuesta)
  }

  //OBTENER ENCUESTA
  getEncuesta(id: number): Observable<Encuesta> {
    return this.http.get<Encuesta>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  //ACTUALIZAR ENCUESTA
  updateEncuesta(id: number, encuesta: Encuesta): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, encuesta);
  }
}
