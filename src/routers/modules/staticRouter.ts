import { RouteRecordRaw } from "vue-router";
import { HOME_URL, LOGIN_URL } from "@/config";
import Layout from "@/layouts/index.vue";

/**
 * LayoutRouter (布局路由)
 */
export const layoutRouter: RouteRecordRaw[] = [
  // {
  //   path: "/",
  //   redirect: HOME_URL
  // },
  // {
  //   path: "/",
  //   name: "layout",
  //   component: () => import("@/layouts/index.vue"),
  //   redirect: HOME_URL,
  //   children: []
  // }
  {
    // 登录成功以后展示数据的路由[一级路由，可以将子路由放置Main模块中(核心)]
    path: "/", // 路由访问路径（唯一）
    name: "layout", // 命名路由（唯一）
    component: Layout, // 登录进入这个页面，这个页面是整个布局
    redirect: HOME_URL, // path路径，<router-link name="/404"> 也是使用path进行跳转
    children: [
      {
        path: HOME_URL, // （唯一）
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页", // 标题
          icon: "HomeFilled", // 图标
          isHide: "0", // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
          isLink: "", // 是否外链（有值则是外链）
          isKeepAlive: "0", // 是否缓存路由数据（0是，1否）
          isFull: "1", // 是否缓存全屏（0是，1否）
          isAffix: "1" // 是否缓存固定路由（0是，1否）
        }
      }
    ]
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  }
];

/**
 * LayoutRouter (布局路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  /** 首页 */
  {
    path: "/home/index", // （唯一）
    component: () => import("@/views/home/index.vue"),
    meta: {
      title: "首页", // 标题
      icon: "HomeFilled", // 图标 HomeFilled
      isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
      isLink: "", // 是否外链（有值则是外链）
      isKeepAlive: "0", // 是否缓存路由数据（0是，1否）
      isFull: "1", // 是否缓存全屏（0是，1否）
      isAffix: "1" // 是否缓存固定路由（0是，1否）
    }
  }
  /** 系统管理 */
  // {
  //   path: "/system", // 路由访问路径（唯一）
  //   name: "system", // 命名路由（唯一）
  //   component: Layout, // 一级路由，可以将子路由放置Main模块中
  //   redirect: "/system/user", // path路径，<router-link name="/404"> 也是使用path进行跳转
  //   meta: {
  //     title: "系统管理", // 标题
  //     icon: "Tools", // 图标
  //     isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
  //     isLink: "", // 是否外链（有值则是外链）
  //     isKeepAlive: "0", // 是否缓存路由数据（0是，1否）
  //     isFull: "1", // 是否缓存全屏（0是，1否）
  //     isAffix: "1" // 是否缓存固定路由（0是，1否）
  //   },
  //   children: [
  //     {
  //       path: "/system/user", // （唯一）
  //       name: "userPage",
  //       component: () => import("@/views/system/user/index.vue"),
  //       meta: {
  //         title: "用户管理", // 标题
  //         icon: "UserFilled", // 图标
  //         isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
  //         isLink: "", // 是否外链（有值则是外链）
  //         isKeepAlive: "0", // 是否缓存路由数据（0是，1否）
  //         isFull: "1", // 是否缓存全屏（0是，1否）
  //         isAffix: "1" // 是否缓存固定路由（0是，1否）
  //       }
  //     },
  //     {
  //       path: "/system/role", // （唯一）
  //       name: "rolePage",
  //       component: () => import("@/views/system/role/index.vue"),
  //       meta: {
  //         title: "角色管理", // 标题
  //         icon: "CameraFilled", // 图标
  //         isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
  //         isLink: "", // 是否外链（有值则是外链）
  //         isKeepAlive: "0", // 是否缓存路由数据（0是，1否）
  //         isFull: "1", // 是否缓存全屏（0是，1否）
  //         isAffix: "1" // 是否缓存固定路由（0是，1否）
  //       }
  //     },
  //     {
  //       path: "/system/menu", // （唯一）
  //       name: "menu",
  //       component: () => import("@/views/system/menu/index.vue"),
  //       meta: {
  //         title: "菜单管理", // 标题
  //         icon: "Menu", // 图标
  //         isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
  //         isLink: "", // 是否外链（有值则是外链）
  //         isKeepAlive: "0", // 是否缓存路由数据（0是，1否）
  //         isFull: "1", // 是否缓存全屏（0是，1否）
  //         isAffix: "1" // 是否缓存固定路由（0是，1否）
  //       }
  //     }
  //   ]
  // }
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/error/403.vue"),
    meta: {
      title: "403页面",
      icon: "QuestionFilled", // 菜单图标
      isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
      isLink: "1", // 是否外链（有值则是外链）
      isKeepAlive: "0", // 是否缓存路由数据（0是，1否）
      isFull: "1", // 是否缓存全屏（0是，1否）
      isAffix: "1" // 是否缓存固定路由（0是，1否）
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404.vue"),
    meta: {
      title: "404页面",
      icon: "CircleCloseFilled", // 菜单图标
      isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
      isLink: "1", // 是否外链（有值则是外链）
      isKeepAlive: "0", // 是否缓存路由数据（0是，1否）
      isFull: "1", // 是否缓存全屏（0是，1否）
      isAffix: "1" // 是否缓存固定路由（0是，1否）
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/error/500.vue"),
    meta: {
      title: "500页面",
      icon: "WarningFilled", // 图标
      isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
      isLink: "1", // 是否外链（有值则是外链）
      isKeepAlive: "0", // 是否缓存路由数据（0是，1否）
      isFull: "1", // 是否缓存全屏（0是，1否）
      isAffix: "1" // 是否缓存固定路由（0是，1否）
    }
  },
  // 找不到path将跳转404页面
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/404.vue")
  }
];
