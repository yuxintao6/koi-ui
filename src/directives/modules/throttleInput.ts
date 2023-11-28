/*
  节流就是N秒内只执行一次，不管在N秒内重复调用了多少次，也只执行一次。
  <input v-throttleInput="throttleClick">节流提交</input>
*/
// @ts-nocheck
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
  handleClick: () => any;
  disabled: boolean;
}
const throttle: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    let timer = null;
    const delay = parseInt(binding.arg) || 500;
    const handler = binding.value;
    let lastExecTime = 0;

    el.addEventListener(
      "input",
      () => {
        const now = Date.now();
        if (now - lastExecTime > delay) {
          handler();
          lastExecTime = now;
        }
      },
      { passive: false }
    );
  }
};

export default throttle;
