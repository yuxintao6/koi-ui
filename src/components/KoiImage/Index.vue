<template>
  <div class="image-btn" @click="handleChooseImage">
    <slot name="content">
      <el-icon :size="25" class="icon-color"><Plus /></el-icon>
    </slot>
  </div>
  <div class="el-upload-tip">
    <slot name="tip"></slot>
  </div>

  <KoiDialog
    ref="koiDialogRef"
    :title="title"
    :width="1200"
    top="5vh"
    :height="600"
    @koiConfirm="handleConfirm"
    @koiCancel="handleCancel"
    :loading="confirmLoading"
  >
    <template #content>
      <el-container style="height: 600px">
        <!-- 头部盒子 -->
        <!-- <el-header class="image-header">
          <el-button type="primary" icon="plus" plain>新增分类</el-button>
          <el-button type="warning" icon="Upload" plain @click="handleUploadImage">上传图片</el-button>
        </el-header> -->
        <el-container>
          <!-- 左侧盒子 -->
          <el-aside width="200px" class="image-aside">
            <!-- 分类 -->
            <div class="aside-top">
              <div
                class="aside-list"
                :class="selectedIndex === index ? 'is-active' : ''"
                v-for="(item, index) in categoryList"
                :key="item.id"
                @click="handleSelectedIndex(index)"
              >
                <span class="truncate">{{ item.categoryName }}</span>
                <el-button plain type="primary" class="ml-auto px-4px" size="small">
                  <el-icon :size="14" @click.stop="handleUpdateCategory"><Edit /></el-icon>
                </el-button>
                <el-popconfirm
                  title="是否删除？"
                  confirmButtonText="确认"
                  cancelButtonText="取消"
                  confirmButtonType="primary"
                  cancelButtonType="text"
                  icon="el-icon-question"
                  iconColor="#f90"
                  @confirm="handleDeleteCategory"
                >
                  <template #reference>
                    <el-button plain type="primary" class="px-4px" size="small">
                      <el-icon :size="14"><Close /></el-icon>
                    </el-button>
                  </template>
                </el-popconfirm>
              </div>
            </div>
            <!-- 分页 -->
            <div class="aside-bottom">
              <el-pagination
                background
                v-model:current-page="searchCategoryParams.pageNo"
                v-model:page-size="searchCategoryParams.pageSize"
                v-show="categoryTotal > 0"
                :page-sizes="[10, 20, 50, 100, 200]"
                layout="prev, next, total"
                :total="categoryTotal"
                @size-change="handleCategoryListPage"
                @current-change="handleCategoryListPage"
              />
            </div>
          </el-aside>
          <!-- 右侧盒子 -->
          <el-main class="image-main">
            <!-- 图片列表 -->
            <div class="main-top p-4px" v-loading="loading">
              <el-row>
                <el-col :span="4" v-for="item in imageList" :key="item.id">
                  <!-- 图片卡片 -->
                  <el-card shadow="hover" class="relative mb-4px" :body-style="{ padding: '4px 4px 0px 4px' }">
                    <el-image
                      style="width: 100%"
                      class="h-140px"
                      fit="cover"
                      :preview-teleported="true"
                      :preview-src-list="[item.imageUrl]"
                      :src="
                        item.imageUrl != null && item.imageUrl != ''
                          ? item.imageUrl
                          : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                      "
                    >
                      <template #error>
                        <el-icon class="c-[--el-color-primary]" :size="146">
                          <CircleCloseFilled />
                        </el-icon>
                      </template>
                    </el-image>
                    <div class="flex items-center justify-center p-4px">
                      <el-checkbox size="small" v-model="item.checked" border @change="handleChecked(item)"
                        >选择此图片</el-checkbox
                      >
                    </div>
                    <!-- <div class="image-name">{{  item.imageName }}</div>
                        <div class="flex items-center justify-center p-4px">
                          <el-button type="primary" size="small" plain @click="handleUpdateImageName">重命名</el-button>
                          <el-popconfirm
                              title="是否删除图片？"
                              confirmButtonText="确认"
                              cancelButtonText="取消"
                              confirmButtonType="primary"
                              cancelButtonType="text"
                              icon="el-icon-question"
                              iconColor="#f90"
                              @confirm="handleDeleteImage"
                          >
                            <template #reference>
                              <el-button type="danger" size="small" plain>删除</el-button>
                            </template>
                          </el-popconfirm>
                        </div> -->
                  </el-card>
                </el-col>
              </el-row>
            </div>
            <!-- 分页 -->
            <div class="main-bottom">
              <el-pagination
                background
                :pager-count="5"
                v-model:current-page="searchImageParams.pageNo"
                v-model:page-size="searchImageParams.pageSize"
                v-show="imageTotal > 0"
                :page-sizes="[10, 20, 50, 100, 200]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="imageTotal"
                @size-change="handleImageListPage"
                @current-change="handleImageListPage"
              />
            </div>
          </el-main>
        </el-container>
      </el-container>
    </template>
  </KoiDialog>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { koiNoticeSuccess, koiMsgSuccess, koiMsgError, koiMsgWarning } from "@/utils/koi.ts";

