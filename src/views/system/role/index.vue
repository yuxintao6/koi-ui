<template>
  <div class="p-6px">
    <el-card class="rounded-md" shadow="never">
      <!-- 搜索条件 -->
      <el-form v-show="showSearch" :inline="true">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            placeholder="请输入角色名称"
            v-model="searchParams.roleName"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleListPage"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="roleStatus">
          <el-select
            placeholder="请选择角色状态"
            v-model="searchParams.roleStatus"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleListPage"
          >
            <el-option label="启用" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色编号" prop="roleCode">
          <el-input
            placeholder="请输入角色编号"
            v-model="searchParams.roleCode"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleListPage"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" plain v-throttle="handleSearch">搜索</el-button>
          <el-button type="danger" icon="refresh" plain v-debounce="resetSearch">重置</el-button>
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
        <el-col :span="1.5" v-auth="['system:role:import']">
          <el-button type="info" icon="upload" plain>导入</el-button>
        </el-col>
        <el-col :span="1.5" v-auth="['system:role:import']">
          <el-button type="success" icon="Postcard" plain :disabled="single" @click="handleAssignMenu()">分配菜单</el-button>
        </el-col>
        <el-col :span="1.5" v-auth="['system:role:xxx']">
          <el-button type="info" icon="upload" plain>测试</el-button>
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
        <el-table-column label="序号" prop="roleId" width="120px" align="center" type="index"></el-table-column>
        <el-table-column
          label="角色名称"
          prop="roleName"
          width="120px"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column label="角色编号" prop="roleCode" width="120px" align="center"></el-table-column>
        <!-- 注意：如果后端数据返回的是字符串"0" OR "1",这里的active-value AND inactive-value不需要加冒号，会认为是字符串，否则：后端返回是0 AND 1数字，则需要添加冒号 -->
        <el-table-column label="角色状态" prop="roleStatus" width="100px" align="center">
          <template #default="scope">
            <!-- {{ scope.row.roleStatus }} -->
            <el-switch
              v-model="scope.row.roleStatus"
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
        <el-table-column label="角色排序" prop="sorted" width="100px" align="center"></el-table-column>
        <el-table-column
          label="角色备注"
          prop="remark"
          width="260px"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="180px" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150" fixed="right">
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

            <el-tooltip content="分配菜单🌻" placement="top">
              <el-button
                type="info"
                icon="Postcard"
                circle
                plain
                @click="handleAssignMenu(row)"
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
      <KoiDialog
        ref="koiDialogRef"
        :title="title"
        @koiConfirm="handleConfirm"
        @koiCancel="handleCancel"
        :loading="confirmLoading"
      >
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

            <el-row>
              <el-col :xs="{ span: 24 }" :sm="{ span: 12 }">
                <el-form-item label="角色状态" prop="roleStatus">
                  <el-select v-model="form.roleStatus" placeholder="请选择角色状态" style="width: 260px" clearable>
                    <el-option label="启用" value="0" />
                    <el-option label="停用" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" class="p-l-10px">
                <el-form-item label="角色排序" prop="sorted">
                  <el-input-number v-model="form.sorted" style="width: 260px" clearable />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                <el-form-item label="角色备注" prop="remark">
                  <el-input v-model="form.remark" :rows="5" type="textarea" placeholder="请输入角色备注" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          {{ form }}
        </template>
      </KoiDialog>

      <!-- 分配菜单 -->
      <KoiDrawer
        ref="koiDrawerRef"
        :title="title"
        size="360"
        @koiConfirm="handleMenuConfirm"
        @koiCancel="handleMenuCancel"
        :loading="confirmLoading"
        cancelText="关闭"
      >
        <template #content>
          <div>
            <el-tree
              ref="treeRef"
              :data="treeData"
              show-checkbox
              :default-expand-all="false"
              :default-expanded-keys="expandedKey"
              node-key="menuId"
              highlight-current
              :props="defaultProps"
            />
          </div>
        </template>
      </KoiDrawer>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="rolePage">
import { ref, reactive, onMounted } from "vue";
// @ts-ignore
import { koiNoticeSuccess, koiNoticeError, koiMsgError, koiMsgWarning, koiMsgBox, koiMsgInfo } from "@/utils/koi.ts";
// @ts-ignore
import { listPage, getById, add, update, deleteById, batchDelete, updateStatus } from "@/api/system/role/index.ts";
import { listMenuNormal, listMenuIdsByRoleId, saveRoleMenu } from "@/api/system/menu/index.ts";
import { handleTree } from "@/utils/index.ts";

