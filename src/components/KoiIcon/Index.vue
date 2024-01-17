<template>
  <div class="icon-select">
    <el-input
      v-model="iconName"
      clearable
      style="width: 500px"
      placeholder="请选择图标名称"
      @click="handleOpenDialog"
      @clear="filterIcons"
      @input="filterIcons"
    >
      <template #prepend>
        <el-icon :size="18" v-if="iconName && iconType == '1'">
          <component :is="iconName" />
        </el-icon>
        <SvgIcon v-if="iconName && iconType == '2'" :name="iconName" />
      </template>

      <template #append>
        <el-select v-model="iconType" placeholder="选择图标类型" style="width: 136px">
          <el-option label="ElementPlus" value="1" @click="handleIconType('1')" />
          <el-option label="IconFont" value="2" @click="handleIconType('2')" />
        </el-select>
      </template>
    </el-input>
    <KoiDrawer ref="koiDrawerRef" title="添加图标" :footerHidden="true" :closeOnClickModel="true">
      <template #content>
        <el-input
          v-model="iconName"
          style="width: 410px; margin-bottom: 10px"
          placeholder="请输入图标名称"
          @clear="filterIcons"
          @input="filterIcons"
        >
          <template #prepend>
            <el-icon :size="18" v-if="iconName && iconType == '1'">
              <component :is="iconName" />
            </el-icon>
            <SvgIcon v-if="iconName && iconType == '2'" :name="iconName" />
          </template>

          <template #append>
            <el-select v-model="iconType" placeholder="选择图标类型" style="width: 136px">
              <el-option label="ElementPlus" value="1" @click="handleIconType('1')" />
              <el-option label="IconFont" value="2" @click="handleIconType('2')" />
            </el-select>
          </template>
        </el-input>
        <!-- ElementPlus图标库 -->
        <div class="icon-select-list" v-if="iconType == '1'">
          <div
            class="flex items-center icon-div"
            v-for="(item, index) in elementPlusIconList"
            :class="selectedIndex === index ? 'is-active' : ''"
            :key="index"
            @click="handleSelectIcon(item, index)"
          >
            <el-icon style="width: 16px; height: 30px; margin-right: 5px">
              <component :is="item" />
            </el-icon>
            <span class="icon-span">{{ item }}</span>
          </div>
        </div>

        <!-- 阿里巴巴图标库 -->
        <div class="icon-select-list" v-if="iconType == '2'">
          <div
            class="flex items-center icon-div truncate"
            v-for="(item, index) in iconFontList"
            :class="selectedIndex === index ? 'is-active' : ''"
            :key="index"
            @click="handleSelectIcon(item, index)"
          >
            <SvgIcon :name="item" style="width: 16px; height: 30px; margin-right: 5px" />
            <span class="icon-span">{{ item }}</span>
          </div>
        </div>
      </template>
    </KoiDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// 引入ElementPlus所有图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const icons = [] as string[];
const modules = import.meta.glob("../../assets/icons/*.svg");
// 获取本地所有图标
for (const path in modules) {
  const icon = path.split("assets/icons/")[1].split(".svg")[0];
  icons.push(icon);
}
// iconFont阿里巴巴图标库
const iconFontList = ref(icons);
// ElementPlus图标库
const elementPlusIconList = ref<any>([]);
// 获取ElementPlus所有图标
const getElementPlusIcon = () => {
  for (const name in ElementPlusIconsVue) {
    elementPlusIconList.value.push(name);
  }
};
// 原始数据备份
const originalElementPlusIconList = ref<any[]>([]);
const originalIconFontList = ref<string[]>([]);
onMounted(() => {
  getElementPlusIcon();
  // 备份原始数据
  originalElementPlusIconList.value = [...elementPlusIconList.value];
  originalIconFontList.value = [...iconFontList.value];
});
// 图标选择类型
const iconType = ref("1");
// 搜索iconName名字
const iconName = ref("Aim");

const emit = defineEmits(["selected"]);

