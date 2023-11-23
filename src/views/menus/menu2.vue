<template>
  <div class="p-6px">
    <span>MENU2</span>
    <el-input v-model="value" placeholder="测试缓存MENU2"></el-input>
  </div>
</template>

<script setup lang="ts" name="menu3Page">
import { ref } from "vue";
const value = ref<string>("");
</script>
