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
      <ColumnSubMenu :menuList="item.children" />
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
import ColumnSubMenu from "@/layouts/components/Menu/ColumnSubMenu.vue";
import { SVG_PREFIX } from "@/config/index.ts";
import { useRouter } from "vue-router";
const router = useRouter();
// 获取父组件传递过来的数据
defineProps(["menuList"]);
/* 打开外部标签页 */
const handleMenuIsLink = (value: any) => {
  if (value.meta?.isLink) return window.open(value.meta.isLink, "_blank");
  router.push(value.path);
};
</script>

<style lang="scss" scoped>
.el-menu-item {
  height: $aside-menu-height !important;
  margin-bottom: $aside-menu-margin-bottom;
  font-weight: $aside-menu-font-weight;
  color: #000000;

  /* 设置用户禁止选中 */
  user-select: none;
  border-radius: $aside-menu-border-left;

  @apply dark:c-#E5E3FA;
  i {
    transform: translate($aside-menu-font-icon-translate); // 图标偏移
  }
  span {
    transform: translate($aside-menu-font-icon-translate); // 文字偏移
  }

  // 设置鼠标悬停时el-menu-item的样式
  &:hover {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-8);

    // & 含义 .el-menu-item
    border-radius: $aside-menu-border-left;

    // 实现鼠标悬停时icon变色
    i {
      color: var(--el-color-primary);
    }
  }

  // 设置选中el-menu-item时的样式
  &.is-active {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-8);
  }
}

// 子节点
:deep(.el-sub-menu__title) {
  height: $aside-menu-height;
  padding-right: 0; // 去除collapse缩小多余的边框
  margin-bottom: $aside-menu-margin-bottom;
  font-weight: $aside-menu-font-weight;
  color: #000000;

  /* 设置用户禁止选中 */
  user-select: none;
  border-radius: $aside-menu-border-left;

  @apply dark:c-#E5E3FA;
  i {
    transform: translate($aside-menu-font-icon-translate); // 图标偏移
  }
  span {
    transform: translate($aside-menu-font-icon-translate); // 文字偏移
  }
  &:hover {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-8);
  }
  &:active {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-8);
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
