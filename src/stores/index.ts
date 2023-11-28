// 创建大仓库
import { createPinia } from "pinia";
// pinia持久化
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// createPinia方法可以用于创建大仓库
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
// 对外暴露,安装仓库
export default pinia;
