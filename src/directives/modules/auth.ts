/**
 * v-auth
 * 按钮权限指令
 */
import useAuthStore from "@/stores/modules/auth.ts";
import type { Directive, DirectiveBinding } from "vue";

const auth: Directive = {
  // 代表使用这个全局自定义指令的DOM OR 组件挂载完毕的时候会执行一次。
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const userStore = useAuthStore();
    // console.log("v-auth值",value);
    // console.log("el",el);
    // console.log("用户仓库",userStore.buttonList)
    // console.log("是否包含",JSON.stringify(userStore.buttonList).includes(value))
    // 注意：从仓库中取出来的值一定需要使用JSON.stringify转换
    if (!JSON.stringify(userStore.buttonList).includes(value)) {
      el.parentNode?.removeChild(el);
    }
  }
};

export default auth;
