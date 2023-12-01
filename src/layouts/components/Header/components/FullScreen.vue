<template>
  <!-- 全屏 -->
  <el-tooltip :content="globalStore.isFullScreen === false ? '全屏' : '关闭全屏'">
    <el-icon class="koi-icon m-r-18px" :size="18" @click="toggle">
      <FullScreen v-if="!globalStore.isFullScreen" />
      <CloseBold v-else />
    </el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
import { watch } from "vue";
import useGlobalStore from "@/stores/modules/global.ts";

const globalStore = useGlobalStore();
// @vueuse/core 处理是否全屏
const { isFullscreen, toggle } = useFullscreen();
watch(isFullscreen, () => {
  if (isFullscreen.value) {
    globalStore.setGlobalState("isFullScreen", true);
  } else {
    globalStore.setGlobalState("isFullScreen", false);
  }
});
</script>

<style lang="scss" scoped></style>
