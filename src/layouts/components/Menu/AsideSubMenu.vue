<template>
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
      <AsideSubMenu :menuList="item.children" />
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
</template>

<script setup lang="ts">
import AsideSubMenu from "@/layouts/components/Menu/AsideSubMenu.vue";
import { watch, onMounted } from "vue";
import { SVG_PREFIX } from "@/config/index.ts";
import useGlobalStore from "@/stores/modules/global.ts";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const globalStore = useGlobalStore();
const { menuBLSColor } = storeToRefs(globalStore);
// 获取父组件传递过来的数据
defineProps(["menuList"]);

// 切换明亮和暗黑主题开关监听
watch(
  () => globalStore.isDark,
  () => {
    menuBLSColor.value = globalStore.setMenuBLSColor();
  }
);
onMounted(() => {
  menuBLSColor.value = globalStore.setMenuBLSColor();
});
/* 打开外部标签页 */
const handleMenuIsLink = (value: any) => {
  if (value.meta.isLink) return window.open(value.meta.isLink, "_blank");
  router.push(value.path);
};
</script>

<style lang="scss" scoped>
/** el-menu鼠标悬停和点击代码 */
/** 第一级父节点下拉框里面悬停和点击 */
/* .el-menu-item::before {
  border-left: $aside-menu-border-left solid v-bind(menuBLSColor);
} */

.el-menu-item {
  color: #000000;
  @apply dark:c-#E5E3FA;
  /* 设置用户禁止选中 */
  user-select: none;
  height: $aside-menu-height !important;
  font-weight: $aside-menu-font-weight;
  border-radius: $aside-menu-border-left;
  margin-bottom: $aside-menu-margin-bottom;
  border-left: $aside-menu-border-left solid v-bind(menuBLSColor);
  i {
    transform: translate($aside-menu-font-icon-translate); // 图标偏移
  }

  span {
    transform: translate($aside-menu-font-icon-translate); // 文字偏移
  }

  // 设置鼠标悬停时el-menu-item的样式
  &:hover {
    // & 含义 .el-menu-item
    border-radius: $aside-menu-border-left;
    background: var(--el-color-primary-light-8);
    color: var(--el-color-primary);
    border-left: $aside-menu-border-left solid var(--el-color-primary);

    // 实现鼠标悬停时icon变色
    i {
      color: var(--el-color-primary);
    }
  }

  // 设置选中el-menu-item时的样式
  &.is-active {
    background: var(--el-color-primary-light-8);
    color: var(--el-color-primary);
    border-left: $aside-menu-border-left solid var(--el-color-primary);
  }
}

// 子节点
:deep(.el-sub-menu__title) {
  color: #000000;
  @apply dark:c-#E5E3FA;
  /* 设置用户禁止选中 */
  user-select: none;
  height: $aside-menu-height;
  font-weight: $aside-menu-font-weight;
  border-radius: $aside-menu-border-left;
  margin-bottom: $aside-menu-margin-bottom;
  border-left: $aside-menu-border-left solid v-bind(menuBLSColor);
  padding-right: 0px; // 去除collapse缩小多余的边框

  i {
    transform: translate($aside-menu-font-icon-translate); // 图标偏移
  }

  span {
    transform: translate($aside-menu-font-icon-translate); // 文字偏移
  }

  &:hover {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-8);
    border-left: $aside-menu-border-left solid var(--el-color-primary);
  }

  &:active {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-8);
    border-left: $aside-menu-border-left solid var(--el-color-primary);
  }
}
</style>

<style lang="scss">
/* 子级菜单字体高亮，父级菜单也高亮 */
.el-sub-menu.is-active > .el-sub-menu__title {
  color: var(--el-color-primary) !important;
}

/* icon图标也跟着变 */
.el-sub-menu.is-active > .el-sub-menu__title i {
  color: var(--el-color-primary) !important;
}
</style>
