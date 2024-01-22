// 定义是否刷新小仓库（选择式Api写法）
import { defineStore } from "pinia";

const refreshStore = defineStore("refresh", {
  // 存储数据state
  state: () => {
    return {
      refresh: false // 默认不刷新（这个用来页面传递值，不进行存储）
    };
  },
  actions: {
    // 该函数没有上下文数据，所以获取state中的变量需要使用this
  },
  // 计算属性，和vuex是使用一样，getters里面不是方法，是计算返回的结果值
  getters: {
    // 获取state
  }
});

// 对外暴露方法
export default refreshStore;
