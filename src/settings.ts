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
  logoUrl: "images/logo/logo.webp",

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
