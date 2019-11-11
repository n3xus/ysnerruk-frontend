import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {IOffer} from '../models';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  private static handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';

    if (err.error === null) {
      if (err.status === 401) {
        errorMessage = 'Please login again';
      } else {
        errorMessage = 'Unknown Error occurred';
      }
    } else if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = err.message;

      console.log('ErrorEvent');

      if (err.error.message != null) {
        errorMessage = `An error occurred: ${err.error.message}`;
      }

    } else {
      console.log('other error');
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.message}`;
    }

    return throwError(errorMessage);
  }

  getOffers(): Observable<IOffer[]> {
    return this.http.get<IOffer[]>(environment.apiUrl + 'offers')
      .pipe(catchError(DashboardService.handleError));
  }

  createOffer(description: string, offerAmount: number, offerCurrency: string, receiveAmount: number, receiveCurrency: string) {
    return this.http.post(environment.apiUrl + 'offers', {
      description,
      offerAmount,
      offerCurrency,
      receiveAmount,
      receiveCurrency,
    }).pipe(catchError(DashboardService.handleError));
  }


  editOffer(id: number, description: string, offerAmount: number, offerCurrency: string, receiveAmount: number, receiveCurrency: string) {
    return this.http.put(environment.apiUrl + 'offers/' + id, {
      description,
      offerAmount,
      receiveAmount,
      offerCurrency,
      receiveCurrency,
    }).pipe(catchError(DashboardService.handleError));
  }

  acceptOffer(id: number) {
    return this.http.patch(environment.apiUrl + 'offers/' + id, {}).pipe(catchError(DashboardService.handleError));
  }

  deleteOffer(id: number) {
    return this.http.delete(environment.apiUrl + 'offers/' + id, {})
      .pipe(catchError(DashboardService.handleError));
  }


  getOffer(id: number): Observable<IOffer> {
    return this.http.get<IOffer>(environment.apiUrl + 'offers/' + id);
  }
}
