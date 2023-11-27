<template>
  <el-icon class="collapse-icon koi-icon" :size="20" @click="changeCollapseIcon">
    <SvgIcon name="koi-menu-left" width="20px" height="20px" v-if="!globalStore.isCollapse"></SvgIcon>
    <SvgIcon name="koi-menu-right" width="20px" height="20px" v-if="globalStore.isCollapse"></SvgIcon>
    <!-- <component :is="globalStore.isCollapse ? 'Expand' : 'Fold'"></component> -->
  </el-icon>
</template>

<script setup lang="ts">
import useGlobalStore from "@/stores/modules/global.ts";
const globalStore = useGlobalStore();
// 切换图标
const changeCollapseIcon = () => {
  // 定义图标切换变量(true-折叠，false-展开)
  globalStore.isCollapse = globalStore.setCollapse(globalStore.isCollapse);
};
</script>

<style lang="scss" scoped></style>
