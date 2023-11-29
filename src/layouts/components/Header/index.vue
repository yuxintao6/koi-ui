<template>
  <div class="header">
    <div class="header-left">
      <!-- 左侧菜单展开和折叠图标 -->
      <Collapse></Collapse>
      <!-- 面包屑 -->
      <BreadCrumb v-if="showTool"></BreadCrumb>
    </div>
    <div class="header-right">
      <!-- 搜索菜单 -->
      <SearchMenu v-if="showTool"></SearchMenu>
      <!-- ElementPlus 尺寸配置 -->
      <Dimension v-if="showTool"></Dimension>
      <!-- 路由缓存刷新 -->
      <Refresh v-if="showTool"></Refresh>
      <!-- 明亮/暗黑模式图标 -->
      <Dark></Dark>
      <!-- 中英文翻译 -->
      <Language v-if="showTool"></Language>
      <!-- 全屏图标 -->
      <FullScreen></FullScreen>
      <!-- 主题配置 -->
      <ThemeSetting v-if="showTool"></ThemeSetting>
      <!-- 头像 AND 下拉折叠 -->
      <User></User>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { useDebounceFn } from "@vueuse/core";
import Collapse from "@/layouts/components/Header/components/Collapse.vue";
import BreadCrumb from "@/layouts/components/Header/components/BreadCrumb.vue";
import User from "@/layouts/components/Header/components/User.vue";
import FullScreen from "@/layouts/components/Header/components/FullScreen.vue";
import Dark from "@/layouts/components/Header/components/Dark.vue";
import ThemeSetting from "@/layouts/components/Header/components/ThemeSetting.vue";
import Refresh from "@/layouts/components/Header/components/Refresh.vue";
import Dimension from "@/layouts/components/Header/components/Dimension.vue";
import Language from "@/layouts/components/Header/components/Language.vue";
import SearchMenu from "@/layouts/components/Header/components/SearchMenu.vue";

/** 监听窗口大小变化，进行是否显示 */
const showTool = ref(true); // 是否显示
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  if (screenWidth.value < 865) {
    showTool.value = false;
  } else {
    showTool.value = true;
  }
}, 100);
window.addEventListener("resize", listeningWindow, false);
onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: $aside-header-height;
  .header-left {
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
  }
  .header-right {
    display: flex;
    align-items: center;
  }
}
</style>
