<template>
  <div class="p-6px">
    <el-card class="rounded-md dark:bg-black" shadow="never" v-for="index in 20" :key="index">
      <div class="flex flex-items-center" v-waterMarker="{ text: 'YU-ADMIN', textColor: '#D9D9D9' }">
        <img class="w-60px h-60px rounded-full select-none" :src="settings.logoUrl" alt="avatar" />
        <div class="p-l-20px">
          <div class="font-bold p-b-8px whitespace-nowrap">
            <span>YU-ADMIN🌻-第{{ index }}个</span><span class="c-#409EFF" @click="handleGitee">[Gitee]</span><span>/</span
            ><span class="c-orange" @click="handleGitHub">[GitHub]</span>
          </div>
          <div class="font-bold whitespace-nowrap">燕雀安知鸿鹄之志~🌻</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import settings from "@/settings.ts";
import { getDayText } from "@/utils/random.ts";
import { koiNoticeSuccess } from "@/utils/koi.ts";
import { onMounted } from "vue";
// import authMenu from "@/assets/json/authMenu.json";
// import authUser from "@/assets/json/authUser.json";
// import authLogin from "@/assets/json/authLogin.json";
onMounted(() => {
  // 时间问候语
  koiNoticeSuccess(getDayText(), "欢迎回来~");
  // console.log("authMenu.data", authMenu.data);
  // console.log("authUser.data", authUser.data);
  // console.log("authLogin.data", authLogin.data.tokenValue);
});

// Gitee地址
const handleGitee = () => {
  window.open("https://gitee.com/BigCatHome/koi-ui", "_blank");
};

// GitHub地址
const handleGitHub = () => {
  window.open("https://github.com/yuxintao6/koi-ui", "_blank");
};
</script>

<style lang="scss" scoped></style>
