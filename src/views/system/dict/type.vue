<template>
  <div class="p-6px">
    <el-card class="rounded-md" shadow="never">
      <!-- 搜索条件 -->
      <el-form v-show="showSearch" :inline="true" id="searchFormId">
        <el-form-item label="字典名称" prop="dictName">
          <el-input
            placeholder="请输入字典名称"
            v-model="searchParams.dictName"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleListPage"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典编号" prop="dictType">
          <el-input
            placeholder="请输入字典编号"
            v-model="searchParams.dictType"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleListPage"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典状态" prop="dictStatus">
          <el-select
            placeholder="请选择字典状态"
            v-model="searchParams.dictStatus"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleListPage"
          >
            <el-option label="启用" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" plain v-debounce="handleSearch">搜索</el-button>
          <el-button type="danger" icon="refresh" plain v-throttle="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格头部按钮 -->
      <el-row :gutter="10">
        <el-col :span="1.5" v-auth="['system:role:add']">
          <el-button type="primary" icon="plus" plain @click="handleAdd()">新增</el-button>
        </el-col>
        <el-col :span="1.5" v-auth="['system:role:update']">
          <el-button type="success" icon="edit" plain @click="handleUpdate()" :disabled="single">修改</el-button>
        </el-col>
        <el-col :span="1.5" v-auth="['system:role:delete']">
          <el-button type="danger" icon="delete" plain @click="handleBatchDelete()" :disabled="multiple">删除</el-button>
        </el-col>
        <el-col :span="1.5" v-auth="['system:role:export']">
          <el-button type="warning" icon="download" plain>导出</el-button>
        </el-col>
        <el-col :span="1.5" v-auth="['system:role:update']">
          <el-button type="danger" icon="Refresh" plain>刷新缓存</el-button>
        </el-col>
        <KoiToolbar v-model:showSearch="showSearch" @refreshTable="handleListPage"></KoiToolbar>
      </el-row>

      <br />
      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        v-adaptive
        border
        :data="tableList"
        empty-text="暂时没有数据哟🌻"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" prop="dictId" width="120px" align="center" type="index"></el-table-column>
        <el-table-column label="字典名称" prop="dictName" width="120px" align="center"></el-table-column>
        <el-table-column label="字典类型" prop="dictType" width="180px" align="center">
          <template #default="scope">
            <RouterLink :to="`/system/dict/data/${scope.row.dictType}`">
              <span>{{ scope.row.dictType }}</span>
            </RouterLink>
          </template>
        </el-table-column>
        <!-- 注意：如果后端数据返回的是字符串"0" OR "1",这里的active-value AND inactive-value不需要加冒号，会认为是字符串，否则：后端返回是0 AND 1数字，则需要添加冒号 -->
        <el-table-column label="字典状态" prop="dictStatus" width="100px" align="center">
          <template #default="scope">
            <!-- {{ scope.row.dictStatus }} -->
            <el-switch
              v-model="scope.row.dictStatus"
              active-text="启用"
              inactive-text="停用"
              active-value="0"
              inactive-value="1"
              :inline-prompt="true"
              @change="handleSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="字典备注"
          prop="remark"
          width="260px"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="180px" align="center"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime" width="180px" align="center"></el-table-column>
        <el-table-column label="修改人" prop="updateBy" width="180px" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="120" fixed="right">
          <template #default="{ row }">
            <el-tooltip content="修改🌻" placement="top">
              <el-button
                type="primary"
                icon="Edit"
                circle
                plain
                @click="handleUpdate(row)"
                v-auth="['system:role:update']"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除🌻" placement="top">
              <el-button
                type="danger"
                icon="Delete"
                circle
                plain
                @click="handleDelete(row)"
                v-auth="['system:role:delete']"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <br />
      <!-- {{ searchParams.pageNo }} --- {{ searchParams.pageSize }} -->
      <!-- 分页 -->
      <el-pagination
        background
        v-model:current-page="searchParams.pageNo"
        v-model:page-size="searchParams.pageSize"
        v-show="total > 0"
        :page-sizes="[10, 20, 50, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleListPage"
        @current-change="handleListPage"
      />

      <!-- 添加 OR 修改 -->
      <KoiDrawer
        ref="koiDrawerRef"
        :title="title"
        @koiConfirm="handleConfirm"
        @koiCancel="handleCancel"
        :loading="confirmLoading"
      >
        <template #content>
          <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" status-icon>
            <el-row>
              <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                <el-form-item label="字典名称" prop="dictName">
                  <el-input v-model="form.dictName" placeholder="请输入字典名称" clearable />
                </el-form-item>
              </el-col>
              <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                <el-form-item label="字典类型" prop="dictType">
                  <el-input v-model="form.dictType" placeholder="请输入字典类型" clearable />
                </el-form-item>
              </el-col>
              <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                <el-form-item label="字典状态" prop="dictStatus">
                  <el-select v-model="form.dictStatus" placeholder="请选择字典状态" clearable>
                    <el-option label="启用" value="0" />
                    <el-option label="停用" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                <el-form-item label="字典备注" prop="remark">
                  <el-input v-model="form.remark" :rows="5" type="textarea" placeholder="请输入字典备注" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          {{ form }}
        </template>
      </KoiDrawer>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="dictTypePage">
