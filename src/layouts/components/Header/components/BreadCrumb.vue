<template>
  <div :class="['breadcrumb-box', 'mask-image']">
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
          <div
            class="el-breadcrumb__inner is-link"
            :class="{ 'item-no-icon': !item.meta.icon }"
            @click="handleBreadcrumb(item, index)"
          >
            <el-icon v-if="item.meta.icon && item.meta.icon.indexOf(SVG_PREFIX) == -1" class="breadcrumb-icon">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <!-- 本地SVG -->
            <el-icon v-if="item.meta.icon && item.meta.icon.indexOf(SVG_PREFIX) == 0" class="breadcrumb-icon">
              <component is="SvgIcon" :name="item.meta.icon"></component>
            </el-icon>
            <span class="breadcrumb-title">{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { HOME_URL } from "@/config/index.ts";
import { useRoute, useRouter } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";
import { SVG_PREFIX } from "@/config/index.ts";
import useAuthStore from "@/stores/modules/auth.ts";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const breadcrumbList = computed(() => {
  let breadcrumbData = authStore.getBreadcrumbList[route.matched[route.matched.length - 1].path] ?? [];
  // 不需要首页面包屑可删除以下判断
  if (breadcrumbData[0].path !== HOME_URL) {
    breadcrumbData = [{ path: HOME_URL, meta: { icon: "HomeFilled", title: "首页" } }, ...breadcrumbData];
  }
  return breadcrumbData;
});

// 点击面包屑
const handleBreadcrumb = (item: any, index: number) => {
  if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
</script>

<style scoped lang="scss">
/* breadcrumb-transform 面包屑动画 */
.breadcrumb-enter-active {
  transition: all 0.2s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(10px);
}

.breadcrumb-box {
  display: flex;
  align-items: center;
  margin-left: 20px;
  overflow: hidden;
  user-select: none;
  .el-breadcrumb {
    white-space: nowrap;
    .el-breadcrumb__item {
      position: relative;
      display: inline-block;
      float: none;
      .breadcrumb-title {
        font-weight: 600;
      }
      .item-no-icon {
        transform: translateY(-3px);
      }
      .el-breadcrumb__inner {
        display: inline-flex;
        &.is-link {
          color: var(--el-header-text-color);
          &:hover {
            color: var(--el-color-primary);
          }
        }
        .breadcrumb-icon {
          margin-top: 1px;
          margin-right: 6px;
          font-size: 16px;
        }
        .breadcrumb-title {
          margin-top: 2px;
        }
      }
      &:last-child .el-breadcrumb__inner,
      &:last-child .el-breadcrumb__inner:hover {
        color: var(--el-header-text-color-regular);
      }
      :deep(.el-breadcrumb__separator) {
        transform: translateY(-1px);
      }
    }
  }
}
/* 右侧向左侧移动，面包屑模糊 */
.mask-image {
  padding-right: 50px;
  mask-image: linear-gradient(90deg, #000000 0%, #000000 calc(100% - 50px), transparent);
}
</style>
