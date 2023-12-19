import { reactive } from "vue";
import { useBreakpoints } from "@vueuse/core";

export const breakpointsEnum = {
  xl: 1600,
  lg: 1199,
  md: 991,
  sm: 767,
  xs: 575
};

export const useScreenStore = () => {
  const breakpoints = reactive(useBreakpoints(breakpointsEnum));
  // 手机端
  const isMobile = breakpoints.smaller("sm");
  // pad端
  const isPad = breakpoints.between("sm", "md");
  // pc端
  const isDesktop = breakpoints.greater("md");
  return {
    breakpoints,
    isMobile,
    isPad,
    isDesktop
  };
};

// 使用步骤
/** 适配移动端开始 */
// import { useScreenStore } from "@/hooks/screen/index.ts";
// 获取当前为[移动端、IPad、PC端]仓库，阔以使用 watchEffect(() => {}) 进行监听。
// const { isMobile } = useScreenStore();
/** 适配移动端结束 */
