// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

// import { Pregunta } from '../interfaces/pregunta'; //se importa el servicio pregunta

// @Injectable({
//   providedIn: 'root'
// })

// export class PreguntaService {
//   private myAppUrl: string;
//   private myApiUrl: string;

//   constructor(private http: HttpClient) { 
//     this.myAppUrl = environment.endpoint;
//     this.myApiUrl = 'api/pregunta/'   //----- viene del back es la URL de la API para acceder y recuperar la info
//   }

//   //OBTENER LISTA DE PREGUNTA
//   getListPregunta(): Observable<Pregunta[]> {
//    return this.http.get<Pregunta[]>(`${this.myAppUrl}${this.myApiUrl}`);
//   }

//   //ELIMINAR PREGUNTA
//   deletePregunta(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
//   }

//   //GUARDAR PREGUNTA
//   savePregunta(pregunta: Pregunta): Observable<void> {
//     return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,pregunta)
//   }

//   //OBTENER PREGUNTA
//   getPregunta(id: number): Observable<Pregunta> {
//     return this.http.get<Pregunta>(`${this.myAppUrl}${this.myApiUrl}${id}`)
//   }

//   //ACTUALIZAR PREGUNTA
//   updatePregunta(id: number, encuesta: Pregunta): Observable<void> {
//     return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, encuesta);
//   }
// }
