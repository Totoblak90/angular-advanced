export interface LoginFormDataRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormDataResponse {
  ok: boolean;
  token: string;
  menu: SideBarMenu[]
}

export interface SideBarMenu {
  title: string;
  icon: string;
  quantity: number | null,
  subMenu: Submenu[]
}

export interface Submenu {
  title: string;
  url:string;
}
