import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Search, SearchAll } from '../interfaces/search';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Hospitale } from '../interfaces/hospitals';
import { Doctor } from '../interfaces/doctors';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl: string = environment.apiBaseUrl;

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

  constructor(private http: HttpClient) {}

  public search(
    type: 'usuarios' | 'medicos' | 'hospitales',
    term: string = ''
  ): Observable<Search> {
    return this.http
      .get<Search>(
        `${this.baseUrl}/todo/coleccion/${type}/${term}`,
        this.headers
      )
      .pipe(
        map((res: Search) => {
          let resultados;
          switch (type) {
            case 'usuarios':
              resultados = this.transformUsuarios(res.resultados as User[]);
              return {
                ok: res.ok,
                resultados,
              };
            case 'medicos':
              return {
                ok: res.ok,
                resultados: res.resultados as Doctor[]
              }
            case 'hospitales':
              return {
                ok: res.ok,
                resultados: res.resultados as Hospitale[],
              };
            default:
              return;
          }
        })
      );
  }

  private transformUsuarios(value: User[]): User[] {
    const resultados = value.map(
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
    return resultados;
  }

  public searchAll(term: string ): Observable<SearchAll> {
    return this.http.get<SearchAll>(`${this.baseUrl}/todo/${term}`, this.headers)
  }
}
