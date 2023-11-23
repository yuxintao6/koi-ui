<template>
  <div class="p-6px">
    <span>MENU1</span>
    <el-input v-model="value" placeholder="测试缓存MENU1"></el-input>
  </div>
</template>

<script setup lang="ts" name="menu1Page">
import { ref } from "vue";
const value = ref<string>("");
// defineOptions({
//   name: "menu1Page"
// });
</script>
