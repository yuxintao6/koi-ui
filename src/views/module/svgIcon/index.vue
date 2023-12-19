<template>
  <div class="p-6px">
    <SvgIcon name="koi-mobile-menu" width="50px" height="50px"></SvgIcon>
    <br />
    <el-input v-model="copyData" placeholder="请输入内容" style="width: 300px">
      <template #append>
        <el-button @click="handleCopy">复制</el-button>
      </template>
    </el-input>
    <br />
    <br />
    <KoiIcon ref="koiIconRef" @selected="handleSelectIcon"></KoiIcon>
    <br />
    <el-button type="primary" plain @click="handleEchoIcon">回显图标</el-button>
    <el-button type="danger" plain @click="handleResetIcon">重置图标</el-button>
    <br />
    <br />
    <KoiTag :tagOptions="koiDicts.sys_notice_type" :value="tagValue"></KoiTag>
  </div>
</template>

<script setup lang="ts" name="svgIconPage">
import { ref } from "vue";
import { koiMsgSuccess, koiMsgWarning, koiMsgError } from "@/utils/koi";

/** 第二种字典获取数据开始 */
import { useKoiDict } from "@/hooks/dicts/index.ts";
// 每次进入页面一次获取所需要的数据源
let { koiDicts } = useKoiDict(["sys_notice_type", "sys_user_sex"]);
const tagValue = ref("1");
/** 第二种字典获取数据结束 */

/** 复制指令开始 */
import { useClipboard } from "@vueuse/core";
const { copy, isSupported } = useClipboard();

const copyData = ref<string>("主人，妲己永远陪在你身边👻");

const handleCopy = () => {
  if (!isSupported) {
    koiMsgError("您的浏览器不支持Clipboard API🌻");
    return;
  }
  if (!copyData.value) {
    koiMsgWarning("请输入要复制的内容🌻");
    return;
  }
  copy(copyData.value);
  koiMsgSuccess(`复制成功：${copyData.value}`);
};
/** 复制指令结束 */

/** 图标选择器开始 */
const koiIconRef = ref();
const handleSelectIcon = (value?: any) => {
  koiMsgSuccess(value);
};
const handleResetIcon = () => {
  // 重置数据
  setTimeout(() => {
    koiIconRef.value.resetIcon();
  }, 0);
};
const handleEchoIcon = () => {
  // 回显数据
  setTimeout(() => {
    koiIconRef.value.echoIcon("Apple");
  }, 0);
};
/** 图标选择器结束 */
</script>

<style scoped></style>
