// 导入二次封装axios
import koi from "@/utils/axios.ts";

// 统一管理接口
enum API {
  LIST = "/koi/sysDept/list",
  CASCADER_LIST = "/koi/sysDept/cascaderList",
  GET_BY_ID = "/koi/sysDept/getById",
  UPDATE = "/koi/sysDept/update",
  ADD = "/koi/sysDept/add",
  DELETE = "/koi/sysDept/deleteById",
  BATCH_DELETE = "/koi/sysDept/batchDelete",
  UPDATE_STATE = "/koi/sysDept/updateStatus",
  UPDATE_SPREAD = "/koi/sysDept/updateSpread"
}

// 多条件分页查询
export const list = (params: any) => {
  return koi.get(API.LIST, params);
};

// 部门级联下拉框
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