const title = ref();
const koiDialogRef = ref();
/** 添加 */
const handleChooseImage = () => {
  // 标题
  title.value = "选择图库";
  koiDialogRef.value.koiOpen();
  koiNoticeSuccess("选择图库图片🌻");
};

// 确定按钮是否显示loading
const confirmLoading = ref(false);

/** 确定  */
const handleConfirm = () => {
  confirmLoading.value = true;
  // 等待2秒
  let loadingTime = 2;
  setInterval(() => {
    loadingTime--;
    if (loadingTime === 0) {
      confirmLoading.value = false;
      koiMsgError("服务异常，请重试🌻");
    }
  }, 1000);
  // koiDialogRef.value.koiQuickClose();
};

/** 取消 */
const handleCancel = () => {
  koiDialogRef.value.koiClose();
};

const categoryList = ref([
  { id: 1, categoryName: "轮播图" },
  { id: 2, categoryName: "动漫分类" },
  { id: 3, categoryName: "明星分类" }
]);

const imageList = ref<any>([
  {
    id: 1,
    imageName: "1.png",
    imageUrl: "https://i.mji.rip/2023/10/09/ddb8b342347328e4647bdc6769251edc.jpeg"
  },
  {
    id: 2,
    imageName: "2.png",
    imageUrl: "https://i.mji.rip/2023/10/09/d11d86e2a4bb118fdf60df06ec43fd71.jpeg"
  },
  {
    id: 3,
    imageName: "3.png",
    imageUrl: "https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_b.webp"
  },
  {
    id: 4,
    imageName: "4.png",
    imageUrl: "https://pic2.zhimg.com/v2-44ce1b82f7e68de4078bf513221619e1_b.webp"
  },
  {
    id: 5,
    imageName: "5.png",
    imageUrl: "https://pic2.zhimg.com/v2-430e1a7dd0508a0b4b01dca9b94b22f5_b.webp"
  },
  {
    id: 6,
    imageName: "6.png",
    imageUrl: "https://pic3.zhimg.com/v2-b6c350529f3c06c8a90d886c311f3866_b.webp"
  },
  {
    id: 7,
    imageName: "7.png",
    imageUrl: "https://img1.baidu.com/it/u=1804190208,1891571568&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=721"
  },
  {
    id: 8,
    imageName: "8.png",
    imageUrl: "https://img0.baidu.com/it/u=1084576395,3892192542&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=553"
  },
  {
    id: 9,
    imageName: "9.png",
    imageUrl: "https://img2.baidu.com/it/u=3411611412,2734862961&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=745"
  },
  {
    id: 10,
    imageName: "10.png",
    imageUrl: "https://img0.baidu.com/it/u=3945773513,267927344&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800"
  }
]);
/** 查询分类开始 */
// 查询参数
const searchCategoryParams = ref({
  pageNo: 1, // 第几页
  pageSize: 10 // 每页显示多少条
});
const categoryTotal = ref<number>(0);
/** 数据表格 */
const handleCategoryListPage = async () => {
  categoryTotal.value = 200;
  // try {
  //   tableList.value = []; // 重置表格数据
  //   loading.value = true;
  //   const res: any = await listPage(searchCategoryParams.value);
  //   console.log("公告数据表格数据->", res.data);
  //   tableList.value = res.data.records;
  //   total.value = res.data.total;
  //   loading.value = false;
  //   console.log("公告数据表格数据");
  // } catch (error) {
  //   console.log(error);
  //   koiNoticeError("数据查询失败，请刷新重试🌻");
  // }
};
// 选中颜色
const selectedIndex = ref<number>(0);
/** 查询分类结束 */
// 点击选中分类
const handleSelectedIndex = (value?: number) => {
  if (value != null || value != undefined) {
    selectedIndex.value = value;
    koiMsgSuccess("点击分类🌻" + value);
  }
};
// 修改分类
const handleUpdateCategory = () => {
  koiMsgSuccess("修改分类🌻");
};
// 删除分类
const handleDeleteCategory = () => {
  koiMsgSuccess("删除分类🌻");
};

