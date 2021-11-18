import { User } from "../models/user.model";
import { Hospitale } from "./hospitals";
import { Doctor } from './doctors';

export interface Search {
  ok: boolean,
  resultados: User[] | Hospitale[] | Doctor[]
}
