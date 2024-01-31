<template>
  <div class="p-6px">
    <div class="w-500px flex justify-between">
      <!-- 方形示例 -->
      <KoiUploadImage v-model:imageUrl="avatar1">
        <template #content>
          <el-icon><Avatar /></el-icon>
          <span>请上传头像</span>
        </template>
        <template #tip>方形示例</template>
      </KoiUploadImage>
      <!-- 圆形示例 -->
      <KoiUploadImage v-model:imageUrl="avatar2" border-radius="50%">
        <template #content>
          <el-icon><Avatar /></el-icon>
          <span>请上传头像</span>
        </template>
        <template #tip>圆形示例</template>
      </KoiUploadImage>
      <!-- 长方形示例 -->
      <KoiUploadImage v-model:imageUrl="avatar3" width="220px">
        <template #tip>长方形示例</template>
      </KoiUploadImage>
    </div>
    <br />
    <!-- 多图片上传示例 -->
    <KoiUploadImages v-model:file-list="imageList" :drag="false">
      <template #empty>
        <el-icon><Picture /></el-icon>
        <span>请上传照片</span>
      </template>
      <template #tip>多图片上传，图片最大为 3M（禁止拖拽上传）</template>
    </KoiUploadImages>
    <br />
    <div class="w-200px flex justify-between">
      <!-- 导出按钮 -->
      <el-button type="primary" icon="Download" plain @click="handleDownload">导出</el-button>
      <!-- 导入组件 -->
      <el-button type="info" icon="Upload" plain @click="handleImportExcel">导入</el-button>
      <KoiExcel ref="koiExcelRef" @handleTemplateExcel="handleTemplateExcel"></KoiExcel>
    </div>
    <br />
    <!-- 上传图库 -->
    <KoiImage>
      <template #content>
        <div class="c-[--el-color-primary] flex flex-col items-center">
          <el-icon :size="30"><Avatar /></el-icon>
          <span class="text-12px m-t-4px">请上传头像</span>
        </div>
      </template>
      <template #tip>多图片上传，图片最大为 3M（禁止拖拽上传）</template>
    </KoiImage>
    <br />
    <!-- 上传图库 -->
    <KoiImage>
      <template #tip>多图片上传，图片最大为 3M（禁止拖拽上传）</template>
    </KoiImage>
  </div>
</template>

<script setup lang="ts" name="uploadPage">
import { ref } from "vue";

const avatar1 = ref("https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_b.webp");
const avatar2 = ref("https://pic3.zhimg.com/v2-b6c350529f3c06c8a90d886c311f3866_b.webp");
const avatar3 = ref("https://img0.baidu.com/it/u=2703866081,3694877873&fm=253&fmt=auto&app=138&f=JPEG");
const imageList = ref([
  { name: "picture1", url: "https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_b.webp" },
  { name: "picture2", url: "https://pic3.zhimg.com/v2-b6c350529f3c06c8a90d886c311f3866_b.webp" },
  { name: "picture3", url: "https://pic2.zhimg.com/v2-44ce1b82f7e68de4078bf513221619e1_b.webp" }
]);

/** 下载/导出 */
const handleDownload = () => {
  window.location.href = import.meta.env.VITE_SERVER + "/excelTemplate";
};

/** Excel组件 */
const koiExcelRef = ref();
/** 下载模板 */
const handleTemplateExcel = () => {
  window.location.href = import.meta.env.VITE_SERVER + "/excelTemplate";
};
/** 导入 */
const handleImportExcel = () => {
  let params = {
    title: "导入数据",
    templeApi: import.meta.env.VITE_SERVER + "/excelTemplate",
    importApi: "/excelImport"
  };
  koiExcelRef.value.excelParams(params);
};
</script>

<style scoped></style>
