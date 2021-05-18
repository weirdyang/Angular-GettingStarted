import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IProduct } from "./product";

import { catchError, tap } from 'rxjs/operators'
@Injectable({
    providedIn: 'root',
})
export class ProductService {

    // getting from local disk
    // need to set in angular.json > assets
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl)
            .pipe(
                tap((data) => console.log('All: ', JSON.stringify(data))),
                catchError(this.handleError));
    }
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // a client-side or network error occured
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            // backend returned unsuccessful response code
            errorMessage = `Server returned code: ${err.status}, error message: ${err.message};`
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}