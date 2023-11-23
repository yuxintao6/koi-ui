<template>
  <!-- 主题配置 608 -->
  <KoiDialog ref="koiDialogRef" title="主题配置" :footerHidden="true" :close-on-click-modal="true" top="6vh" :height="560">
    <template #content>
      <el-row>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <div
            class="shadow-sm border-#93b5cf dark:border-#1887F9 sm:hover:border-#1887F9 transition-all duration-300 border-dashed border-2 rounded-lg cursor-pointer text-sm w-301px h-62px flex flex-items-center dark:bg-black"
            @click="changeThemeColor('#1887F9')"
            :class="{ selected: globalStore.themeColor === '#1887F9' }"
            :style="{ 'border-color': globalStore.themeColor === '#1887F9' ? '#1887F9' : '' }"
          >
            <div class="m-l-4px w-8px h-50px bg-#1887F9 rounded-md"></div>
            <div class="p-l-10px m-t-9px w-100% h-50px text-sm">
              <div class="p-b-4px c-#1887F9">兔子坦克形态</div>
              <div class="c-#1887F9">#077EF8<span> | </span>rgb(24, 135, 249)</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" class="p-l-5px">
          <div
            class="shadow-sm border-#d1c2d3 dark:border-#d1c2d3 sm:hover:border-#6169FF transition-all duration-300 border-dashed border-2 rounded-lg cursor-pointer text-sm w-301px h-62px flex flex-items-center dark:bg-black"
            @click="changeThemeColor('#6169FF')"
            :class="{ selected: globalStore.themeColor === '#6169FF' }"
            :style="{ 'border-color': globalStore.themeColor === '#6169FF' ? '#6169FF' : '' }"
          >
            <div class="m-l-4px w-8px h-50px bg-#6169FF rounded-md"></div>
            <div class="p-l-10px m-t-9px w-100% h-50px text-sm">
              <div class="p-b-4px c-#6169FF">鳄鱼恶霸形态</div>
              <div class="c-#6169FF">#6169FF<span> | </span>rgb(97, 105, 255)</div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="p-t-10px">
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <div
            class="shadow-sm border-#edc3ae dark:border-#edc3ae sm:hover:border-#fa7e23 transition-all duration-300 border-dashed border-2 rounded-lg cursor-pointer text-sm w-301px h-62px flex flex-items-center dark:bg-black"
            @click="changeThemeColor('#fa7e23')"
            :class="{ selected: globalStore.themeColor === '#fa7e23' }"
            :style="{ 'border-color': globalStore.themeColor === '#fa7e23' ? '#fa7e23' : '' }"
          >
            <div class="m-l-4px w-8px h-50px bg-#fa7e23 rounded-md"></div>
            <div class="p-l-10px m-t-9px w-100% h-50px text-sm">
              <div class="p-b-4px c-#fa7e23">巨龙熔岩形态</div>
              <div class="c-#fa7e23">#fa7e23<span> | </span>rgb(250, 126, 35)</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" class="p-l-5px">
          <div
            class="shadow-sm border-#f8df72 dark:border-#F9A407 sm:hover:border-#F9A407 transition-all duration-300 border-dashed border-2 rounded-lg cursor-pointer text-sm w-301px h-62px flex flex-items-center dark:bg-black"
            @click="changeThemeColor('#F9A407')"
            :class="{ selected: globalStore.themeColor === '#F9A407' }"
            :style="{ 'border-color': globalStore.themeColor === '#F9A407' ? '#F9A407' : '' }"
          >
            <div class="m-l-4px w-8px h-50px bg-#F9A407 rounded-md"></div>
            <div class="p-l-10px m-t-9px w-100% h-50px text-sm">
              <div class="p-b-4px c-#F9A407">向日癸形态</div>
              <div class="c-#F9A407">#F9A407<span> | </span>rgb(249, 164, 7)</div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="p-t-10px">
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <div
            class="shadow-sm border-#83cbac dark:border-#83cbac sm:hover:border-#20a162 transition-all duration-300 border-dashed border-2 rounded-lg cursor-pointer text-sm w-301px h-62px flex flex-items-center dark:bg-black"
            @click="changeThemeColor('#20a162')"
            :class="{ selected: globalStore.themeColor === '#20a162' }"
            :style="{ 'border-color': globalStore.themeColor === '#20a162' ? '#20a162' : '' }"
          >
            <div class="m-l-4px w-8px h-50px bg-#20a162 rounded-md"></div>
            <div class="p-l-10px m-t-9px w-100% h-50px text-sm">
              <div class="p-b-4px c-#20a162">自然精灵形态</div>
              <div class="c-#20a162">#20a162<span> | </span>rgb(32, 161, 98)</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" class="p-l-5px">
          <div
            class="shadow-sm border-#efafad dark:border-#efafad sm:hover:border-#ee4866 transition-all duration-300 border-dashed border-2 rounded-lg cursor-pointer text-sm w-301px h-62px flex flex-items-center dark:bg-black"
            @click="changeThemeColor('#ee4866')"
            :class="{ selected: globalStore.themeColor === '#ee4866' }"
            :style="{ 'border-color': globalStore.themeColor === '#ee4866' ? '#ee4866' : '' }"
          >
            <div class="m-l-4px w-8px h-50px bg-#ee4866 rounded-md"></div>
            <div class="p-l-10px m-t-9px w-100% h-50px text-sm">
              <div class="p-b-4px c-#ee4866">锦鲤粉形态</div>
              <div class="c-#ee4866">#ee4866<span> | </span>rgb(238, 72, 102)</div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="p-t-10px">
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <div
            class="shadow-sm border-#f19790 dark:border-#f19790 sm:hover:border-#FF0000 transition-all duration-300 border-dashed border-2 rounded-lg cursor-pointer text-sm w-301px h-62px flex flex-items-center dark:bg-black"
            @click="changeThemeColor('#FF0000')"
            :class="{ selected: globalStore.themeColor === '#FF0000' }"
            :style="{ 'border-color': globalStore.themeColor === '#FF0000' ? '#FF0000' : '' }"
          >
            <div class="m-l-4px w-8px h-50px bg-#FF0000 rounded-md"></div>
            <div class="p-l-10px m-t-9px w-100% h-50px text-sm">
              <div class="p-b-4px c-#FF0000">中国红形态</div>
              <div class="c-#FF0000">#FF0000<span> | </span>rgb(255, 0, 0)</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" class="p-l-5px">
          <div
            class="shadow-sm border-#93b5cf dark:border-#93b5cf sm:hover:border-#1E71EE transition-all duration-300 border-dashed border-2 rounded-lg cursor-pointer text-sm w-301px h-62px flex flex-items-center dark:bg-black"
            @click="changeThemeColor('#1E71EE')"
            :class="{ selected: globalStore.themeColor === '#1E71EE' }"
            :style="{ 'border-color': globalStore.themeColor === '#1E71EE' ? '#1E71EE' : '' }"
          >
            <div class="m-l-4px w-8px h-50px bg-#1E71EE rounded-md"></div>
            <div class="p-l-10px m-t-9px w-100% h-50px text-sm">
              <div class="p-b-4px c-#1E71EE">至尊龙形态</div>
              <div class="c-#1E71EE">#1E71EE<span> | </span>rgb(30, 113, 238)</div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
          <el-divider class="divider" content-position="center">
            <el-icon><Notification /></el-icon>
            布局样式
          </el-divider>
        </el-col>
      </el-row>

      <div class="layout-box">
        <el-tooltip effect="dark" content="纵向" placement="top" :show-after="200">
          <div :class="['layout-item layout-vertical', { 'is-active': layout == 'vertical' }]" @click="setLayout('vertical')">
            <div class="layout-dark"></div>
            <div class="layout-container">
              <div class="layout-light"></div>
              <div class="layout-content"></div>
            </div>
            <el-icon v-if="layout == 'vertical'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="分栏" placement="top" :show-after="200">
          <div :class="['layout-item layout-columns', { 'is-active': layout == 'columns' }]" @click="setLayout('columns')">
            <div class="layout-dark"></div>
            <div class="layout-light"></div>
            <div class="layout-content"></div>
            <el-icon v-if="layout == 'columns'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="经典" placement="top" :show-after="200">
          <div :class="['layout-item layout-classic', { 'is-active': layout == 'classic' }]" @click="setLayout('classic')">
            <div class="layout-dark"></div>
            <div class="layout-container">
              <div class="layout-light"></div>
              <div class="layout-content"></div>
            </div>
            <el-icon v-if="layout == 'classic'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="横向" placement="top" :show-after="200">
          <div
            :class="['layout-item layout-horizontal', { 'is-active': layout == 'horizontal' }]"
            @click="setLayout('horizontal')"
          >
            <div class="layout-dark"></div>
            <div class="layout-content"></div>
            <el-icon v-if="layout == 'horizontal'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
      </div>

      <el-form label-width="auto" label-position="left" class="p-t-8px p-l-3px">
        <el-row>
          <el-col :xs="{ span: 24 }" :sm="{ span: 13 }">
            <el-form-item>
              <div class="flex items-center">
                <span class="m-r-2px">菜单手风琴</span>
                <el-tooltip placement="bottom" content="左侧菜单是否展开单个子菜单[启用-单个/关闭-多个]">
                  <el-icon class="m-r-10px"><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
              <el-switch
                v-model="uniqueOpened"
                active-text="启用"
                inactive-text="停用"
                :active-value="true"
                :inactive-value="false"
                :inline-prompt="true"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :xs="{ span: 24 }" :sm="{ span: 11 }">
            <el-form-item label="菜单宽度">
              <el-input-number :min="210" :max="260" :step="2" v-model="menuWidth"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="{ span: 24 }" :sm="{ span: 13 }">
            <el-form-item label="灰色模式">
              <el-switch
                active-text="启用"
                inactive-text="停用"
                :active-value="true"
                :inactive-value="false"
                :inline-prompt="true"
                v-model="isGrey"
                @change="changeGreyOrWeak('grey', !!$event)"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :xs="{ span: 24 }" :sm="{ span: 11 }">
            <el-form-item label="色弱模式">
              <el-switch
                active-text="启用"
                inactive-text="停用"
                :active-value="true"
                :inactive-value="false"
                :inline-prompt="true"
                v-model="isWeak"
                @change="changeGreyOrWeak('weak', !!$event)"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </KoiDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 明亮主题和暗黑主题配色工具类
