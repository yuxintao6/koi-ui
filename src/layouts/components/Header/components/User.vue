<template>
  <!-- 头像 -->
  <img class="w-34px h-34px rounded-full select-none" :src="avatar" alt="avatar" />
  <el-dropdown class="m-l-10px" :hide-on-click="false" @command="handleCommand">
    <div class="koi-dropdown">
      王将(管理员)
      <el-icon><arrow-down /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="koiMine">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { koiSessionStorage } from "@/utils/storage.ts";
import { LOGIN_URL } from "@/config";
import { useRouter } from "vue-router";

const router = useRouter();

// 退出登录
const handleLayout = () => {
  koiSessionStorage.remove("user");
  koiSessionStorage.remove("tabs");
  koiSessionStorage.remove("global");
  koiSessionStorage.remove("auth");
  // 必须使用这个把页面缓存刷掉
  window.location.replace(LOGIN_URL);
};
// 用户头像
const avatar = ref(
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fae90b4c7-98b6-4a47-b1b3-9ee8bc71acf6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692146441&t=6fca60f3a0d323869b81d8fb53b5dd1b"
);
// 下拉折叠
const handleCommand = (command: string | number) => {
  switch (command) {
    case "koiMine":
      router.push("/system/personage");
      break;
    case "logout":
      handleLayout();
      break;
  }
};
</script>

<style lang="scss" scoped>
// dropdown字体颜色
.koi-dropdown {
  color: var(--el-color-primary);
  white-space: nowrap; /* 不换行 */
  cursor: pointer;
  outline: none; // 去除伪元素
}
</style>
