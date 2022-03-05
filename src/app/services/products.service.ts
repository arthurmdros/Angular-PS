import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IProduct } from '../product-list/product';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productUrl = 'api/products/products.json';

  constructor(private http:HttpClient) {}

  getProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('ALL', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage = `Algo de errado: ${err.error.message}`
    } else{
      errorMessage = `Servidor retornou algo: ${err.status}, mensagem de erro foi: ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
