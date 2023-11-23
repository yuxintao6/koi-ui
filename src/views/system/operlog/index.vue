<template>
  <div class="p-6px">
    操作日志
    <KoiIcon ref="koiIconRef" @selected="handleSelectIcon"></KoiIcon>
  </div>
</template>

<script lang="ts" setup name="operlogPage">
import { ref } from "vue";
const koiIconRef = ref();
const handleSelectIcon = (name?: string) => {
  alert(name);
};
</script>

<style lang="scss" scoped></style>
