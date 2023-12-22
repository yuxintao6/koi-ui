import SvgIcon from "./SvgIcon/Index.vue";
import KoiDialog from "./KoiDialog/Index.vue";
import KoiDrawer from "./KoiDrawer/Index.vue";
import KoiToolbar from "./KoiToolbar/Index.vue";
import KoiTag from "./KoiTag/Index.vue";
import KoiIcon from "./KoiIcon/Index.vue";
import KoiImage from "./KoiImage/Index.vue";
import KoiPicture from "./KoiPicture/Index.vue";
import KoiUploadFile from "./KoiUpload/File.vue";
import KoiUploadImage from "./KoiUpload/Image.vue";
import KoiUploadImages from "./KoiUpload/Images.vue";
import MobileDrawer from "./MobileDrawer/Index.vue";
import KoiExcel from "./KoiExcel/Index.vue";
import KoiTagFilter from "./KoiTagFilter/Index.vue";

import type { App, Component } from "vue";
// 对外暴露插件对象，注册全局组件
const components: { [name: string]: Component } = {
  SvgIcon,
  KoiDialog,
  KoiDrawer,
  KoiToolbar,
  KoiTag,
  KoiIcon,
  KoiImage,
  KoiPicture,
  KoiUploadFile,
  KoiUploadImage,
  KoiUploadImages,
  MobileDrawer,
  KoiExcel,
  KoiTagFilter
};
export default {
  // install方法， Object.keys()得到对象所有的key
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
  }
};
