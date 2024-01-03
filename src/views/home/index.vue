<template>
  <div class="p-6px">
    <el-card class="rounded-md dark:bg-black" shadow="hover">
      <div class="flex flex-items-center" v-waterMarker="{ text: 'KOI-ADMIN', textColor: '#D9D9D9' }">
        <img class="w-60px h-60px rounded-full select-none" :src="avatar" alt="avatar" />
        <div class="p-l-20px">
          <div class="font-bold p-b-8px whitespace-nowrap">
            <span>KOI-ADMIN🌻</span><span class="c-#409EFF" @click="handleGitee">[Gitee]</span><span>/</span
            ><span class="c-orange" @click="handleGitHub">[GitHub]</span>
          </div>
          <div class="font-bold whitespace-nowrap">燕雀安知鸿鹄之志~🌻</div>
        </div>
      </div>
    </el-card>
    <KoiCard></KoiCard>
    <el-row :gutter="20" class="m-t-5px">
      <!-- 注意：如果不进行操作数组，使用index当key没有问题，若是数组会用来增删改查则不能使用index当key。 -->
      <el-col :span="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card class="rounded-md dark:bg-black" shadow="hover">
          <KoiLeftChart></KoiLeftChart>
        </el-card>
      </el-col>
      <el-col :span="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card class="rounded-md dark:bg-black" shadow="hover">
          <KoiRightChart></KoiRightChart>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="m-t-5px">
      <!-- 注意：如果不进行操作数组，使用index当key没有问题，若是数组会用来增删改查则不能使用index当key。 -->
      <el-col :span="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card class="rounded-md dark:bg-black" shadow="hover">
          <KoiTimeline1></KoiTimeline1>
        </el-card>
      </el-col>
      <el-col :span="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card class="rounded-md dark:bg-black" shadow="hover">
          <KoiTimeline2></KoiTimeline2>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { getDayText } from "@/utils/random.ts";
import { koiNoticeSuccess } from "@/utils/koi.ts";
import KoiCard from "./components/KoiCard.vue";
import KoiLeftChart from "./components/KoiLeftChart.vue";
import KoiRightChart from "./components/KoiRightChart.vue";
import KoiTimeline1 from "./components/KoiTimeline1.vue";
import KoiTimeline2 from "./components/KoiTimeline2.vue";
import { onMounted } from "vue";
onMounted(() => {
  // 时间问候语
  koiNoticeSuccess(getDayText(), "欢迎回来~");
});

// 头像
const avatar =
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fae90b4c7-98b6-4a47-b1b3-9ee8bc71acf6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692146441&t=6fca60f3a0d323869b81d8fb53b5dd1b";

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
