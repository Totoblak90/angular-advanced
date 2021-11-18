import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditHospitalResponse, GetHospitalsResponse, Hospitale, DeleteHospitalResponse } from '../interfaces/hospitals';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  constructor( private http: HttpClient ) { }

  public getAllHospitals(): Observable<Hospitale[]> {
    return this.http
      .get<GetHospitalsResponse>(
        `${this.baseUrl}/hospitales`,
        this.headers
      )
      .pipe(
        map((resp:GetHospitalsResponse) => resp.hospitales)
      )
  }

  public createHospital(name: string): Observable<any> {
    const payload = {
      nombre: name
    }
    return this.http.post(`${this.baseUrl}/hospitales`, payload, this.headers)
  }

  public editHospital(newHospitalName: string, hospitalIdToEdit: string): Observable<EditHospitalResponse> {
    const payload = { nombre: newHospitalName }

    return this.http.put<EditHospitalResponse>(`${this.baseUrl}/hospitales/${hospitalIdToEdit}`, payload, this.headers)
  }

  public deleteHospital(hospitalToDeleteId: string): Observable<DeleteHospitalResponse> {
    return this.http.delete<DeleteHospitalResponse>(`${this.baseUrl}/hospitales/${hospitalToDeleteId}`, this.headers)
  }
}
