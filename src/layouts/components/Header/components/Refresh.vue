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
import useRefreshStore from "@/stores/modules/refresh.ts";

const refreshStore = useRefreshStore();
// 刷新路由
const handleRefresh = () => {
  refreshStore.refresh = !refreshStore.refresh;
  koiMsgSuccess("刷新所有路由页面缓存成功🌻");
};
</script>

<style lang="scss" scoped></style>
