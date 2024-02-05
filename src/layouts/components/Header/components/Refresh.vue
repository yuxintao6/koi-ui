<template>
  <!-- 刷新 -->
  <el-tooltip content="刷新缓存">
    <el-icon class="koi-icon m-r-18px" :size="20" @click="handleRefresh">
      <RefreshRight />
    </el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import { koiMsgSuccess } from "@/utils/koi.ts";
import { LOGIN_URL } from "@/config";
import { koiSessionStorage, koiLocalStorage } from "@/utils/storage.ts";

// 刷新本地缓存
const handleRefresh = () => {
  koiSessionStorage.clear();
  koiLocalStorage.clear();
  koiMsgSuccess("刷新本地缓存成功🌻");
  // 必须使用这个把页面缓存刷掉
  window.location.replace(LOGIN_URL);
};
</script>

<style lang="scss" scoped></style>
