import { User } from '../models/user.model';
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

export interface UpdateUserResponseFromAdminPanel {
  ok: boolean;
  usuario: User
}
