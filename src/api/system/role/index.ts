// 导入二次封装axios
import koi from "@/utils/axios.ts";
import { ITableParams } from "./type.ts";

// 统一管理接口
enum API {
  TEST_LIST_PAGE = "/koi/mp",
  LIST_PAGE = "/koi/sysRole/listPage",
  GET_BY_ID = "/koi/sysRole/getById",
  UPDATE = "/koi/sysRole/update",
  ADD = "/koi/sysRole/add",
  DELETE = "/koi/sysRole/deleteById",
  BATCH_DELETE = "/koi/sysRole/batchDelete",
  UPDATE_STATE = "/koi/sysRole/updateStatus",
  LIST_NORMAL_ROLE = "/koi/sysRole/listNormalRole",
  ASSIGN_USER_ROLE = "/koi/sysRole/assignUserRole"
}
// 暴露请求函数
// 分页查询角色数据
export const testListPage = (pageNum: number, pageSize: number) => {
  return koi.get(API.TEST_LIST_PAGE + "/" + pageNum + "/" + pageSize); // 第一种传参方式
  // return koi.get(API.LIST_PAGE + `/${pageNum}/${pageSize}`); // 第二种传参方式
};

// 多条件分页查询数据
export const listPage = (params: ITableParams) => {
  return koi.get(API.LIST_PAGE, params);
};

// 查询所有正常角色[穿梭框]
export const listNormalRole = (userId: any) => {
  return koi.get(API.LIST_NORMAL_ROLE + "/" + userId);
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

// 根据当前用户ID分配角色
export const assignUserRole = (roleIds: any) => {
  return koi.post(API.ASSIGN_USER_ROLE, roleIds); // 第一种传参方式
};
