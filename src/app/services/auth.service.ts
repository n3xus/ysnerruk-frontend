import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import * as moment from 'moment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient
  ) { }

  private static setSession(token) {

    const decoded = jwt_decode(token);

    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', decoded.exp);
    localStorage.setItem('username', decoded.sub);
  }

  login(username: string, password: string): Observable<string> {

    let params = new HttpParams();
    params = params.append('username', username);
    params = params.append('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(environment.apiUrl + 'users/signin', null, {
      withCredentials: true,
      responseType: 'text',
      headers,
      params
    }).pipe(tap(res => AuthService.setSession(res)))
      .pipe(shareReplay());
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  public getCurrentUser() {
    return localStorage.getItem('username');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiresAt = localStorage.getItem('expires_at');
    return moment.unix(Number(expiresAt));
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  register(username: string, email: string, password: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(environment.apiUrl + 'users/signup',
    {
      username,
      email,
      password,
    },
    {
      headers,
      responseType: 'text'
    }

  ).pipe(tap(res => AuthService.setSession(res)));
  }
}
