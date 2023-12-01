import { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";

interface HTMLElementWithCopyData extends HTMLElement {
  copyData: string | number;
  handleClickEl: EventListener;
}

const copy: Directive = {
  mounted(el: HTMLElementWithCopyData, binding: DirectiveBinding) {
    el.copyData = binding.value as string | number;
    el.handleClickEl = async function () {
      try {
        await navigator.clipboard.writeText(el.copyData.toString());
        ElMessage.success("复制成功🌻");
      } catch (error) {
        console.error("复制操作不被支持或失败: ", error);
        ElMessage.error("复制失败🌻");
      }
    };
    el.addEventListener("click", el.handleClickEl);
  },
  updated(el: HTMLElementWithCopyData, binding: DirectiveBinding) {
    el.copyData = binding.value as string | number;
  },
  beforeUnmount(el: HTMLElementWithCopyData) {
    el.removeEventListener("click", el.handleClickEl);
  }
};

export default copy;