// 数据表格加载页面动画
const loading = ref(false);
/** 是否显示搜索表单 */
const showSearch = ref<boolean>(true); // 默认显示搜索条件
// 数据表格数据
const tableList = ref<any>([
  {
    roleId: 1,
    roleName: "YU-ADMIN🌻",
    roleCode: "YU-ADMIN",
    roleStatus: "0",
    sorted: 1,
    remark: "超级管理员",
    createTime: "2023-08-08 23:00:00"
  },
  {
    roleId: 2,
    roleName: "张大仙",
    roleCode: "ZDX",
    roleStatus: "0",
    sorted: 2,
    remark: "虎牙688，每晚七点半，不见不散！",
    createTime: "2023-08-08 23:00:00"
  },
  {
    roleId: 3,
    roleName: "菜鸡",
    roleCode: "COMMON",
    roleStatus: "1",
    sorted: 3,
    remark: "干饭",
    createTime: "2023-08-08 23:00:00"
  }
]);

// 查询参数
const searchParams = ref({
  pageNo: 1, // 第几页
  pageSize: 10, // 每页显示多少条
  roleName: "",
  roleStatus: "",
  roleCode: ""
});

const total = ref<number>(0);

// 重置搜索参数
const resetSearchParams = () => {
  searchParams.value = {
    pageNo: 1,
    pageSize: 10,
    roleName: "",
    roleStatus: "",
    roleCode: ""
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
  total.value = 9;
  // try {
  //   loading.value = true;
  //   tableList.value = []; // 重置表格数据
  //   const res: any = await listPage(searchParams.value);
  //   console.log("角色数据表格数据->", res.data);
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
    console.log("角色数据表格数据->", res.data);
    tableList.value = res.data.records;
    total.value = res.data.total;
  } catch (error) {
    console.log(error);
    koiNoticeError("数据查询失败，请刷新重试🌻");
  }
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
  console.log(selection);
  ids.value = selection.map((item: any) => item.roleId);
  single.value = selection.length != 1; // 单选
  multiple.value = !selection.length; // 多选
};

/** 添加 */
const handleAdd = () => {
  // 重置表单
  resetForm();
  // 标题
  title.value = "角色添加";
  form.value.roleStatus = "0";
  koiDialogRef.value.koiOpen();
  koiNoticeSuccess("添加🌻");
};

/** 回显数据 */
const handleEcho = async (id: any) => {
  if (id == null || id == "") {
    koiMsgWarning("请选择需要修改的数据🌻");
    return;
  }
  try {
    const res: any = await getById(id);
    console.log(res.data);
    form.value = res.data;
  } catch (error) {
    console.log(error);
    koiNoticeError("数据获取失败，请刷新重试🌻");
  }
};

/** 修改 */
const handleUpdate = async (row?: any) => {
  // 重置表单
  resetForm();
  // 标题
  title.value = "角色修改";
  const roleId = row ? row.roleId : ids.value[0];
  if (roleId == null || roleId == "") {
    koiMsgError("请选择需要修改的数据🌻");
  }
  console.log(roleId);
  // 回显数据
  handleEcho(roleId);
  koiDialogRef.value.koiOpen();
  koiNoticeSuccess("修改🌻");
};

/** 添加 AND 修改弹出框 */
const koiDialogRef = ref();
// 标题
const title = ref("角色管理");
// form表单Ref
const formRef = ref<any>();

// form表单
let form = ref<any>({
  roleId: null,
  roleName: null,
  roleCode: null,
  roleStatus: null,
  sorted: 1,
  remark: null
});

/** 清空表单数据 */
const resetForm = () => {
  form.value = {
    roleId: null,
    roleName: null,
    roleCode: null,
    roleStatus: null,
    sorted: 1,
    remark: null
  };
};

/** 表单规则 */
const rules = reactive({
  roleName: [{ required: true, message: "请输入角色名字", trigger: "null" }],
  roleCode: [{ required: true, message: "请输入角色编号", trigger: "null" }],
  roleStatus: [{ required: true, message: "请输入选择角色状态", trigger: "null" }],
  sorted: [{ required: true, message: "请输入排序号", trigger: "null" }]
});

