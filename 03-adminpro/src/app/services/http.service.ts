import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  RegisterFormDataRequest,
  RegisterFormDataResponse,
  UserDataResponse,
} from '../interfaces/register.interface';
import {
  LoginFormDataRequest,
  LoginFormDataResponse,
} from '../interfaces/login.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ValidateToken } from '../interfaces/validate-token.interface';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UpdateUserRequest, UpdateUserResponse } from '../interfaces/update-user.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string = environment.apiBaseUrl;
  public usuario: User;

  private get token(): string {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient, private router: Router) {}

  // Auth services
  public registerUser(
    formData: RegisterFormDataRequest
  ): Observable<RegisterFormDataResponse> {
    return this.http
      .post<RegisterFormDataResponse>(`${this.baseUrl}/usuarios`, formData)
      .pipe(
        tap((res: RegisterFormDataResponse) =>
          localStorage.setItem('token', res.token)
        )
      );
  }

  public loginUser(
    formData: LoginFormDataRequest,
    rememberMe: boolean
  ): Observable<LoginFormDataResponse> {
    return this.http
      .post<LoginFormDataResponse>(`${this.baseUrl}/login`, formData)
      .pipe(
        tap((res: LoginFormDataResponse) => {
          localStorage.setItem('token', res.token);
          if (rememberMe) {
            localStorage.setItem('email', formData.email);
          } else {
            localStorage.removeItem('email');
          }
        })
      );
  }

  public updateUser(
    formData: UpdateUserRequest
  ): Observable<UpdateUserResponse> {

    formData = {
      ...formData,
      role: this.usuario.role
    }

    return this.http.put<UpdateUserResponse>(
      `${this.baseUrl}/usuarios/${this.usuario.uid}`,
      formData,
      {
        headers: {
          'x-token': this.token || '',
        },
      }
    );
  }

  public validateToken(): Observable<boolean> {
    return this.http
      .get<ValidateToken>(`${this.baseUrl}/login/renew`, {
        headers: {
          'x-token': this.token || '',
        },
      })
      .pipe(
        map((res) => {
          this.setNewUser(res?.usuario);
          localStorage.setItem('token', res.JWToken);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  private setNewUser(res: UserDataResponse): void {
    this.usuario = new User(
      res.nombre,
      res.email,
      null,
      res.img,
      res.google,
      res.role,
      res.uid
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }
}
