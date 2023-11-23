<template>
  <el-config-provider :size="dimension">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { getBrowserLang } from "@/utils/index.ts";
import { useTheme } from "@/utils/theme.ts";
import useGlobalStore from "@/stores/modules/global.ts";
const globalStore = useGlobalStore();

const dimension = computed(() => globalStore.dimension);
const { initThemeConfig } = useTheme();

// 初始化语言
const i18n = useI18n();
onMounted(() => {
  const language = globalStore.language ?? getBrowserLang();
  i18n.locale.value = language;
  globalStore.setGlobalState("language", language);
});

// 初始化主题配置
initThemeConfig();
</script>

<style scoped></style>