// 确定按钮是否显示loading
const confirmLoading = ref(false);
/** 确定  */
const handleConfirm = () => {
  if (!formRef.value) return;
  confirmLoading.value = true;
  (formRef.value as any).validate(async (valid: any) => {
    if (valid) {
      // 后端API-[第一种：async await]
      // try{
      //   // 添加或者修改接口
      //   await addRole(form);
      // }catch(error){
      //    console.log(error);
      // }

      // 后端API-[第二种：then]
      // addRole(form).then(() => {
      //   // 一定是成功的
      // }).catch(error => {
      //   console.log(error);
      // })

      console.log("表单ID", form.value.roleId);
      if (form.value.roleId != null && form.value.roleId != "") {
        try {
          await update(form.value);
          koiNoticeSuccess("修改成功🌻");
          confirmLoading.value = false;
          koiDialogRef.value.koiQuickClose();
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
          koiDialogRef.value.koiQuickClose();
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
      //     koiDialogRef.value.koiQuickClose();
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
  koiDialogRef.value.koiClose();
};

/** 状态switch */
const handleSwitch = (row: any) => {
  let text = row.roleStatus === "0" ? "启用" : "停用";
  koiMsgBox("确认要[" + text + "]-[" + row.roleName + "]角色吗？")
    .then(async () => {
      resetForm();
      if (!row.roleId || !row.roleStatus) {
        koiMsgWarning("请选择需要修改的数据🌻");
        return;
      }
      try {
        await updateStatus(row.roleId, row.roleStatus);
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
  const id = row.roleId;
  if (id == null || id == "") {
    koiMsgWarning("请选中需要删除的数据🌻");
    return;
  }
  koiMsgBox("您确认需要删除角色名称[" + row.roleName + "]么？")
    .then(async () => {
      try {
        await deleteById(id);
        handleTableData();
        koiNoticeSuccess("删除成功🌻");
      } catch (error) {
        console.log(error);
        koiNoticeError("删除失败，请刷新重试🌻");
        handleTableData();
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
        // console.log("ids",ids.value)
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

const koiDrawerRef = ref();
const treeRef = ref();
const treeData = ref<any>([
  {
    menuId: 1,
    menuName: "系统管理",
    children: [
      {
        menuId: 4,
        menuName: "日志管理",
        children: [
          {
            menuId: 9,
            menuName: "登录日志"
          },
          {
            menuId: 10,
            menuName: "操作日志"
          }
        ]
      }
    ]
  },
  {
    menuId: 2,
    menuName: "监控管理",
    children: [
      {
        menuId: 5,
        menuName: "Redis监控"
      },
      {
        menuId: 6,
        menuName: "服务器监控"
      }
    ]
  },
  {
    menuId: 3,
    menuName: "资源管理",
    children: [
      {
        menuId: 7,
        menuName: "文件管理"
      },
      {
        menuId: 8,
        menuName: "图片管理"
      }
    ]
  }
]);

// 配置属性
const defaultProps = {
  id: "menuId",
  label: "menuName",
  children: "children"
};
// 默认展开配置
const expandedKey = ref();
const roleId = ref();
/** 分配菜单 */
const handleAssignMenu = async (row?: any) => {
  title.value = "分配菜单🌻";
  // 置空
  treeRef.value?.setCheckedKeys([], false);
  roleId.value = row?.roleId || ids.value[0];
  if (roleId.value == null || roleId.value == "") {
    koiMsgWarning("请选中需要分配菜单的数据🌻");
    return;
  }
  // 查询所有的菜单权限
  koiDrawerRef.value.koiOpen();
  // console.log("角色ID",ids.value[0]);
  // 查询所有的菜单权限
  try {
    const res: any = await listMenuNormal();
    treeData.value = handleTree(res.data.menuList, "menuId");
    expandedKey.value = res.data.spreadList;
  } catch (error) {
    console.log(error);
    koiMsgError("菜单资源加载失败🌻");
  }

  // 通过key设置反选角色拥有的菜单权限(只能查询子节点，查询父节点将直接选中全部下的子节点)
  try {
    const res: any = await listMenuIdsByRoleId(roleId.value);
    // console.log('res',res.data)
    // reeRef.value?.setCheckedKeys([1,2,3], false);
    if (res.data) {
      treeRef.value?.setCheckedKeys(res.data, false);
    }
  } catch (error) {
    console.log(error);
    koiMsgError("角色菜单资源加载失败🌻");
  }
};

// 保存
const handleMenuConfirm = async () => {
  confirmLoading.value = true;
  // 获取选中的keys
  const checkedKeys = treeRef.value?.getCheckedKeys(false);
  // console.log("选中",checkedKeys)
  // 获取半选的keys(即保存选中子节点的父节点[父节点下的子节点并没有选中完])
  const halfCheckKeys = treeRef.value?.getHalfCheckedKeys();
  // console.log("半选",halfCheckKeys)
  // 组合成最后的keys
  const finalKey = halfCheckKeys.concat(checkedKeys);
  // console.log("最终",finalKey)

  try {
    await saveRoleMenu(roleId.value, finalKey);
    confirmLoading.value = false;
    koiNoticeSuccess("角色菜单保存成功🌻");
    // 刷新页面菜单信息
    window.location.reload;
  } catch (error) {
    console.log(error);
    koiMsgError("角色菜单保存失败🌻");
  }
};

// 取消
const handleMenuCancel = () => {
  koiDrawerRef.value.koiClose();
};
</script>

<style lang="scss" scoped></style>
