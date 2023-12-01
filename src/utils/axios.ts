import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { koiMsgError } from "@/utils/koi.ts";
import { LOGIN_URL } from "@/config/index.ts";
import useUserStore from "@/stores/modules/user.ts";
import { getToken, koiSessionStorage } from "@/utils/storage.ts";
import router from "@/routers/index.ts";
// import errorStatus from "@/utils/errorStatus.ts"
// axios配置
const config = {
  // 接口请求的地址
  baseURL: import.meta.env.VITE_SERVER,
  timeout: 10000
};
// 返回值类型
export interface Result<T = any> {
  code: number;
  msg: string;
  data: T;
}
// 只有请求封装用的Yu，方便简写
class Yu {
  private instance: AxiosInstance;
  // 初始化
  constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.instance = axios.create(config);
    // 配置拦截器
    this.interceptors();
  }
  // 拦截器
  private interceptors() {
    // 请求发送之前的拦截器：携带token
    // @ts-ignore
    this.instance.interceptors.request.use(
      config => {
        // 获取token
        const token = getToken();
        // 如果实现挤下线功能，需要用户绑定一个uuid，uuid发生变化，后端将数据进行处理[直接使用Sa-Token框架也阔以]
        if (token) {
          config.headers!["Authorization"] = "Bearer " + token;
        }
        return config;
      },
      (error: any) => {
        error.data = {};
        error.data.msg = "服务器异常，请联系管理员🌻";
        return error;
      }
    );
    // 请求返回之后的拦截器：数据或者状态
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // console.log("axios返回数据：", res);
        // console.log("服务器状态",res.status);
        const status = res.data.status; // 后端返回数据状态
        if (status == 200) {
          // 服务器连接状态，非后端返回的status 或者 code
          // 这里的后端可能是code OR status 和 msg OR message需要看后端传递的是什么？
          // 获取错误信息
          // const msg = errorStatus[res.data.status || 200] || res.data.msg + "🌻" || errorStatus['default']
          // console.log("200状态", status);
          return res.data;
        } else if (status == 401) {
          // console.log("401状态", status);
          const userStore = useUserStore();
          userStore.setToken(""); // 清空token必须使用这个，不能使用session清空，因为登录的时候js会获取一遍token还会存在。
          koiMsgError("登录身份过期，请重新登录🌻");
          setTimeout(() => {
            router.replace(LOGIN_URL);
          }, 2000); // 等待2秒后重定向，给用户时间看到提示信息
          return Promise.reject(res.data);
        } else {
          // console.log("后端返回数据：",res.data.msg)
          koiMsgError(res.data.msg + "🌻" || "服务器偷偷跑到火星去玩了🌻");
          return Promise.reject(res.data.msg + "🌻" || "服务器偷偷跑到火星去玩了🌻"); // 可以将异常信息延续到页面中处理，使用try{}catch(error){};
        }
      },
      (error: any) => {
        // 处理网络错误，不是服务器响应的数据
        // console.log("进入错误",error);
        error.data = {};
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.data.msg = "错误请求🌻";
              koiMsgError(error.data.msg);
              break;
            case 401:
              error.data.msg = "未授权，请重新登录🌻";
              koiMsgError(error.data.msg);
              break;
            case 403:
              error.data.msg = "对不起，您没有权限访问🌻";
              koiMsgError(error.data.msg);
              break;
            case 404:
              error.data.msg = "请求错误,未找到请求路径🌻";
              koiMsgError(error.data.msg);
              break;
            case 405:
              error.data.msg = "请求方法未允许🌻";
              koiMsgError(error.data.msg);
              break;
            case 408:
              error.data.msg = "请求超时🌻";
              koiMsgError(error.data.msg);
              break;
            case 500:
              error.data.msg = "服务器又偷懒了，请重试🌻";
              koiMsgError(error.data.msg);
              break;
            case 501:
              error.data.msg = "网络未实现🌻";
              koiMsgError(error.data.msg);
              break;
            case 502:
              error.data.msg = "网络错误🌻";
              koiMsgError(error.data.msg);
              break;
            case 503:
              error.data.msg = "服务不可用🌻";
              koiMsgError(error.data.msg);
              break;
            case 504:
              error.data.msg = "网络超时🌻";
              koiMsgError(error.data.msg);
              break;
            case 505:
              error.data.msg = "http版本不支持该请求🌻";
              koiMsgError(error.data.msg);
              break;
            default:
              error.data.msg = `连接错误${error.response.status}`;
              koiMsgError(error.data.msg);
          }
        } else {
          error.data.msg = "连接到服务器失败🌻";
          koiMsgError(error.data.msg);
        }
        return Promise.reject(error); // 将错误返回给 try{} catch(){} 中进行捕获，就算不进行捕获，上方 res.data.status != 200也会抛出提示。
      }
    );
  }
  // Get请求
  get<T = Result>(url: string, params?: object): Promise<T> {
    return this.instance.get(url, { params });
  }
  // Post请求
  post<T = Result>(url: string, data?: object): Promise<T> {
    return this.instance.post(url, data);
  }
  // Put请求
  put<T = Result>(url: string, data?: object): Promise<T> {
    return this.instance.put(url, data);
  }
  // Delete请求  /yu/role/1
  delete<T = Result>(url: string): Promise<T> {
    return this.instance.delete(url);
  }
  // 图片上传
  upload<T = Result>(url: string, params?: object): Promise<T> {
    return this.instance.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
}
export default new Yu(config);
