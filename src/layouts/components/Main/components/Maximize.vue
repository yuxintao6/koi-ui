<template>
  <div class="maximize" @click="handleExitMaximize">
    <el-icon :size="22" class="exitIcon"><CloseBold /></el-icon>
  </div>
</template>

<script setup lang="ts">
import useGlobalStore from "@/stores/modules/global.ts";

const globalStore = useGlobalStore();

const handleExitMaximize = () => {
  globalStore.setGlobalState("maximize", false);
};
</script>

<style lang="scss" scoped>
.maximize {
  position: fixed;
  top: -25px;
  right: -25px;
  z-index: 999;
  width: 66px;
  height: 66px;
  cursor: pointer;
  background-color: var(--el-color-primary-light-8);
  border: 2px dashed var(--el-color-primary);
  border-radius: 50%;
  opacity: 0.9;
  &:hover {
    background-color: var(--el-color-primary-light-7);
  }
  .exitIcon {
    position: relative;
    top: 46%;
    left: 19%;
    color: var(--el-color-primary);
  }
}
</style>
