import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { layoutRouter, staticRouter, errorRouter } from "@/routers/modules/staticRouter";
import nprogress from "@/utils/nprogress";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import useUserStore from "@/stores/modules/user.ts";
import useAuthStore from "@/stores/modules/auth.ts";
import { LOGIN_URL, ROUTER_WHITE_LIST } from "@/config/index.ts";
import { koiMsgWarning } from "@/utils/koi.ts";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter.ts";

// .env配置文件读取
const mode = import.meta.env.VITE_ROUTER_MODE;

// 路由访问两种模式：带#号的哈希模式，正常路径的web模式。
const routerMode: any = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory()
};

// 创建路由器对象
const router = createRouter({
  // 路由模式hash或者默认不带#
  history: routerMode[mode](),
  routes: [...layoutRouter, ...staticRouter, ...errorRouter],
  strict: false,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    };
  }
});

/**
 * @description 前置路由
 * */
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userStore = useUserStore();
  const authStore = useAuthStore();

  // 1、NProgress 开始
  nprogress.start();

  // 2、标题切换，没有防止后置路由，是因为页面路径不存在，title会变成undefined
  const title = import.meta.env.VITE_WEB_TITLE;
  document.title = to.meta.title + "🌻" || title;

  // 3、判断是访问登陆页，有Token访问当前页面，token过期访问接口，axios封装则自动跳转登录页面，没有Token重置路由到登陆页。
  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    // 有Token访问当前页面
    if (userStore.token) {
      return next(from.fullPath);
    } else {
      koiMsgWarning("账号身份已过期，请重新登录🌻");
    }
    // 没有Token重置路由到登陆页。
    resetRouter();
    return next();
  }

  // 4、判断访问页面是否在路由白名单地址[静态路由]中，如果存在直接放行。
  if (ROUTER_WHITE_LIST.includes(to.path)) return next();

  // 5、判断是否有 Token，没有重定向到 login 页面。
  if (!userStore.token) return next({ path: LOGIN_URL, replace: true });

  // 6、如果没有菜单列表[一级扁平化路由 OR 递归菜单路由数据判断是否存在都阔以]，就重新请求菜单列表并添加动态路由。
  if (!authStore.getMenuList.length) {
    // 注意：authStore.getMenuList，不能持久化菜单数据，否则这里一直有值，就不会走这里，而且持久化之后还会被篡改数据。
    // 获取相关菜单数据 && 按钮数据 && 角色数据 && 用户信息。
    // console.log("刷新页面");
    await initDynamicRouter();
    return next({ ...to, replace: true }); // ...to 保证路由添加完了再进入页面 (可以理解为重进一次) replace: true 重进一次, 不保留重复历史
  }
  // 7、正常访问页面。
  next();
});

/**
 * @description 重置路由
 */
export const resetRouter = () => {
  const authStore = useAuthStore();
  authStore.getMenuList.forEach((route: any) => {
    const { name } = route;
    if (name && router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
};

/**
 * @description 路由跳转错误
 */
router.onError(error => {
  // 结束全屏动画
  nprogress.done();
  console.warn("路由错误", error.message);
});

/**
 * @description 后置路由
 */
// @ts-ignore
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  // console.log("后置守卫", to, from);
  // const title = import.meta.env.VITE_WEB_TITLE;
  // document.title = to.meta.title + "🌻" || title;
  // 结束全屏动画
  nprogress.done();
});

export default router;
