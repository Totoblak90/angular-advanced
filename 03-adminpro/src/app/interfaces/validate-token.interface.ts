import { UserDataResponse } from "./register.interface";
import { SideBarMenu } from './login.interface';

export interface ValidateToken {
  ok: boolean;
  JWToken: string;
  usuario: UserDataResponse;
  menu: SideBarMenu[]
}
