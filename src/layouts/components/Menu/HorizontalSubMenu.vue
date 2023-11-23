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
</template>

<script setup lang="ts">
import HorizontalSubMenu from "@/layouts/components/Menu/HorizontalSubMenu.vue";
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

<style lang="scss" scoped></style>
