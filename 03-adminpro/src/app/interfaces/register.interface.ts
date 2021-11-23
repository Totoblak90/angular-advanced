export interface RegisterFormDataRequest {
  email: string;
  nombre: string;
  password: string;
  password2: string;
  terms: boolean;
}

export interface RegisterFormDataResponse {
  ok: boolean;
  usuario: UserDataResponse;
  token: string;
}

export interface UserDataResponse {
  role?: 'ADMIN_ROLE' | 'USER_ROLE';
  google?: boolean;
  email?: string;
  img?: string;
  nombre?: string;
  uid?: string;
}
