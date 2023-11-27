// 导入二次封装axios
import koi from "@/utils/axios.ts";

// 统一管理接口
enum API {
  LIST = "/koi/sysMenu/list",
  CASCADER_LIST = "/koi/sysMenu/cascaderList",
  GET_BY_ID = "/koi/sysMenu/getById",
  UPDATE = "/koi/sysMenu/update",
  ADD = "/koi/sysMenu/add",
  DELETE = "/koi/sysMenu/deleteById",
  BATCH_DELETE = "/koi/sysMenu/batchDelete",
  UPDATE_STATE = "/koi/sysMenu/updateStatus",
  UPDATE_SPREAD = "/koi/sysMenu/updateSpread",
  LIST_ROUTERS = "/koi/sysMenu/listRouters",
  LIST_MENU_NORMAL = "/koi/sysMenu/listMenuNormal",
  LIST_MENUIDS_BY_ROLEID = "/koi/sysMenu/listMenuIdsByRoleId",
  SAVE_ROLE_MENU = "/koi/sysMenu/saveRoleMenu"
}

// 多条件进行查询
export const list = (params: any) => {
  return koi.get(API.LIST, params);
};

// 菜单级联下拉框
export const cascaderList = () => {
  return koi.get(API.CASCADER_LIST);
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

// 修改状态
export const updateSpread = (id: any, spread: any) => {
  return koi.post(API.UPDATE_SPREAD + "/" + id + "/" + spread); // 第一种传参方式
};

// 获取用户左侧菜单数据
export const listRouters = (id: any) => {
  return koi.get(API.LIST_ROUTERS + "/" + id);
};

// 获取正常所有菜单数据
export const listMenuNormal = () => {
  return koi.get(API.LIST_MENU_NORMAL);
};

// 根据用户拥有的角色ID查询权限菜单
export const listMenuIdsByRoleId = (id: any) => {
  return koi.get(API.LIST_MENUIDS_BY_ROLEID + "/" + id);
};

// 保存角色和菜单权限之间的关系
export function saveRoleMenu(roleId: any, menuIds: any) {
  // 处理如果没有选择菜单数据。无法匹配后台数据的问题
  if (menuIds.length === 0) {
    menuIds = [-1];
  }
  return koi.post(API.SAVE_ROLE_MENU + "/" + roleId + "/" + menuIds);
}