onMounted(() => {
  handleCategoryListPage();
  handleImageListPage();
});
/** 查询图片开始 */
// 查询参数
const searchImageParams = ref({
  pageNo: 1, // 第几页
  pageSize: 10 // 每页显示多少条
});
const imageTotal = ref<number>(0);
/** 数据表格 */
const handleImageListPage = async () => {
  imageTotal.value = 200;
  // 后端数据添加是否选中属性
  imageList.value = imageList.value.map((item: any) => {
    item.checked = false;
    return item;
  });
  // try {
  //   tableList.value = []; // 重置表格数据
  //   loading.value = true;
  //   const res: any = await listPage(searchCategoryParams.value);
  //   console.log("公告数据表格数据->", res.data);
  //   tableList.value = res.data.records;
  //   total.value = res.data.total;
  //   loading.value = false;
  //   console.log("公告数据表格数据");
  // } catch (error) {
  //   console.log(error);
  //   koiNoticeError("数据查询失败，请刷新重试🌻");
  // }
};
/** 查询图片结束 */

const loading = ref(false);
/** 重命名 */
// const handleUpdateImageName = () => {
//   loading.value = true;
//   koiMsgBoxPrompt()
//     .then(async (res: any) => {
//       throw new Error("error");
//       koiMsgSuccess("操作成功🌻" + res.value);
//     })
//     .catch(() => {
//       // 等待2秒
//       let loadingTime = 2;
//       setInterval(() => {
//         loadingTime--;
//         if (loadingTime === 0) {
//           loading.value = false;
//           koiMsgError("服务异常，请重试🌻");
//         }
//       }, 1000);
//     });
// };

/** 删除图片 */
// const handleDeleteImage = () => {
//   koiMsgSuccess("删除图片🌻");
// };

// let pictureList = ref<any>([]);
// 截取图片路径中的图片名称
// const getImageName = (path: string) => {
// 	let filename;
// 	if (path.indexOf("/") > 0) //如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
// 	{
// 		filename = path.substring(path.lastIndexOf("/") + 1, path.length);
// 	} else {
// 		filename = path;
// 	}
//   return filename;
// }

// 选中的图片
const checkImage = computed(() => imageList.value.filter((item: any) => item.checked));
// 选中图片checked
const handleChecked = (item?: any) => {
  // koiMsgSuccess("选择图片🌻" + item.imageUrl);
  koiMsgSuccess("选择图片🌻" + item.checked + "/" + checkImage.value.length);
  if (item.imageUrl) {
    if (item.checked && checkImage.value.length > 1) {
      item.checked = false;
      return;
    }
    // const imageName = getImageName(item.imageUrl);
    // pictureList.value.push({'name': imageName, 'url': item.imageUrl})
    // pictureList.value.filter((item: any) => {
    //   return
    // })
  } else {
    koiMsgWarning("未获取到图片路径，请刷新重试🌻");
  }
};
</script>

<style lang="scss" scoped>
.image-btn {
  border: 2px dashed var(--el-color-primary);

  @apply w-120px h-120px rounded flex justify-center items-center cursor-pointer;
  &:hover {
    background: var(--el-color-primary-light-9);
  }
}
.icon-color {
  color: var(--el-color-primary);
}
.el-upload-tip {
  margin-top: 6px;
  font-size: 12px;
  color: var(--el-color-primary);
  text-align: left;
}

// 以下为图库css
// .image-header {
//   padding-left: 4px;
// }
.image-aside {
  position: relative;
  margin-right: 10px;
}
.aside-top,
.main-top {
  position: absolute;
  inset: 0 0 50px;
  overflow-y: auto;
}
.aside-bottom,
.main-bottom {
  @apply flex items-center justify-center;

  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
}
.aside-list {
  height: 26px;
  font-weight: 600;
  color: var(--el-color-primary-light-2);
  cursor: pointer;
  border: 2px dashed var(--el-color-primary-light-5);
  border-radius: 4px;

  @apply flex items-center p-4px m-4px text-13px;
  &:hover {
    background: var(--el-color-primary-light-9);
  }
  &.is-active {
    background: var(--el-color-primary-light-9);
  }
}

// .image-name {
//   position: absolute;
//   top: 185px;
//   left: 4px;
//   right: 4px;
//   @apply text-sm truncate bg-gray-500 bg-opacity-50;
//   color: whitesmoke;
// }
.image-main {
  position: relative;

  // border: 2px dashed var(--el-color-primary-light-5);
  // border-radius: 4px;
}
</style>
