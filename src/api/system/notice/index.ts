// 导入二次封装axios
import koi from "@/utils/axios.ts";
// import { ITableParams } from "./type.ts";

// 统一管理接口
enum API {
  LIST_PAGE = "/koi/sysNotice/listPage",
  GET_BY_ID = "/koi/sysNotice/getById",
  UPDATE = "/koi/sysNotice/update",
  ADD = "/koi/sysNotice/add",
  DELETE = "/koi/sysNotice/deleteById",
  BATCH_DELETE = "/koi/sysNotice/batchDelete",
  UPDATE_STATE = "/koi/sysNotice/updateStatus"
}
// 暴露请求函数
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
