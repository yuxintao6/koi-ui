<template>
  <div class="p-6px">
    <SvgIcon name="koi-mobile-menu" width="50px" height="50px"></SvgIcon>
    <br />
    <el-input v-model="data" placeholder="请输入内容" style="width: 300px">
      <template #append>
        <el-button v-copy="data">复制</el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts" name="svgIconPage">
import { ref } from "vue";

const data = ref<string>("主人，妲己永远陪在你身边👻");
</script>

<style scoped></style>
