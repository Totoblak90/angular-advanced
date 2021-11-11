import { UserDataResponse } from "./register.interface";

export interface ValidateToken {
  ok: boolean;
  JWToken: string;
  usuario: UserDataResponse;
}
