import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { IProduct } from '../products/entity';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productUrl = 'api/products';

  constructor(private http:HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl)
      .pipe(
        tap(data => console.log('getProducts: '+ JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProduct(id : number): Observable<IProduct>{
    if (id === 0){
      return of(this.initializeProduct());
    }
    const url = `${this.productUrl}/${id}`;
    return this.http.get<IProduct>(url)
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  createProduct(product: IProduct, date: string): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'aplication/json'});
    product.id = null;
    product.releaseDate = date;
    product.isActive = true;
    
    return this.http.post<IProduct>(this.productUrl, product, {headers: headers})
      .pipe(
        tap(data => console.log('CreateProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/${id}`;
    return this.http.delete<IProduct>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  changeStatus(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/${product.id}`;
    product.isActive = false;
    return this.http.put<IProduct>(url, product, { headers })
      .pipe(
        tap(() => console.log('changeStatus: ' + product.isActive)),
        map(() => product),
        catchError(this.handleError)
      );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/${product.id}`;
    return this.http.put<IProduct>(url, product, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        map(() => product),
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

  private initializeProduct(): IProduct{
    return {
      id: 0,
      productName: null,
      productCode: null,
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null,
      tags: [''],
      isActive: true
    }
  }
}
