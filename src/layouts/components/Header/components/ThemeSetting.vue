<template>
  <!-- 设置 -->
  <el-tooltip content="主题配置">
    <el-icon class="koi-icon m-r-18px" :size="20" @click="handleThemeDialog">
      <Setting />
    </el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import mittBus from "@/utils/mittBus.ts";
// 打开主题配置
const handleThemeDialog = () => {
  mittBus.emit("handleThemeConfig");
};
</script>

<style lang="scss" scoped></style>
