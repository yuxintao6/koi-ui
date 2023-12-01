<template>
  <div class="p-6px">
    <el-alert
      title="引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于 driver.js, pnpm install driver.js"
      type="warning"
      :closable="false"
    />
    <div id="one">
      <el-button type="primary">第一步</el-button>
    </div>
    <br />
    <div id="two">
      <el-button type="warning">第二步</el-button>
    </div>
    <br />
    <div id="three">
      <el-button type="danger">第三步</el-button>
    </div>
    <br />
    <div>
      <el-button type="primary" @click.prevent.stop="driverObj.drive()"> 打开引导页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="driverPage">
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// 根据div的ID进行配置
const driverObj = driver({
  allowClose: true,
  doneBtnText: "结束",
  nextBtnText: "下一步",
  prevBtnText: "上一步",
  steps: [
    {
      element: "#one",
      popover: {
        title: "第一步",
        description: "第一步引导",
        side: "right"
      }
    },
    {
      element: "#two",
      popover: {
        title: "第二步",
        description: "第二步引导",
        side: "right"
      }
    },
    {
      element: "#three",
      popover: {
        title: "第三步",
        description: "第三步引导",
        side: "left"
      }
    }
  ]
});
</script>

<style scoped lang="scss"></style>
