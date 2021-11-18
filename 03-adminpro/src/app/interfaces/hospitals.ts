export interface GetHospitalsResponse {
    ok:         boolean;
    hospitales: Hospitale[];
}

export interface Hospitale {
    _id:     string;
    usuario: Usuario;
    nombre:  string;
    img?:    string;
}

export interface Usuario {
    _id:    string;
    nombre: string;
    img?:    string;
}

export interface EditHospitalResponse {
    ok: boolean;
    hospital: EditHospitalResponseData;
}

export interface EditHospitalResponseData {
    _id: string;
    usuario: Usuario;
    nombre: string;
}

export interface DeleteHospitalResponse {
    ok: boolean;
    msg: string;
}