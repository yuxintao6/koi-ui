<template>
  <div class="p-6px">
    <el-button type="primary" plain @click="handleKoiDialog">打开Dialog</el-button>

    <KoiDialog ref="koiDialogRef" :title="title" @koiConfirm="handleConfirm" @koiCancel="handleCancel" :loading="confirmLoading">
      <template #content>
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" status-icon>
          <el-row>
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }">
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="form.roleName" placeholder="请输入角色名称" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" class="p-l-10px">
              <el-form-item label="角色编号" prop="roleCode">
                <el-input v-model="form.roleCode" placeholder="请输入角色编号" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        {{ form }}
      </template>
    </KoiDialog>

    <br />
    <br />
    <div class="p-l-20px bg-#fff">
      分段器：
      <KoiSection v-model="activeName" @tab-click="handleClick">
        <template #content>
          <el-tab-pane label="KOI-UI" name="first">KOI-UI</el-tab-pane>
          <el-tab-pane label="ElementPlus" name="second">ElementPlus</el-tab-pane>
          <el-tab-pane label="Pinia" name="third">Pinia</el-tab-pane>
          <el-tab-pane label="Vue3" name="fourth">Vue3</el-tab-pane>
          <el-tab-pane label="Uncoss" name="fourth">Uncoss</el-tab-pane>
        </template>
      </KoiSection>
    </div>
  </div>
</template>

<script setup lang="ts" name="dialogPage">
import { ref, reactive } from "vue";
import { koiMsgSuccess, koiMsgError, koiNoticeSuccess } from "@/utils/koi.ts";

/** 打开Dialog */
const handleKoiDialog = () => {
  // 重置表单
  resetForm();
  // 标题
  title.value = "二次封装Dialog模版";
  koiDialogRef.value.koiOpen();
  koiNoticeSuccess("Dialog模版🌻");
};

/** 添加 AND 修改弹出框 */
const koiDialogRef = ref();
/** 打开Dialog操作 */
const title = ref("二次封装Dialog模版");
// form表单Ref
const formRef = ref<any>();
// form表单
let form = ref<any>({
  roleId: "",
  roleName: "",
  roleCode: ""
});
/** 清空表单数据 */
const resetForm = () => {
  form.value = {
    roleId: "",
    roleName: "",
    roleCode: ""
  };
};
/** 表单规则 */
const rules = reactive({
  roleName: [{ required: true, message: "请输入角色名字", trigger: "change" }],
  roleCode: [{ required: true, message: "请输入角色编号", trigger: "change" }]
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

    // console.log("表单ID", form.value.roleId);
    // if (form.value.roleId != null && form.value.roleId != "") {
    //   try {
    //     await update(form.value);
    //     koiNoticeSuccess("修改成功🌻");
    //     confirmLoading.value = false;
    //     koiDialogRef.value.koiQuickClose();
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
    //     koiDialogRef.value.koiQuickClose();
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
    //     koiDialogRef.value.koiQuickClose();
    //   }
    // }, 1000);
  });
};

/** 取消 */
const handleCancel = () => {
  koiDialogRef.value.koiClose();
};

/** 分段器开始 */
import type { TabsPaneContext } from "element-plus";
const activeName = ref("first");
const handleClick = (tab: TabsPaneContext) => {
  alert("name：" + tab.props.name);
};
/** 分段器结束 */
</script>

<style scoped></style>
