import { Injectable } from '@angular/core';
import {Taquerias} from './taquerias'
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { catchError,map,tap,Observable, observable, of } from 'rxjs';
import { MessageService} from'./message.service';

@Injectable({providedIn: 'root'})
export class TaqueriasService {
  private tacolizadorURL="http://localhost:3007/api/v1/taquerias";

  constructor(
    private messageService: MessageService,
    private http:HttpClient,
  ) { }
//OBTENER TAQUERIAS
getTaquerias(): Observable<Taquerias[]> {
  this.messageService.add('TaqueriasService: fetched Taquerias');
  return this.http.get<Taquerias[]>(this.tacolizadorURL)
  .pipe(tap(_=>this.log('fetched Taquerias')),
    catchError(this.handleError<Taquerias[]>('getTaquerias', []))
  );
}

//OBTENER TAQUERIAS POR ID
getTaqueria(id: number):Observable<Taquerias>{
   const url = `${this.tacolizadorURL}/${id}`;
   return this.http.get<Taquerias>(url).pipe(
     tap(_ => this.log(`fetched Taquerias id=${id}`)),
     catchError(this.handleError<Taquerias>(`getTaqueria id=${id}`))
   );
}

//AGREGAR TAQUERIAS
addTaqueria(taqueria: Taquerias): Observable<Taquerias> {
  return this.http.post<Taquerias>(this.tacolizadorURL, taqueria, this.httpOptions).pipe(
    tap((newTaqueria: Taquerias) => this.log(`added taqueria w/ id=${newTaqueria.id_taquerias}`)),
    catchError(this.handleError<Taquerias>('addTaqueria'))
  );
}

//EDITAR TAQUERIAS
updateTaqueria(taqueria: Taquerias): Observable<any> {
  return this.http.put(this.tacolizadorURL, taqueria, this.httpOptions).pipe(
    tap(_ => this.log(`updated taqueria id=${taqueria.id_taquerias}`)),
    catchError(this.handleError<any>('updateTaqueri'))
  );
}

//ELIMINAR TAQUERIAS
deleteTaqueria(taqueria: Taquerias | number): Observable<Taquerias> {
  const id = typeof taqueria === 'number' ? taqueria : taqueria.id_taquerias;
  const url = `${this.tacolizadorURL}/${id}`;

  return this.http.delete<Taquerias>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted taquerias id=${id}`)),
    catchError(this.handleError<Taquerias>('deleteTaqueria'))
  );
  
}

private log(message: string) {
  this.messageService.add(`TaqueriasService: ${message}`);
}
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error); // log to console instead
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
}


