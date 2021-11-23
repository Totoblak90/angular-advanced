import { User } from "../models/user.model";
import { Hospitale } from "./hospitals";
import { Doctor } from './doctors';

export interface Search {
  ok: boolean,
  resultados: User[] | Hospitale[] | Doctor[]
}

export interface SearchAll {
  ok:         boolean;
  usuarios?:   UserSearchRes[];
  medicos?:    DoctorHospitalSearchRes[];
  hospitales?: DoctorHospitalSearchRes[];
}

export interface DoctorHospitalSearchRes {
  _id:       string;
  usuario:   string;
  nombre:    string;
  hospital?: string;
  img?:      string;
  numberId?: number;
  type?:     string;
  redirect?: string;
}

export interface UserSearchRes {
  role:       string;
  google:     boolean;
  email:      string;
  nombre:     string;
  uid:        string;
  img?:       string;
  type?:      string;
  numberId?:  number;
  redirect?: string;
}
