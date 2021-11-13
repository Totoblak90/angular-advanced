import { UserDataResponse } from "./register.interface";
import { User } from '../models/user.model';

export interface GetAllUsersResponse {
  ok: boolean;
  total: number;
  usuarios: User[];
}
