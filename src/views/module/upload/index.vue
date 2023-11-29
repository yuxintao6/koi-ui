<template>
  <div class="p-6px">
    <KoiUploadImage v-model:image-url="avatar1">
      <template #content>
        <el-icon><Avatar /></el-icon>
        <span>请上传头像</span>
      </template>
      <template #tip>方形组件</template>
    </KoiUploadImage>
    <br />
    <KoiUploadImage v-model:image-url="avatar2" border-radius="50%">
      <template #content>
        <el-icon><Avatar /></el-icon>
        <span>请上传头像</span>
      </template>
      <template #tip>圆形组件</template>
    </KoiUploadImage>
    <br />
    <KoiUploadImage v-model:image-url="avatar3" width="220px">
      <template #tip>长方形组件</template>
    </KoiUploadImage>
    <br />
    <KoiUploadImages v-model:file-list="fileList" :drag="false">
      <template #empty>
        <el-icon><Picture /></el-icon>
        <span>请上传照片</span>
      </template>
      <template #tip>多图片上传，图片最大为 5M（禁止拖拽上传）</template>
    </KoiUploadImages>
  </div>
</template>

<script setup lang="ts" name="uploadPage">
import { ref } from "vue";

const avatar1 = ref("https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_b.webp");
const avatar2 = ref("https://pic3.zhimg.com/v2-b6c350529f3c06c8a90d886c311f3866_b.webp");
const avatar3 = ref("https://img0.baidu.com/it/u=2703866081,3694877873&fm=253&fmt=auto&app=138&f=JPEG");
const fileList = ref([
  { name: "pictures", url: "https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_b.webp" },
  { name: "pictures", url: "https://pic3.zhimg.com/v2-b6c350529f3c06c8a90d886c311f3866_b.webp" },
  { name: "pictures", url: "https://pic2.zhimg.com/v2-44ce1b82f7e68de4078bf513221619e1_b.webp" }
]);
</script>

<style scoped></style>
