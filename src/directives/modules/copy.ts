import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";

interface ElType extends HTMLElement {
  copyData: string | number;
  handleClickEl: any;
}

const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
    el.handleClickEl = handleClick.bind(el);
    el.addEventListener("click", el.handleClickEl);
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.handleClickEl);
  }
};

async function handleClick(this: ElType) {
  try {
    await navigator.clipboard.writeText(this.copyData.toString());
    ElMessage.success("复制成功");
  } catch (err) {
    console.error("复制操作不被支持或失败: ", err);
    ElMessage.error("复制失败");
  }
}

export default copy;
