<template>
  <div>
    <template v-for="item in tagOptions">
      <!-- {{ item.dictValue }} -->
      <!-- {{ item.dictColor.length }} -->
      <template v-if="item.dictColor.length == 0">
        <el-tag
          v-if="value.toString() == item.dictValue.toString()"
          :disable-transitions="true"
          :key="item.dictLabel"
          :type="item.dictTag"
          :index="new Date().getTime()"
          :effect="effect"
          :size="size"
          :style="{
            'border-color': item.dictColor,
            background: item.dictColor
          }"
        >
          {{ item.dictLabel }}
        </el-tag>
      </template>
      <template v-else>
        <el-tag
          v-if="value.toString() == item.dictValue.toString()"
          :disable-transitions="true"
          :key="item.dictLabel"
          :type="item.dictTag"
          :index="new Date().getTime()"
          effect="dark"
          :size="size"
          :style="{
            'border-color': item.dictColor,
            background: item.dictColor
          }"
        >
          {{ item.dictLabel }}
        </el-tag>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
// 定义参数的类型
interface ITagProps {
  tagOptions?: any;
  value?: any;
  size?: any;
  effect?: any;
}
// 子组件接收父组件的值
// withDefaults：设置默认值  defineProps：接收父组件的参数
// @ts-ignore
const props = withDefaults(defineProps<ITagProps>(), {
  tagOptions: [],
  value: "",
  size: "default",
  effect: "light"
});
</script>

<style lang="scss" scoped>
.el-tag {
  padding: 0 10px;
}
</style>