import { ref, reactive, onMounted } from "vue";
import {
  koiMsgSuccess,
  koiNoticeSuccess,
  koiNoticeError,
  koiMsgError,
  koiMsgWarning,
  koiMsgBox,
  koiMsgInfo
} from "@/utils/koi.ts";
// @ts-ignore
import { listPage, getById, add, update, deleteById, batchDelete, updateStatus } from "@/api/system/dict/type/index.ts";

// 数据表格加载页面动画
const loading = ref(false);
/** 是否显示搜索表单 */
const showSearch = ref<boolean>(true); // 默认显示搜索条件
// 数据表格数据
const tableList = ref<any>([
  {
    dictId: 1,
    dictName: "系统开关🌻",
    dictType: "sys_common_status",
    dictStatus: "0",
    remark: "系统开关列表",
    createTime: "2023-08-08 23:00:00",
    updateTime: "2023-08-08 23:00:00",
    updateBy: "YU-ADMIN🌻"
  },
  {
    dictId: 2,
    dictName: "用户性别🌻",
    dictType: "sys_user_sex",
    dictStatus: "0",
    remark: "用户性别列表",
    createTime: "2023-08-08 23:00:00",
    updateTime: "2023-08-08 23:00:00",
    updateBy: "YU-ADMIN🌻"
  },
  {
    dictId: 3,
    dictName: "菜单状态🌻",
    dictType: "sys-menu-status",
    dictStatus: "1",
    remark: "菜单状态列表",
    createTime: "2023-08-08 23:00:00",
    updateTime: "2023-08-08 23:00:00",
    updateBy: "YU-ADMIN🌻"
  }
]);

// 查询参数
const searchParams = ref({
  pageNo: 1, // 第几页
  pageSize: 10, // 每页显示多少条
  dictName: "",
  dictStatus: "",
  dictType: ""
});

const total = ref<number>(0);

// 重置搜索参数
const resetSearchParams = () => {
  searchParams.value = {
    pageNo: 1,
    pageSize: 10,
    dictName: "",
    dictStatus: "",
    dictType: ""
  };
};

/** 搜索 */
const handleSearch = () => {
  console.log("搜索");
  searchParams.value.pageNo = 1;
  handleListPage();
};

/** 重置 */
const resetSearch = () => {
  console.log("重置搜索");
  resetSearchParams();
  handleListPage();
};

/** @current-change：点击分页组件页码发生变化：例如：切换第2、3页 OR 上一页 AND 下一页 OR 跳转某一页 */
/** @size-change：点击分页组件下拉选中条数发生变化：例如：选择10条/页、20条/页等 */
// 分页查询，@current-change AND @size-change都会触发分页，调用后端分页接口
/** 数据表格 */
const handleListPage = async () => {
  total.value = 400;
  // try {
  //   loading.value = true;
  //   tableList.value = []; // 重置表格数据
  //   const res: any = await listPage(searchParams.value);
  //   console.log("字典数据表格数据->", res.data);
  //   tableList.value = res.data.records;
  //   total.value = res.data.total;
  //   loading.value = false;
  // } catch (error) {
  //   console.log(error);
  //   koiNoticeError("数据查询失败，请刷新重试🌻");
  // }
};

/** 数据表格[删除、批量删除等刷新使用] */
const handleTableData = async () => {
  try {
    const res: any = await listPage(searchParams.value);
    console.log("字典数据表格数据->", res.data);
    tableList.value = res.data.records;
    total.value = res.data.total;
  } catch (error) {
    console.log(error);
    koiNoticeError("数据查询失败，请刷新重试🌻");
  }
};

// 静态页面防止报错(可直接删除)
// @ts-ignore
const handleStaticPage = () => {
  listPage(searchParams.value);
};

onMounted(() => {
  // 获取数据表格数据
  handleListPage();
});

const ids = ref([]); // 选中数组
const single = ref<boolean>(true); // 非单个禁用
const multiple = ref<boolean>(true); // 非多个禁用
/** 是否多选 */
const handleSelectionChange = (selection: any) => {
  // console.log(selection);
  ids.value = selection.map((item: any) => item.dictId);
  single.value = selection.length != 1; // 单选
  multiple.value = !selection.length; // 多选
};

/** 添加 */
const handleAdd = () => {
  // 重置表单
  resetForm();
  // 标题
  title.value = "字典添加";
  form.value.dictStatus = "0";
  koiDrawerRef.value.koiOpen();
  koiMsgSuccess("添加🌻");
};

