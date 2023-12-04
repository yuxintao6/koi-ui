/**
 * v-auth
 * 按钮权限指令
 */
import useAuthStore from "@/stores/modules/auth.ts";
import type { Directive, DirectiveBinding } from "vue";

const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const userStore = useAuthStore();

    if (Array.isArray(value) && value.every((permission: string) => userStore.buttonList.includes(permission))) {
      // 如果用户拥有数组中所有权限，则不做任何操作，元素会显示出来
    } else {
      el.parentNode?.removeChild(el); // 如果用户不拥有所有权限，则移除元素
    }
  }
};

export default auth;
