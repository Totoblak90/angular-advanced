import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CreateDoctorResponse,
  Doctor,
  EditDoctorResponse,
  GetDoctorsResponse,
} from '../interfaces/doctors';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
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

  public getDoctors(): Observable<Doctor[]> {
    return this.http
      .get<GetDoctorsResponse>(`${this.baseUrl}/medicos`)
      .pipe(map((res) => res.medicos));
  }

  public createDoctor(
    name: string,
    hospitalId: string
  ): Observable<CreateDoctorResponse> {
    const payload = {
      nombre: name,
      hospital: hospitalId,
    };
    return this.http.post<CreateDoctorResponse>(
      `${this.baseUrl}/medicos`,
      payload,
      this.headers
    );
  }

  public deleteDoctor(doctorId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/medicos/${doctorId}`,
      this.headers
    );
  }

  public editDoctor(
    name: string,
    hospitalId: string,
    doctorId: string
  ): Observable<EditDoctorResponse> {
    const payload = {
      nombre: name,
      hospital: hospitalId,
    };
    return this.http.put<EditDoctorResponse>(
      `${this.baseUrl}/medicos/${doctorId}`,
      payload,
      this.headers
    );
  }
}
