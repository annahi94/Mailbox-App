import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Factura } from '../factura';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
    , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    , 'Content-Type': 'application/json'
  })
}

@Injectable()
export class FacturaService {

  constructor(private http: HttpClient) {

  }

  private facturasURL = 'http://localhost:50111/api/Invoice';

  private handleError(error: any) {
    console.log(error.error);
    return Observable.of(error.error);
  }

  /*
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error, `Operation: ${operation}`);
      return of(result as T);
    }
  }*/

  getFacturas(): Observable<any> {
    return this.http.get<Array<Factura>>(this.facturasURL)
      .pipe(
        tap(facturas => console.log('Fetched facturas!')),
        //catchError(this.handleError('getFacturas', []))
        catchError(error => { return this.handleError(error) })
      );
  }

  getFactura(id: number): Observable<any> {
    const url = `${this.facturasURL}/${id}`;
    return this.http.get<Factura>(url).pipe(
      tap(_ => console.log(`Fetched factura of id ${id}!`)),
      //catchError(this.handleError<Factura>(`getFactura id = ${id}`))
      catchError(error => { return this.handleError(error) })
    );
  }

  updateFactura(factura: Factura): Observable<any> {
    return this.http.put(this.facturasURL + `/${factura.id}`, factura, httpOptions).pipe(
      tap(_ => console.log(`Updated factura of id ${factura.id}!`)),
      //catchError(this.handleError<any>('updateFactura'))
      catchError(error => { return this.handleError(error) })
    );
  }

}
