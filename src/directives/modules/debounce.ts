/**
 * v-debounce
 * 按钮防抖指令
 * 防抖就是在行为触发执行一次后，需静默等待N秒后才能再次执行，在此期间不能再触发行为，如果重复触发就计时归零后再次计时，直到用户静默到设定的阈值才再次执行。
 * 简而言之就是触发后N秒内不许触发，直到N秒后才可以执行。
 * <el-button type="primary" icon="search" plain v-debounce:500="handleSearch">搜索</el-button>
 */
// @ts-nocheck
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
  handleClick: () => any;
}
const debounce: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    if (typeof binding.value !== "function") {
      throw "callback must be a function";
    }
    let timer = null;
    const delay = parseInt(binding.arg) || 500;
    const handler = binding.value;

    el.addEventListener(
      "click",
      () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          handler();
        }, delay);
      },
      { passive: false }
    );
  }
};

export default debounce;
