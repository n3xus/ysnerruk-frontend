import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {


    if (req.url === 'http://localhost:8080/users/signin') {
      return next.handle(req);
    }

    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + token)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
