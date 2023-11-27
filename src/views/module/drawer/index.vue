<template>
  <div class="p-6px">
    <el-button type="primary" plain @click="handleKoiDrawer">打开Drawer</el-button>
    <KoiDrawer ref="koiDrawerRef" :title="title" @koiConfirm="handleConfirm" @koiCancel="handleCancel" :loading="confirmLoading">
      <template #content>
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" status-icon>
          <el-row>
            <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
              <el-form-item label="公告名称" prop="noticeTitle">
                <el-input v-model="form.noticeTitle" placeholder="请输入公告名称" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
              <el-form-item label="公告状态" prop="noticeStatus">
                <el-select v-model="form.noticeStatus" placeholder="请选择公告状态" clearable>
                  <el-option label="启用" value="0" />
                  <el-option label="停用" value="1" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
              <el-form-item label="公告内容" prop="noticeContent">
                <el-input v-model="form.noticeContent" placeholder="请输入公告内容" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        {{ form }}
      </template>
    </KoiDrawer>
  </div>
</template>

<script setup lang="ts" name="drawerPage">
import { ref, reactive } from "vue";
import { koiMsgSuccess, koiMsgError, koiNoticeSuccess } from "@/utils/koi.ts";

/** 打开Drawer */
const handleKoiDrawer = () => {
  // 重置表单
  resetForm();
  // 标题
  title.value = "二次封装Dialog模版";
  koiDrawerRef.value.koiOpen();
  koiNoticeSuccess("Dialog模版🌻");
};

/** 添加 AND 修改弹出框 */
const koiDrawerRef = ref();
/** 打开Drawer操作 */
const title = ref("二次封装Drawer模版");
// form表单Ref
const formRef = ref<any>();
// form表单
let form = ref<any>({
  noticeTitle: "",
  noticeStatus: "",
  noticeContent: ""
});
/** 清空表单数据 */
const resetForm = () => {
  form.value = {
    noticeTitle: "",
    noticeStatus: "",
    noticeContent: ""
  };
};
/** 表单规则 */
const rules = reactive({
  noticeTitle: [{ required: true, message: "请输入公告名字", trigger: "change" }],
  noticeStatus: [{ required: true, message: "请输入选择公告状态", trigger: "change" }]
});

// 确定按钮是否显示loading
const confirmLoading = ref(false);
/** 确定  */
const handleConfirm = () => {
  if (!formRef.value) return;
  confirmLoading.value = true;
  (formRef.value as any).validate(async (valid: any) => {
    if (valid) {
      koiMsgSuccess("验证成功🌻");
      confirmLoading.value = false;
    } else {
      koiMsgError("验证失败，请检查填写内容🌻");
      confirmLoading.value = false;
    }
  });

  // console.log("表单ID", form.value.noticeId);
  // if (form.value.noticeId != null && form.value.noticeId != "") {
  //   try {
  //     await update(form.value);
  //     koiNoticeSuccess("修改成功🌻");
  //     confirmLoading.value = false;
  //     koiDrawerRef.value.koiQuickClose();
  //     resetForm();
  //     handleListPage();
  //   } catch (error) {
  //     console.log(error);
  //     confirmLoading.value = false;
  //     koiNoticeError("修改失败，请刷新重试🌻");
  //   }
  // } else {
  //   try {
  //     await add(form.value);
  //     koiNoticeSuccess("添加成功🌻");
  //     confirmLoading.value = false;
  //     koiDrawerRef.value.koiQuickClose();
  //     resetForm();
  //     handleListPage();
  //   } catch (error) {
  //     console.log(error);
  //     confirmLoading.value = false;
  //     koiNoticeError("添加失败，请刷新重试🌻");
  //   }
  // }

  /** 静态页面 */
  // let loadingTime = 1;
  // setInterval(() => {
  //   loadingTime--;
  //   if (loadingTime === 0) {
  //     koiNoticeSuccess("朕让你提交了么？信不信锤你🌻");
  //     confirmLoading.value = false;
  //     resetForm();
  //     koiDrawerRef.value.koiQuickClose();
  //   }
  // }, 1000);
};

/** 取消 */
const handleCancel = () => {
  koiDrawerRef.value.koiClose();
};
</script>

<style scoped></style>