import { useTheme } from "@/utils/theme.ts";
import { storeToRefs } from "pinia";
import mittBus from "@/utils/mittBus.ts";
import useGlobalStore from "@/stores/modules/global.ts";

const globalStore = useGlobalStore();

const { changeThemeColor, changeGreyOrWeak, setAsideTheme } = useTheme();
const { layout, uniqueOpened, menuWidth, isGrey, isWeak } = storeToRefs(globalStore);

/** 主题设置弹出框 */
const koiDialogRef = ref();
// 打开主题配置
const handleThemeConfig = () => {
  koiDialogRef.value.koiOpen();
};

// 布局切换
const setLayout = (value: any) => {
  globalStore.setGlobalState("layout", value);
  setAsideTheme();
};

// 打开主题配置对话框，on 接收事件
mittBus.on("handleThemeConfig", () => {
  handleThemeConfig();
});
</script>

<style lang="scss" scoped>
// 图标颜色
.koi-icon {
  &:hover {
    color: var(--el-color-primary);
    cursor: pointer;
  }
}
/* 选中打钩效果 */
.selected::before {
  content: "🌻";
  position: absolute;
  bottom: 20px;
  right: 8px;
  font-size: 24px;
  transform: scale(0); /* 初始状态下隐藏 */
  transition: transform 0.3s ease-in-out; /* 添加过渡效果 */
}
.selected {
  position: relative;
}
.selected.selected::before {
  transform: scale(1); /* 选中状态下显示 */
}
/** 布局css */
.layout-box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px 7px 0;
  .layout-item {
    position: relative;
    box-sizing: border-box;
    width: 100px;
    height: 70px;
    padding: 6px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px var(--el-border-color-dark);
    transition: all 0.2s;
    .layout-dark {
      background-color: var(--el-color-primary);
      border-radius: 3px;
    }
    .layout-light {
      background-color: var(--el-color-primary-light-5);
      border-radius: 3px;
    }
    .layout-content {
      background-color: var(--el-color-primary-light-8);
      border: 1px dashed var(--el-color-primary);
      border-radius: 3px;
    }
    .el-icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: var(--el-color-primary);
      transition: all 0.2s;
    }
    &:hover {
      box-shadow: 0 0 5px 1px var(--el-text-color-secondary);
    }
  }
  .is-active {
    box-shadow: 0 0 0 2px var(--el-color-primary) !important;
  }
  .layout-vertical {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .layout-dark {
      width: 20%;
    }
    .layout-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 72%;
      .layout-light {
        height: 20%;
      }
      .layout-content {
        height: 67%;
      }
    }
  }
  .layout-columns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .layout-dark {
      width: 14%;
    }
    .layout-light {
      width: 17%;
    }
    .layout-content {
      width: 55%;
    }
  }
  .layout-classic {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
    .layout-dark {
      height: 22%;
    }
    .layout-container {
      display: flex;
      justify-content: space-between;
      height: 70%;
      .layout-light {
        width: 20%;
      }
      .layout-content {
        width: 70%;
      }
    }
  }
  .layout-horizontal {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 15px;
    .layout-dark {
      height: 20%;
    }
    .layout-content {
      height: 67%;
    }
  }
}
</style>
