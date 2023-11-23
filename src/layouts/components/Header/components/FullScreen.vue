<template>
  <!-- 全屏 -->
  <el-tooltip :content="isFullscreen === false ? '全屏' : '关闭全屏'">
    <el-icon class="koi-icon m-r-18px" :size="18" @click="toggle">
      <FullScreen v-if="!isFullscreen" />
      <CloseBold v-else />
    </el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
// @vueuse/core 处理是否全屏
const { isFullscreen, toggle } = useFullscreen();
</script>

<style lang="scss" scoped></style>
