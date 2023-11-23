<template>
  <!-- 分栏布局 -->
  <el-container class="layout-container">
    <div class="layout-column">
      <el-scrollbar>
        <div
          v-for="item in menuList"
          :key="item.path"
          class="left-column"
          :class="{
            'is-active': columnActive === item.path || `/${columnActive.split('/')[1]}` === item.path
          }"
          @click="handleSubMenu(item)"
        >
          <el-icon v-if="item.meta.icon && item.meta.icon.indexOf(SVG_PREFIX) == -1">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <!-- 本地SVG -->
          <el-icon v-if="item.meta.icon && item.meta.icon.indexOf(SVG_PREFIX) == 0">
            <component is="SvgIcon" :name="item.meta.icon"></component>
          </el-icon>
          <span class="title">{{ item.meta.title }}</span>
        </div>
      </el-scrollbar>
    </div>
    <el-aside
      class="layout-aside transition-all"
      :style="{ width: !globalStore.isCollapse ? globalStore.menuWidth + 'px' : settings.columnMenuCollapseWidth }"
      v-if="subMenuList.length != 0"
    >
      <Logo :isCollapse="globalStore.isCollapse" :layout="globalStore.layout"></Logo>
      <el-scrollbar class="layout-scrollbar">
        <!-- :unique-opened="true" 子菜单不能同时展开 -->
        <el-menu
          :default-active="route.path"
          :collapse="globalStore.isCollapse"
          :collapse-transition="false"
          :uniqueOpened="globalStore.uniqueOpened"
          :router="false"
          :class="menuAnimate"
        >
          <ColumnSubMenu :menuList="subMenuList"></ColumnSubMenu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <Header></Header>
      </el-header>
      <el-main class="layout-main">
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import settings from "@/settings.ts";
import { SVG_PREFIX } from "@/config/index.ts";
import Logo from "@/layouts/components/Logo/index.vue";
import Header from "@/layouts/components/Header/index.vue";
import ColumnSubMenu from "@/layouts/components/Menu/ColumnSubMenu.vue";
import Main from "@/layouts/components/Main/index.vue";
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useAuthStore from "@/stores/modules/auth.ts";
import useGlobalStore from "@/stores/modules/global.ts";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

console.log("双栏布局左侧动态路由", authStore.showMenuList);
// 动态绑定左侧菜单animate动画
const menuAnimate = ref(settings.menuAnimate);
const menuList = computed(() => authStore.showMenuList);

const menuHoverCollapse = ref(settings.columnMenuHoverCollapse);

const columnActive = ref("");
const subMenuList = ref([]);

const menuBLSColor = ref(globalStore.menuBLSColor);
// 切换明亮和暗黑主题开关监听
watch(
  () => globalStore.isDark,
  () => {
    menuBLSColor.value = globalStore.setMenuBLSColor();
  },
  {
    deep: true,
    immediate: true
  }
);
onMounted(() => {
  menuBLSColor.value = globalStore.setMenuBLSColor();
});

watch(
  () => [menuList, route],
  () => {
    // 当前菜单没有数据直接 return
    if (!menuList.value.length) return;
    columnActive.value = route.path;
    const menuItem = menuList.value.filter((item: any) => {
      // 刷新浏览器，一级路由就会变成点击的二级路由，所以需要加上`/${route.path.split("/")[1]}` 进行获取，否则就没有默认选中的颜色。
      return route.path === item.path || `/${route.path.split("/")[1]}` === item.path;
    });
    // 若获取的路由没有子菜单，则赋值为空。
    if (!menuItem[0].children?.length) return (subMenuList.value = []);
    // 若有子菜单则赋值给子菜单变量。
    subMenuList.value = menuItem[0].children;
  },
  {
    deep: true,
    immediate: true
  }
);

// 点击加载子菜单数据
const handleSubMenu = (item: any) => {
  columnActive.value = item.path;
  if (item.children?.length) {
    // 该一级菜单，若是有子菜单，就会给第二个分栏菜单赋值。
    // router.push(item.path); // 加这个，点击最左侧菜单会重定向第一个子菜单。
    subMenuList.value = item.children;
    return;
  }
  // 若是没有子菜单，则给子菜单变量赋值为空，并且跳转路由。例如：首页。
  subMenuList.value = [];
  router.push(item.path);
};
</script>

<style lang="scss" scoped>
// 第一列样式
.layout-column {
  display: flex;
  flex-direction: column;
  height: 100%;
  user-select: none;
  box-shadow: $column-menu-box-shadow; // 双栏最左侧右边框阴影
  background-color: var(--el-menu-bg-color); // 用来做色弱模式
  .left-column {
    display: flex;
    width: 70px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    margin: $aside-menu-padding-left;
    border: v-bind(menuBLSColor) solid 2px;
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary);
      border: 2px dashed var(--el-color-primary);
      border-radius: 4px;
      background: var(--el-color-primary-light-9);
    }

    &.is-active {
      color: var(--el-color-primary);
      border: 2px dashed var(--el-color-primary);
      border-radius: 4px;
      background: var(--el-color-primary-light-8);
    }

    .el-icon {
      font-size: 18px;
    }

    .title {
      margin-top: 8px;
      font-size: 12px;
      font-weight: $aside-menu-font-weight;
      letter-spacing: 2px;
      text-align: center;
      line-height: 14px;
    }
  }
}

.layout-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .layout-aside {
    border-right: none;
    padding-left: $column-menu-padding-left; // 左侧布局左边距（用于悬浮和选中更明显）
    padding-right: $column-menu-padding-right; // 左侧布局右边距（用于悬浮和选中更明显）
    box-shadow: $aside-menu-box-shadow; // 双栏左侧布局菜单右边框阴影
    z-index: $layout-aside-z-index; // 左侧菜单层级
    background-color: var(--el-menu-bg-color);
  }

  .layout-header {
    height: $aside-header-height;
    background-color: var(--el-header-bg-color);
  }

  .layout-main {
    padding: 0px;
    box-sizing: border-box;
    overflow-x: hidden;
    background-color: var(--el-bg-color);
  }
}

.layout-scrollbar {
  width: 100%;
  height: calc(100vh - $aside-header-height);
}
// 去除菜单右侧边框
.el-menu {
  border-right: none;
}
</style>

<style lang="scss">
/** 菜单悬浮折叠宽度 */
.el-menu--collapse {
  width: v-bind(menuHoverCollapse) !important;
}
</style>
