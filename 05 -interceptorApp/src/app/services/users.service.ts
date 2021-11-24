import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', '2');
    params = params.append('nombre', 'Tobias Blaksley');

    return this.http
      .get<any>('https://reqres.in/api/user', {
        params,
      })
      .pipe(
        map((res) => res.data),
      );
  }

  public getUsersWithError(): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', '2');
    params = params.append('nombre', 'Tobias Blaksley');

    return this.http
      .get<any>('https://reqres.in/api123123/user', {
        params,
      })
      .pipe(
        map((res) => res.data),
      );
  }


}
