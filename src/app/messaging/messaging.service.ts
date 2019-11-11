import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IMessage } from "../models/message";
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private messageUrl = '';

  constructor(private http: HttpClient) { }

  getMessages(): Observable<IMessage[]> {
    return this.http.get<IMessage[]>(environment.apiUrl + 'messages')
    .pipe(catchError(MessagingService.handleError));
  }

  sendMessage(id, message){
    return this.http.post(environment.apiUrl + 'messages', {
      message,
      "receiver": {id},
    }).pipe(catchError(MessagingService.handleError));
  }


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
}
