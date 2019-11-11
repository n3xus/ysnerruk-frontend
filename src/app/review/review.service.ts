import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {IReview} from '../models';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  createReview(id: number, description: string, rating: boolean) {
    return this.http.post(environment.apiUrl + 'review/', {
      offer: {
        id,
      },
      rating,
      description,
    });
  }

  getReviews(offerId: number): Observable<IReview[]> {
    return this.http.get<IReview[]>(environment.apiUrl + 'review/', {params: {offerId: `${offerId}`}});
  }
}
