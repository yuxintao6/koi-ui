// 登录接口需要携带的参数ts类型
export interface ILoginParams {
  loginName: string | number;
  password: string | number;
  securityCode?: string | number;
}

export interface ILoginPageParams {
  loginForm: ILoginParams;
}
