// 导入二次封装axios
import koi from "@/utils/axios.ts";
// import { ITableParams } from "./type.ts";

// 统一管理接口
enum API {
  LIST_DICT_TYPE = "/koi/sysDictType/listDictType",
  LIST_PAGE = "/koi/sysDictData/listPage",
  GET_BY_ID = "/koi/sysDictData/getById",
  UPDATE = "/koi/sysDictData/update",
  ADD = "/koi/sysDictData/add",
  DELETE = "/koi/sysDictData/deleteById",
  BATCH_DELETE = "/koi/sysDictData/batchDelete",
  UPDATE_STATE = "/koi/sysDictData/updateStatus",
  LIST_DATA_BY_TYPE = "/koi/sysDictData/listDataByType"
}
// 暴露请求函数
// 条件下拉框
export const listDictType = () => {
  return koi.get(API.LIST_DICT_TYPE);
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
  return koi.post(API.DELETE + "/" + id); // 第一种传参方式
};

// 批量删除
export const batchDelete = (ids: any) => {
  return koi.post(API.BATCH_DELETE, ids); // 第一种传参方式
};

// 修改状态
export const updateStatus = (id: any, status: any) => {
  return koi.post(API.UPDATE_STATE + "/" + id + "/" + status); // 第一种传参方式
};

// 根据字典类型查询数据
export const listDataByType = (dictType: any) => {
  return koi.get(API.LIST_DATA_BY_TYPE + "/" + dictType); // 第一种传参方式
};
