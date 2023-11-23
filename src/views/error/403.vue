<template>
  <div id="box">
    <div class="koi-top" id="banner"></div>
    <div class="koi-bottom">
      <div class="koi-text1">403</div>
      <div class="koi-text2">对不起，您没有权限访问👻</div>
      <br />
      <el-button type="primary" plain @click="handleHomePage">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config/index.ts";

// 路由跳转
const router = useRouter();
const handleHomePage = () => {
  router.push({ path: HOME_URL });
};
</script>

<style lang="scss" scoped>
#box {
  overflow: hidden;
}

#banner {
  background: url("@/assets/images/error/403.png") no-repeat;
  background-size: 100%;
  margin-top: 60px;
}

.koi-top {
  width: 600px;
  height: 500px;
  margin: 0 auto;
}

.koi-bottom {
  text-align: center;
  margin-top: 20px;
  height: 300px;
}

.koi-text1 {
  font-size: 46px;
  font-weight: bold;
}

.koi-text2 {
  padding-top: 30px;
  font-size: 24px;
  font-family: "YouYuan";
  font-weight: 600;
}
</style>
