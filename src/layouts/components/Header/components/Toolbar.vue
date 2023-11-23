<template>
  <div class="header-right">
    <!-- 搜索菜单 -->
    <SearchMenu></SearchMenu>
    <!-- ElementPlus 尺寸配置 -->
    <Dimension></Dimension>
    <!-- 路由缓存刷新 -->
    <Refresh></Refresh>
    <!-- 明亮/暗黑模式图标 -->
    <Dark></Dark>
    <!-- 中英文翻译 -->
    <Language></Language>
    <!-- 全屏图标 -->
    <FullScreen></FullScreen>
    <!-- 主题配置 -->
    <ThemeSetting></ThemeSetting>
    <!-- 头像 AND 下拉折叠 -->
    <User></User>
  </div>
</template>

<script setup lang="ts">
import User from "@/layouts/components/Header/components/User.vue";
import FullScreen from "@/layouts/components/Header/components/FullScreen.vue";
import Dark from "@/layouts/components/Header/components/Dark.vue";
import ThemeSetting from "@/layouts/components/Header/components/ThemeSetting.vue";
import Refresh from "@/layouts/components/Header/components/Refresh.vue";
import Dimension from "@/layouts/components/Header/components/Dimension.vue";
import Language from "@/layouts/components/Header/components/Language.vue";
import SearchMenu from "@/layouts/components/Header/components/SearchMenu.vue";
</script>

<style lang="scss" scoped>
.header-right {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
