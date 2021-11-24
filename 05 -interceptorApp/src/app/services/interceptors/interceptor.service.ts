import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Pase por el interceptor');

    const headers = new HttpHeaders({
      'token-user': '3kj21h3jk21h312oyh38123u12i3jh812n381327498c034',
    });

    const reqClone = req.clone({
      headers
    })

    console.log('Setee los headers')

    return next.handle(reqClone).pipe(catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(err);
  }
}
