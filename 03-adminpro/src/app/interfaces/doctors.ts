export interface GetDoctorsResponse {
  ok: boolean;
  medicos: Doctor[];
}

export interface Doctor {
  _id: string;
  nombre: string;
  usuario: User;
  hospital?: MedicHospital;
  img: string;
}

export interface User {
  _id: string;
  nombre: string;
  img: string;
}
export interface MedicHospital {
  _id: string;
  nombre: string;
  img: string;
}

export interface CreateDoctorResponse {
  ok: boolean;
  medico: CreateDoctorResponseMedicoData;
}

export interface CreateDoctorResponseMedicoData {
  _id: string;
  usuario: string;
  nombre: string;
  hospital: string;
}

export interface EditDoctorResponse {
  ok: boolean;
  medico: EditDoctorResponseMedicoData;
}

export interface EditDoctorResponseMedicoData {
  _id: string;
  nombre: string;
  hospital: EditDoctorResponseMedicoDataHospital;
  usuario: EditDoctorResponseMedicoDataUser;
}

export interface EditDoctorResponseMedicoDataUser {
  _id: string;
  nombre: string;
}

export interface EditDoctorResponseMedicoDataHospital {
  _id: string;
  nombre: string;
}
