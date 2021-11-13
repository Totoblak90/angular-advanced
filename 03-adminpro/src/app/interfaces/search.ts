import { User } from "../models/user.model";

export interface Search {
  ok: boolean,
  resultados: User[]
}