/** 回显数据 */
const handleEcho = async (id: any) => {
  console.log("回显数据ID", id);
  if (id == null || id == "") {
    koiMsgWarning("请选择需要修改的数据🌻");
    return;
  }
  try {
    const res: any = await getById(id);
    console.log(res.data);
    form.value = res.data;
  } catch (error) {
    koiNoticeError("数据获取失败，请刷新重试🌻");
    console.log(error);
  }
};

/** 修改 */
const handleUpdate = async (row?: any) => {
  // 重置表单
  resetForm();
  // 标题
  title.value = "字典修改";
  const dictId = row ? row.dictId : ids.value[0];
  if (dictId == null || dictId == "") {
    koiMsgError("请选中需要修改的数据🌻");
  }
  console.log(dictId);
  // 回显数据
  handleEcho(dictId);
  koiDrawerRef.value.koiOpen();
  koiMsgSuccess("修改🌻");
};

/** 添加 AND 修改抽屉 */
const koiDrawerRef = ref();
// 标题
const title = ref("字典类型管理");
// form表单Ref
const formRef = ref<any>();
// form表单
let form = ref<any>({
  dictId: null,
  dictType: null,
  dictName: null,
  dictStatus: null,
  remark: null
});

/** 清空表单数据 */
const resetForm = () => {
  form.value = {
    dictId: null,
    dictType: null,
    dictName: null,
    dictStatus: null,
    remark: null
  };
};

/** 表单规则 */
const rules = reactive({
  dictName: [{ required: true, message: "请输入字典名字", trigger: "blur" }],
  dictType: [{ required: true, message: "请输入字典类型", trigger: "blur" }],
  dictStatus: [{ required: true, message: "请输入选择字典状态", trigger: "blur" }]
});

// 确定按钮是否显示loading
const confirmLoading = ref(false);
/** 确定  */
const handleConfirm = () => {
  if (!formRef.value) return;
  confirmLoading.value = true;
  (formRef.value as any).validate(async (valid: any) => {
    if (valid) {
      console.log("表单ID", form.value.dictId);
      if (form.value.dictId != null && form.value.dictId != "") {
        try {
          await update(form.value);
          koiNoticeSuccess("修改成功🌻");
          confirmLoading.value = false;
          koiDrawerRef.value.koiQuickClose();
          resetForm();
          handleListPage();
        } catch (error) {
          console.log(error);
          confirmLoading.value = false;
          koiNoticeError("修改失败，请刷新重试🌻");
        }
      } else {
        try {
          await add(form.value);
          koiNoticeSuccess("添加成功🌻");
          confirmLoading.value = false;
          koiDrawerRef.value.koiQuickClose();
          resetForm();
          handleListPage();
        } catch (error) {
          console.log(error);
          confirmLoading.value = false;
          koiNoticeError("添加失败，请刷新重试🌻");
        }
      }

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
    } else {
      koiMsgError("验证失败，请检查填写内容🌻");
      confirmLoading.value = false;
    }
  });
};

/** 取消 */
const handleCancel = () => {
  koiDrawerRef.value.koiClose();
};

/** 状态switch */
const handleSwitch = (row: any) => {
  let text = row.dictStatus === "0" ? "启用" : "停用";
  koiMsgBox("确认要[" + text + "]-[" + row.dictName + "]吗？")
    .then(async () => {
      resetForm();
      if (!row.dictId || !row.dictStatus) {
        koiMsgWarning("请选择需要修改的数据🌻");
        return;
      }
      try {
        await updateStatus(row.dictId, row.dictStatus);
        koiNoticeSuccess("修改成功🌻");
      } catch (error) {
        console.log(error);
        handleTableData();
        koiNoticeError("修改失败，请刷新重试🌻");
      }
    })
    .catch(() => {
      koiMsgError("已取消🌻");
    });
};

/** 删除 */
const handleDelete = (row: any) => {
  const id = row.dictId;
  if (id == null || id == "") {
    koiMsgWarning("请选中需要删除的数据🌻");
  }
  koiMsgBox("您确认需要删除字典名称[" + row.dictName + "]么？")
    .then(async () => {
      try {
        await deleteById(id);
        handleTableData();
        koiNoticeSuccess("删除成功🌻");
      } catch (error) {
        console.log(error);
        handleTableData();
        koiNoticeError("删除失败，请刷新重试🌻");
      }
    })
    .catch(() => {
      koiMsgError("已取消🌻");
    });
};

/** 批量删除 */
const handleBatchDelete = () => {
  if (ids.value.length == 0) {
    koiMsgInfo("请选择需要删除的数据🌻");
    return;
  }
  koiMsgBox("您确认需要进行批量删除么？")
    .then(async () => {
      try {
        console.log("ids", ids.value);
        await batchDelete(ids.value);
        handleTableData();
        koiNoticeSuccess("批量删除成功🌻");
      } catch (error) {
        console.log(error);
        koiNoticeError("批量删除失败，请刷新重试🌻");
        handleTableData();
      }
    })
    .catch(() => {
      koiMsgError("已取消🌻");
    });
};
</script>

<style lang="scss" scoped></style>
