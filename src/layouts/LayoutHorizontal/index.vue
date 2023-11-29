<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <Logo :layout="globalStore.layout"></Logo>
      <div class="koi-menu">
        <!-- 不能直接使用 HorizontalSubMenu 组件，因为菜单数据过多无法触发 el-menu 隐藏省略功能 -->
        <el-menu mode="horizontal" :default-active="route.path" :router="false" :class="menuAnimate">
          <!-- 有下级，用el-sub-menu，无下级用el-menu-item -->
          <template v-for="item in menuList" :key="item.path">
            <!-- 非叶子节点 v-show：true(显示)false(隐藏)，v-if反之。 -->
            <el-sub-menu v-if="item.children?.length" :index="item.path" v-show="item.meta.isHide == '1'">
              <template #title>
                <el-icon v-if="item.meta.icon && item.meta.icon.indexOf(SVG_PREFIX) == -1">
                  <component :is="item.meta.icon"></component>
                </el-icon>
                <!-- 本地SVG -->
                <el-icon v-if="item.meta.icon && item.meta.icon.indexOf(SVG_PREFIX) == 0">
                  <component is="SvgIcon" :name="item.meta.icon"></component>
                </el-icon>
                <span v-text="item.meta.title"></span>
              </template>
              <HorizontalSubMenu :menuList="item.children" />
            </el-sub-menu>
            <!-- 叶子节点（功能节点） -->
            <el-menu-item v-else :index="item.path" v-show="item.meta.isHide == '1'" @click="handleMenuIsLink(item)">
              <el-icon v-if="item.meta.icon && item.meta.icon.indexOf(SVG_PREFIX) == -1">
                <component :is="item.meta.icon"></component>
              </el-icon>
              <!-- 本地SVG -->
              <el-icon v-if="item.meta.icon && item.meta.icon.indexOf(SVG_PREFIX) == 0">
                <component is="SvgIcon" :name="item.meta.icon"></component>
              </el-icon>
              <template #title>
                <span v-text="item.meta.title"></span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </div>

      <Toolbar></Toolbar>
    </el-header>

    <el-main class="layout-main">
      <Main></Main>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { SVG_PREFIX } from "@/config/index.ts";
import settings from "@/settings.ts";
import Logo from "@/layouts/components/Logo/index.vue";
import Toolbar from "@/layouts/components/Header/components/Toolbar.vue";
import HorizontalSubMenu from "@/layouts/components/Menu/HorizontalSubMenu.vue";
import Main from "@/layouts/components/Main/index.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import useAuthStore from "@/stores/modules/auth.ts";
import useGlobalStore from "@/stores/modules/global.ts";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

console.log("横向布局左侧动态路由", authStore.showMenuList);
// 动态绑定左侧菜单animate动画
const menuAnimate = ref(settings.menuAnimate);
const menuList = computed(() => authStore.showMenuList);
/* 打开外部标签页 */
const handleMenuIsLink = (value: any) => {
  if (value.meta?.isLink) return window.open(value.meta.isLink, "_blank");
  router.push(value.path);
};
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  .layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $aside-header-height;
    overflow: hidden;
    background-color: var(--el-header-bg-color);
    .koi-menu {
      flex: 1;
    }
  }
  .layout-main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow-x: hidden;
    background-color: var(--el-bg-color);
  }
}
</style>
