import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegisterFormDataRequest, RegisterFormDataResponse } from '../interfaces/register.interface';
import { LoginFormDataRequest, LoginFormDataResponse } from '../interfaces/login.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ValidateToken } from '../interfaces/validate-token.interface';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl: string = environment.apiBaseUrl

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Auth services
  public registerUser( formData: RegisterFormDataRequest): Observable<RegisterFormDataResponse> {
    return this.http.post<RegisterFormDataResponse>(`${this.baseUrl}/usuarios`, formData)
            .pipe(
              tap((res: RegisterFormDataResponse) => localStorage.setItem('token', res.token))
            )
  }

  public loginUser(
    formData: LoginFormDataRequest,
    rememberMe: boolean
    ): Observable<LoginFormDataResponse> {

    return this.http.post<LoginFormDataResponse>(`${this.baseUrl}/login`, formData)
      .pipe(
        tap((res: LoginFormDataResponse) => {
          localStorage.setItem('token', res.token)
          if (rememberMe) {
            localStorage.setItem('email', formData.email);
          } else {
            localStorage.removeItem('email')
          }
        })
      )
  }

  public loginFromGoogle( token: string ) {
    return this.http.post(`${this.baseUrl}/login/google`, { token })
      .pipe(
        tap(() => {
          localStorage.setItem('token', token)
        })
      )
  }

  public validateToken(): Observable<boolean> {

    return this.http.get<ValidateToken>(`${this.baseUrl}/login/renew`, {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    })
      .pipe(
        tap( (res) => localStorage.setItem('token', res.JWToken) ),
        map( res => true),
        catchError( error => of(false))
      )
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }
}
