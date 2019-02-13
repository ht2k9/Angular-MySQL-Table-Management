import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class DatabaseService {
    // TODO: add path
    path = 'localhost:4200';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    };

    // data to show dashboard
    stats = {
        todayEarning: 0,
        productsSold: 0,
        ordersRemeaning: 0,
        productsNeeded: 0
    };
    todos = []; 

    constructor(private http: HttpClient){}
    
    postData(values, tableName: String) : Observable<any>{
        return this.http.post<any>(`${this.path}/${tableName}`, JSON.stringify(values), this.httpOptions).pipe(
            catchError(this.handleError)
          );
    }

    getData(tableName: String): Observable<any> {
        return this.http.get(`${this.path}/${tableName}`).pipe(
            catchError(this.handleError)
        );
    }

    getOrders(tableName: String, id: number): Observable<any> {
        return this.http.get(`${this.path}/${tableName}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    deleteData(tableName: String, id: number){
        return this.http.delete(`${this.path}/${tableName}/${id}`, this.httpOptions).pipe(               
                catchError(this.handleError)
            );
    }

    updateData(tableName: String, id: number, values: any){
        return this.http.put(`${this.path}/${tableName}/${id}`, JSON.stringify(values), this.httpOptions).pipe(               
                catchError(this.handleError)
            );
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
    };
}