// 模糊搜索过滤数据
const filterIcons = () => {
  // 重置数据时恢复原始数据
  if (!iconName.value) {
    resetDefaultIcon();
    return;
  }

  // 根据备份数据进行过滤
  if (iconType.value === "1") {
    elementPlusIconList.value = originalElementPlusIconList.value.filter((item: string) => item.includes(iconName.value));
  } else if (iconType.value === "2") {
    iconFontList.value = originalIconFontList.value.filter((item: string) => item.includes(iconName.value));
  }
};

// 选中颜色
const selectedIndex = ref<string | number>(1);

// 被选中图标数据
const handleSelectIcon = (name?: any, index?: any) => {
  emit("selected", name);
  selectedIndex.value = index;
  iconName.value = name;
  document.body.click();
};

const koiDrawerRef = ref();
const handleOpenDialog = () => {
  koiDrawerRef.value.koiOpen();
};

// 重置数据
const resetDefaultIcon = () => {
  // 重置IconFont数据
  iconFontList.value = icons;
  // 重置ElementPlus数据
  getElementPlusIcon();
  selectedIndex.value = "";
  iconName.value = "";
};

/**
 * 重置数据如何使用？代码如下：
   setTimeout(() => {
    koiIconRef.value.resetIcon();
   }, 0);
 */
// 重置默认选择数据（外部使用）
const resetIcon = () => {
  // 重置IconFont数据
  iconFontList.value = icons;
  // 重置ElementPlus数据
  getElementPlusIcon();
  selectedIndex.value = 1;
  iconType.value = "1";
  iconName.value = "Aim";
};

// 选择图标类型
const handleIconType = (value?: any) => {
  console.log("选择图标类型", value);
  resetDefaultIcon();
};

/**
 * 回显数据如何使用？代码如下：
  setTimeout(() => {
    koiIconRef.value.echoIcon("Apple");
  }, 0);
 */

// 回显数据
const echoIcon = (icon?: any) => {
  console.log("回显icon组件", icon);
  handleIconType("1");
  if (icon && icon.indexOf("koi-") == -1) {
    iconType.value = "1";
    iconName.value = icon;
    // console.log("ElementPlus")
    const index = elementPlusIconList.value.indexOf(icon);
    if (index != -1) {
      elementPlusIconList.value = elementPlusIconList.value.filter((item: any) => item != icon); // 从数组中移除符合条件的对象
      elementPlusIconList.value.unshift(icon); // 将符合条件的插入到数组的第一个位置
      selectedIndex.value = 0;
    }
  } else if (icon && icon.indexOf("koi-") == 0) {
    iconType.value = "2";
    iconName.value = icon;
    const index = iconFontList.value.indexOf(icon);
    if (index != -1) {
      iconFontList.value = iconFontList.value.filter(item => item != icon); // 从数组中移除符合条件的对象
      iconFontList.value.unshift(icon); // 将符合条件的插入到数组的第一个位置
      selectedIndex.value = 0;
    }
  } else {
    iconType.value = "1";
    iconName.value = "";
    selectedIndex.value = "";
  }
};

// 暴露给父组件方法
defineExpose({
  resetIcon,
  echoIcon
});
</script>

<style lang="scss" scoped>
.icon-select {
  width: 100%;
  padding: 0;
  margin: 0;
  @apply select-none;
  .icon-select-list {
    height: 94%;
    overflow: hidden scroll;
    .icon-div {
      float: left;
      width: 28.5%;
      height: 20px;
      padding: 5px;
      margin: 2px;
      font-size: 14px;
      line-height: 20px;
      color: #505052;
      cursor: pointer;
      border: 2px dashed #9c9c9d;
      border-radius: 6px;

      @apply dark:border-#93b5cf;
      @apply dark:color-#93b5cf;
      &.is-active {
        @apply dark:color-[--el-color-primary];
      }
    }

    // 根据数组index改变选中颜色
    .is-active {
      color: var(--el-color-primary);
      border-color: var(--el-color-primary);

      @apply dark:border-[--el-color-primary];
    }
    .icon-span {
      overflow: hidden;
    }
  }
}
</style>
