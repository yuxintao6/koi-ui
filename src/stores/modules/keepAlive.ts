import { defineStore } from "pinia";

// defineStore方法执行会返回一个函数，函数的作用就是让组件可以获取到仓库数据
const userStore = defineStore("keepAlive", {
  // 存储数据state
  state: (): any => {
    return {
      keepAliveName: []
    };
  },
  // 该函数没有上下文数据，所以获取state中的变量需要使用this
  actions: {
    // 该方法用于向 keepAliveName 数组中添加新的名称。如果数组中已经存在相同的名称，则不会重复添加。
    async addKeepAliveName(name: string) {
      !this.keepAliveName.includes(name) && this.keepAliveName.push(name);
    },
    // 该方法用于从 keepAliveName 数组中移除指定的名称。使用 filter 方法过滤出不等于指定名称的元素，重新赋值给 keepAliveName 数组。
    async removeKeepAliveName(name: string) {
      this.keepAliveName = this.keepAliveName.filter((item: any) => item !== name);
    },
    // 该方法用于设置 keepAliveName 数组的值。可以传入一个新的字符串数组作为参数，如果没有传入参数则默认为空数组。
    async setKeepAliveName(keepAliveName: string[] = []) {
      this.keepAliveName = keepAliveName;
    }
  },
  // 计算属性，和vuex是使用一样，getters里面不是方法，是计算返回的结果值
  getters: {}
});

// 对外暴露方法
export default userStore;
