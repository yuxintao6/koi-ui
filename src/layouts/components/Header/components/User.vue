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
        <el-dropdown-item command="password">修改密码</el-dropdown-item>
        <el-dropdown-item command="koiUser">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!-- 修改密码 -->
  <!-- <KoiDrawer ref="passwordDrawerRef" title="修改密码" @koiConfirm="koiConfirm" @koiCancel="koiCancel">
    <template #content>
      <el-form ref="passwordFormRef" :rules="rules" label-width="100px" :model="passwordForm" status-icon>
        <el-form-item prop="oldPassword" label="旧密码：">
          <el-input v-model="passwordForm.oldPassword" type="password" show-password />
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码：">
          <el-input v-model="passwordForm.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码：">
          <el-input v-model="passwordForm.confirmPassword" type="password" show-password />
        </el-form-item>
      </el-form>
    </template>
  </KoiDrawer> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import settings from "@/settings.ts";
import { koiSessionStorage } from "@/utils/storage.ts";
import { LOGIN_URL } from "@/config";

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
const avatar = ref(settings.logoUrl);
// 下拉折叠
const handleCommand = (command: string | number) => {
  switch (command) {
    case "password":
      // openKoiDrawer();
      alert("修改密码");
      break;
    case "koiUser":
      alert("个人中心");
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
