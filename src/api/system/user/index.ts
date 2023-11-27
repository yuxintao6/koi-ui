// 导入二次封装axios
import koi from "@/utils/axios.ts";
// 引入接口类型
import type { ILoginParams } from "./type.ts";

// 统一管理接口
enum API {
  KOI_LOGIN = "/auth/login",
  KOI_DYNAMIC_DATA = "/koi/sysLoginUser/getLoginUserInfo",
  KOI_USERINFO = "/user/info",
  LIST_PAGE = "/koi/sysLoginUser/listPage",
  GET_BY_ID = "/koi/sysLoginUser/getById",
  UPDATE = "/koi/sysLoginUser/update",
  ADD = "/koi/sysLoginUser/add",
  DELETE = "/koi/sysLoginUser/deleteById",
  BATCH_DELETE = "/koi/sysLoginUser/batchDelete",
  UPDATE_STATE = "/koi/sysLoginUser/updateStatus"
}
// 暴露请求函数
// 登录接口方法
export const koiLogin = (params: ILoginParams) => {
  return koi.post(API.KOI_LOGIN, params);
};

// 通过token查询相关用户信息、按钮权限、菜单权限数据，token必须有效
export const koiDynamicData = () => {
  return koi.get(API.KOI_DYNAMIC_DATA);
};

// 查询用户信息
export const koiUserInfo = (params: ILoginParams) => {
  return koi.get(API.KOI_USERINFO, params);
};

// 多条件分页查询数据
export const listPage = (params: any) => {
  return koi.get(API.LIST_PAGE, params);
};

// 根据ID进行查询
export const getById = (id: any) => {
  return koi.get(API.GET_BY_ID + "/" + id);
};

// 根据ID进行修改
export const update = (data: any) => {
  return koi.post(API.UPDATE, data);
};

// 添加
export const add = (data: any) => {
  return koi.post(API.ADD, data);
};

// 删除
export const deleteById = (id: any) => {
  return koi.post(API.DELETE + "/" + id);
};

// 批量删除
export const batchDelete = (ids: any) => {
  return koi.post(API.BATCH_DELETE, ids); // 第一种传参方式
};

// 修改状态
export const updateStatus = (id: any, status: any) => {
  return koi.post(API.UPDATE_STATE + "/" + id + "/" + status); // 第一种传参方式
};
