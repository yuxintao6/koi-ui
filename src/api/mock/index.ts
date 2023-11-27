// 导入二次封装axios
import koi from "@/utils/axios.ts";

// 统一管理接口
enum API {
  KOI_LOGIN = "/mock/user/login",
  LIST_ROUTERS = "/mock/auth/listRouters",
  GET_LOGIN_USER_INFO = "/mock/auth/getLoginUserInfo"
}

// 登录接口方法
export const koiLogin = (params: any) => {
  return koi.post(API.KOI_LOGIN, params);
};

// 获取后端菜单扁平化路由
export const listRouters = () => {
  return koi.get(API.LIST_ROUTERS);
};

// 获取角色数据 AND 按钮数据 AND 用户信息
export const getLoginUserInfo = () => {
  return koi.get(API.GET_LOGIN_USER_INFO);
};
