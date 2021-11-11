export interface UpdateUserRequest {
  nombre: string;
  email: string;
  role?: string;
}

export interface UpdateUserResponse {
  email: string;
  google: boolean
  nombre: string;
  role: string;
  uid: string;
  img?: string;
}
