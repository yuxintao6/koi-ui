<template>
  <div class="tabs-card">
    <div @click="handleRefresh()" class="tab-menu-item c-#0C6ED0">
      <el-icon class="m-r-2px"><Refresh /></el-icon>{{ $t("tabs.refresh") }}
    </div>
    <br />
    <div @click="handleMaximize()" class="tab-menu-item c-#646cff">
      <el-icon class="m-r-2px"><FullScreen /></el-icon>{{ $t("tabs.maximize") }}
    </div>
    <br />
    <div @click="handleCloseCurrentTab()" class="tab-menu-item c-#C93992">
      <el-icon class="m-r-2px"><Close /></el-icon>{{ $t("tabs.closeCurrent") }}
    </div>
    <br />
    <div @click="handleCloseOtherTabs()" class="tab-menu-item c-#DD5858">
      <el-icon class="m-r-2px"><Star /></el-icon>{{ $t("tabs.closeOther") }}
    </div>
    <br />
    <div @click="handleCloseSideTabs('left')" class="tab-menu-item c-#31A24D">
      <el-icon class="m-r-2px"><DArrowLeft /></el-icon>{{ $t("tabs.closeLeft") }}
    </div>
    <br />
    <div @click="handleCloseSideTabs('right')" class="tab-menu-item c-#F77A05">
      <el-icon class="m-r-2px"><DArrowRight /></el-icon>{{ $t("tabs.closeRight") }}
    </div>
    <br />
    <div icon="Remove" @click="handleCloseAllTabs()" class="tab-menu-item c-#7723B0">
      <el-icon class="m-r-2px"><Remove /></el-icon>{{ $t("tabs.closeAll") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import useTabsStore from "@/stores/modules/tabs.ts";
import useKeepAliveStore from "@/stores/modules/keepAlive.ts";
import useGlobalStore from "@/stores/modules/global.ts";
import { HOME_URL } from "@/config/index.ts";

const route = useRoute();
const router = useRouter();
const keepAliveStore = useKeepAliveStore();
const tabsStore = useTabsStore();
const globalStore = useGlobalStore();

// 点击鼠标右键点击出现菜单
const choosePath = ref();
const handleTabsMenu = (path: any, e: MouseEvent) => {
  choosePath.value = path;
  const card = document.querySelector(".tabs-card") as HTMLElement | null;

  // 阻止默认右键菜单
  e.preventDefault();
  if (card != null) {
    // 设置 card 的位置为鼠标点击位置
    card.style.display = "block";
    card.style.left = (e.pageX + "px") as string;
    card.style.top = (e.pageY + "px") as string;

    // 点击数据时，菜单消失
    const hideCard = () => {
      if (card !== null) {
        card.style.display = "none";
      }
      window.removeEventListener("click", hideCard); // 移除点击事件监听器，以免影响其他操作
    };

    window.addEventListener("click", hideCard);
  }
  // 阻止事件冒泡到父元素（防止触发全局的 window.onclick）
  e.stopPropagation();
};

// 刷新当前页
const refreshCurrentPage: Function = inject("refresh") as Function;
const handleRefresh = () => {
  setTimeout(() => {
    route.meta.isKeepAlive && keepAliveStore.removeKeepAliveName(route.name as string);
    refreshCurrentPage(false);
    nextTick(() => {
      route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.name as string);
      refreshCurrentPage(true);
    });
  }, 0);
};

// 当前页全屏
const handleMaximize = () => {
  globalStore.setGlobalState("maximize", !globalStore.maximize);
};

// 关闭左边 OR 右边选项卡
const handleCloseSideTabs = (direction: any) => {
  // console.log("关闭左边 OR 右边选项卡", direction);
  if (choosePath.value) {
    tabsStore.closeSideTabs(choosePath.value, direction);
  } else {
    tabsStore.closeSideTabs(route.fullPath, direction);
  }
};

// 关闭当前选项卡
const handleCloseCurrentTab = () => {
  // console.log("关闭当前选项卡");
  if (route.meta?.isAffix == "0") return;
  if (choosePath.value) {
    tabsStore.removeTab(choosePath.value);
  } else {
    tabsStore.removeTab(route.fullPath);
  }
};

// 关闭其他选项卡
const handleCloseOtherTabs = () => {
  // console.log("关闭其他选项卡");
  if (choosePath.value) {
    tabsStore.closeManyTabs(choosePath.value);
  } else {
    tabsStore.closeManyTabs(route.fullPath);
  }
};

// 关闭全部选项卡
const handleCloseAllTabs = () => {
  // console.log("关闭全部选项卡");
  tabsStore.closeManyTabs();
  router.push(HOME_URL);
};

// 组件对外暴露
defineExpose({
  handleTabsMenu
});
</script>

<style lang="scss" scoped>
/** 右键点击选项开始 */
.tabs-card {
  display: none;
  position: absolute;
  z-index: 10;
  border-radius: var(--el-border-radius-base);
  background-color: var(--el-header-bg-color);
  cursor: pointer;
}
.tab-menu-item {
  font-weight: 700;
  margin-top: 1px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed var(--el-color-primary);
  width: auto;
  height: 10px;
  white-space: nowrap;
  text-align: center;
  user-select: none;
  background-color: var(--el-bg-color);
  padding: 8px 15px;
  font-size: var(--el-font-size-base);
  border-radius: var(--el-border-radius-base);
  &:hover {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
}
/** 右键点击选项结束 */
</style>
