<template>
  <Maximize v-show="globalStore.maximize" />
  <Tabs v-if="showTabs"></Tabs>
  <router-view v-slot="{ Component, route }">
    <transition :name="transition" mode="out-in" appear>
      <keep-alive :max="16" :include="keepAliveName" v-if="flag">
        <component :is="Component" :key="route.fullPath" v-if="isRouterShow" class="bg-#F6F9FE dark:bg-black" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, provide, onBeforeUnmount } from "vue";
import Maximize from "@/layouts/components/Main/components/Maximize.vue";
import { useDebounceFn } from "@vueuse/core";
import Tabs from "@/layouts/components/Tabs/index.vue";
import { storeToRefs } from "pinia";
import useKeepAliveStore from "@/stores/modules/keepAlive.ts";
import useRefreshStore from "@/stores/modules/refresh.ts";
import useGlobalStore from "@/stores/modules/global.ts";

const refreshStore = useRefreshStore();
const globalStore = useGlobalStore();
// 路由动画
const { transition } = storeToRefs(globalStore);

const keepAliveStore = useKeepAliveStore();
const { keepAliveName } = storeToRefs(keepAliveStore);

// 刷新当前路由页面缓存方法
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide("refresh", refreshCurrentPage);

// 刷新所有路由页面缓存
const flag = ref(true);
// 监听仓库内部数据是否发生变化，如果发生变化则表示点击过刷新按钮，就重载路由。
watch(
  () => refreshStore.refresh,
  () => {
    // 路由销毁
    flag.value = false;
    // nextTick：当响应式数据发生变化之后，获取响应数据之后的dom
    // 使用nextTick重载路由
    nextTick(() => {
      flag.value = true;
    });
  }
);

// 监听当前页面是否最大化，动态添加 class
watch(
  () => globalStore.maximize,
  () => {
    const app = document.getElementById("app") as HTMLElement;
    if (globalStore.maximize) app.classList.add("main-maximize");
    else app.classList.remove("main-maximize");
    // 浏览器没有实际变化的情况下，触发一次浏览器尺寸变化的逻辑。保证全屏切换的时候，表格阔以进行自适应。
    const event = new Event("resize");
    window.dispatchEvent(event);
  },
  { deep: true, immediate: true }
);

/** 监听窗口大小变化，折叠侧边栏 */
const screenWidth = ref(0);
const showTabs = ref(true);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  if (!globalStore.isCollapse && screenWidth.value < 1200) globalStore.setGlobalState("isCollapse", true);
  if (globalStore.isCollapse && screenWidth.value > 1200) globalStore.setGlobalState("isCollapse", false);
  if (screenWidth.value < 520) {
    showTabs.value = false;
  } else {
    showTabs.value = true;
  }
}, 100);
window.addEventListener("resize", listeningWindow, false);
onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});
</script>

<style lang="scss" scoped>
@import "../../../styles/transition.scss";
</style>
