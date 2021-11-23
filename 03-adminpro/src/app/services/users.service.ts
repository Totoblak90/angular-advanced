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
import {
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserResponseFromAdminPanel,
} from '../interfaces/update-user.interface';
import { GetAllUsersResponse } from '../interfaces/all-users.interface';
import { DeleteUserResponse } from '../interfaces/delete-user';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string = environment.apiBaseUrl;
  public usuario: User;

  private get token(): string {
    return localStorage.getItem('token');
  }

  private get headers(): unknown {
    return {
      headers: {
        'x-token': this.token || '',
      },
    };
  }

  public get role(): 'USER_ROLE' | 'ADMIN_ROLE' {
    return this.usuario.role;
  }

  constructor(private http: HttpClient, private router: Router) {}

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
          localStorage.setItem('menu', JSON.stringify(res.menu))
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
      this.headers
    );
  }

  public validateToken(): Observable<boolean> {
    return this.http
      .get<ValidateToken>(`${this.baseUrl}/login/renew`, this.headers)
      .pipe(
        map((res) => {
          this.setNewUser(res?.usuario);
          localStorage.setItem('token', res.JWToken);
          localStorage.setItem('menu', JSON.stringify(res.menu))
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
    localStorage.removeItem('menu')
    this.router.navigateByUrl('/auth/login');
  }

  public getAllUsers(from: number = 0): Observable<GetAllUsersResponse> {
    return this.http
      .get<GetAllUsersResponse>(
        `${this.baseUrl}/usuarios?desde=${from}`,
        this.headers
      )
      .pipe(
        map((res: GetAllUsersResponse) => {
          const users = res.usuarios.map(
            (user) =>
              new User(
                user.nombre,
                user.email,
                '',
                user.img,
                user.google,
                user.role,
                user.uid
              )
          );

          return {
            ok: true,
            total: res.total,
            usuarios: users,
          };
        })
      );
  }

  public deleteUser(uid: string): Observable<DeleteUserResponse> {
    return this.http.delete<DeleteUserResponse>(
      `${this.baseUrl}/usuarios/${uid}`,
      this.headers
    );
  }

  public updateUserFromAdminPanel(
    formData: User
  ): Observable<UpdateUserResponseFromAdminPanel> {

    return this.http.put<UpdateUserResponseFromAdminPanel>(
      `${this.baseUrl}/usuarios/${formData.uid}`,
      formData,
      this.headers
    );
  }
}
