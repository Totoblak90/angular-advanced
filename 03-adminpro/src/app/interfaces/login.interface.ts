export interface LoginFormDataRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormDataResponse {
  ok: boolean;
  token: string;
}
