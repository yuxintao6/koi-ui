// 导入二次封装axios
import koi from "@/utils/axios.ts";
import { ITableParams } from "./type.ts";

// 统一管理接口
enum API {
  LIST_PAGE = "/koi/sysDictType/listPage",
  GET_BY_ID = "/koi/sysDictType/getById",
  UPDATE = "/koi/sysDictType/update",
  ADD = "/koi/sysDictType/add",
  DELETE = "/koi/sysDictType/deleteById",
  BATCH_DELETE = "/koi/sysDictType/batchDelete",
  UPDATE_STATE = "/koi/sysDictType/updateStatus"
}
// 暴露请求函数
// 多条件分页查询数据
export const listPage = (params: ITableParams) => {
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
  return koi.post(API.BATCH_DELETE, ids);
};

// 修改状态
export const updateStatus = (id: any, status: any) => {
  return koi.post(API.UPDATE_STATE + "/" + id + "/" + status);
};
