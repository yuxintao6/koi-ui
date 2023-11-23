// 用来配置项目的Logo、标题等设置
export default {
  /**
   * 网页标题
   */
  logoTitle: import.meta.env.VITE_WEB_TITLE,

  /**
   * 网页标题
   */
  loginTitleSize: 18,

  /**
   * Logo大小
   */
  logoSize: "34px",

  /**
   * Logo地址
   */
  logoUrl:
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fae90b4c7-98b6-4a47-b1b3-9ee8bc71acf6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692146441&t=6fca60f3a0d323869b81d8fb53b5dd1b",

  /**
   * 是否隐藏Logo和网页标题(true-显示，false-隐藏)
   */
  logoHidden: true,

  /**
   * 管理平台标题动画
   */
  logoTitleAnimate: "animate__animated animate__fadeInLeft",

  /**
   * 左侧菜单动画
   */
  menuAnimate: "animate__animated animate__fadeInLeft",

  /**
   * 左侧折叠宽度
   */
  asideMenuCollapseWidth: "70px",

  /**
   * 左侧悬浮折叠宽度
   */
  asideMenuHoverCollapse: "70px",

  /**
   * 左侧折叠宽度[双栏布局]
   */
  columnMenuCollapseWidth: "56px",

  /**
   * 左侧悬浮折叠宽度[双栏布局]
   */
  columnMenuHoverCollapse: "56px"
};
