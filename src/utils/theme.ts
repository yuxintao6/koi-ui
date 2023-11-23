import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { DEFAULT_THEME } from "@/config/index.ts";
import useGlobalStore from "@/stores/modules/global.ts";
import { menuTheme, headerTheme, asideTheme } from "@/config/theme.ts";

/** 主题切换方式[推荐] */
/**
 * @description hex颜色转rgb颜色
 * @param {String} str 颜色值字符串
 * @returns {String} 返回处理后的颜色值
 */
export function hexToRgb(str: any) {
  let hexs: any = "";
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(str)) return ElMessage.warning("输入错误的hex");
  str = str.replace("#", "");
  hexs = str.match(/../g);
  for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
  return hexs;
}

/**
 * @description rgb颜色转Hex颜色
 * @param {*} r 代表红色
 * @param {*} g 代表绿色
 * @param {*} b 代表蓝色
 * @returns {String} 返回处理后的颜色值
 */
export function rgbToHex(r: any, g: any, b: any) {
  let reg = /^\d{1,3}$/;
  if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return ElMessage.warning("输入错误的rgb颜色值");
  let hexs = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
  return `#${hexs.join("")}`;
}

/**
 * @description 加深颜色值
 * @param {String} color 颜色值字符串
 * @param {Number} level 加深的程度，限0-1之间
 * @returns {String} 返回处理后的颜色值
 */
export function getDarkColor(color: string, level: number) {
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) return ElMessage.warning("输入错误的hex颜色值");
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

/**
 * @description 变浅颜色值
 * @param {String} color 颜色值字符串
 * @param {Number} level 加深的程度，限0-1之间
 * @returns {String} 返回处理后的颜色值
 */
export function getLightColor(color: string, level: number) {
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) return ElMessage.warning("输入错误的hex颜色值");
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

/**
 * @description 全局主题配置
 * */
export const useTheme = () => {
  const globalStore = useGlobalStore();
  const { layout, isDark, themeColor, isGrey, isWeak, asideInverted, headerInverted } = storeToRefs(globalStore);

  // 切换暗黑模式 ==> 同时修改主题颜色、侧边栏、头部颜色
  const switchDark = () => {
    // 获取HTML根节点
    const html = document.documentElement as HTMLElement;
    if (isDark.value) html.setAttribute("class", "dark");
    else html.setAttribute("class", "");
    changeThemeColor(themeColor.value);
    setAsideTheme();
    setHeaderTheme();
  };

  // 修改主题颜色
  const changeThemeColor = (val: string | null) => {
    if (!val) {
      val = DEFAULT_THEME;
      ElMessage({ type: "success", message: `主题颜色已重置为默认主题🌻` });
    }
    // 计算主题颜色变化
    document.documentElement.style.setProperty("--el-color-primary", val);
    document.documentElement.style.setProperty(
      "--el-color-primary-dark-2",
      isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
    );
    for (let i = 1; i <= 9; i++) {
      const primaryColor = isDark.value ? `${getDarkColor(val, i / 10)}` : `${getLightColor(val, i / 10)}`;
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor);
    }
    globalStore.setGlobalState("themeColor", val);
  };

  // 灰色和弱色切换
  const changeGreyOrWeak = (type: any, value: boolean) => {
    const body = document.body as HTMLElement;
    if (!value) return body.removeAttribute("style");
    const styles: any = {
      grey: "filter: grayscale(1)",
      weak: "filter: invert(80%)"
    };
    body.setAttribute("style", styles[type]);
    const propName = type === "grey" ? "isWeak" : "isGrey";
    globalStore.setGlobalState(propName, false);
  };

  // 设置菜单样式
  const setMenuTheme = () => {
    let type = "light";
    // 如果布局为横向 && 头部反转
    if (layout.value === "horizontal" && headerInverted.value) type = "inverted";
    // 如果布局不为横向 && 侧边反转
    if (layout.value !== "horizontal" && asideInverted.value) type = "inverted";
    // 如果是黑色主题，直接为黑色
    if (isDark.value) type = "dark";
    const theme = menuTheme[type!];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value as string | null);
    }
  };

  // 设置侧边栏样式
  const setAsideTheme = () => {
    let type = "light";
    if (asideInverted.value) type = "inverted";
    if (isDark.value) type = "dark";
    const theme = asideTheme[type!];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value as string | null);
    }
    setMenuTheme();
  };

  // 设置头部样式
  const setHeaderTheme = () => {
    let type = "light";
    if (headerInverted.value) type = "inverted";
    if (isDark.value) type = "dark";
    const theme = headerTheme[type!];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value as string | null);
    }
    setMenuTheme();
  };

  // 初始化主题配置
  const initThemeConfig = () => {
    switchDark();
    if (isGrey.value) changeGreyOrWeak("grey", true);
    if (isWeak.value) changeGreyOrWeak("weak", true);
  };

  return {
    initThemeConfig,
    switchDark,
    changeThemeColor,
    changeGreyOrWeak,
    setAsideTheme,
    setHeaderTheme
  };
};
