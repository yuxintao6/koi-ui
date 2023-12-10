<template>
  <div class="p-6px">
    <el-card class="rounded-md" shadow="never">
      <!-- 搜索条件 -->
      <el-form v-show="showSearch" :inline="true" id="searchFormId">
        <el-form-item label="登录名称" prop="loginName">
          <el-input
            placeholder="请输入登录名称"
            v-model="searchParams.loginName"
            clearable
            style="width: 200px"
            @keyup.enter.native="handleListPage"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input
            placeholder="请输入用户名称"
            v-model="searchParams.userName"
            clearable
            style="width: 200px"
            @keyup.enter.native="handleListPage"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            placeholder="请输入手机号"
            v-model="searchParams.phone"
            clearable
            style="width: 200px"
            @keyup.enter.native="handleListPage"
          ></el-input>
        </el-form-item>
        <el-form-item label="访问时间" prop="loginTime">
          <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始日期"
            range-separator="至"
            end-placeholder="结束日期"
            :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
          />
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
        <el-col :span="1.5" v-auth="['system:role:update']">
          <el-button type="primary" icon="edit" plain @click="handleAssignRoles()" :disabled="single">分配角色</el-button>
        </el-col>
        <el-col :span="1.5" v-auth="['system:role:export']">
          <el-button type="warning" icon="download" plain>导出</el-button>
        </el-col>
        <el-col :span="1.5" v-auth="['system:role:import']">
          <el-button type="info" icon="upload" plain>导入</el-button>
        </el-col>
        <KoiToolbar v-model:showSearch="showSearch" @refreshTable="handleListPage"></KoiToolbar>
      </el-row>

      <br />
      <!-- 数据表格 :data="tableList" -->
      <el-table
        v-loading="loading"
        v-adaptive
        border
        :data="tableList.slice((searchParams.pageNo - 1) * searchParams.pageSize, searchParams.pageNo * searchParams.pageSize)"
        empty-text="暂时没有数据哟🌻"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" prop="userId" width="80px" align="center" type="index"></el-table-column>
        <el-table-column
          label="登录名称"
          prop="loginName"
          width="120px"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="头像" prop="avatar" width="80px" align="center">
          <template #default="scope">
            <div class="flex justify-center">
              <el-image
                class="rounded-full w-36px h-36px"
                :preview-teleported="true"
                :preview-src-list="[scope.row.avatar]"
                :src="
                  scope.row.avatar != null && scope.row.avatar != ''
                    ? scope.row.avatar
                    : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                "
              >
                <template #error>
                  <el-icon class="c-[--el-color-primary]" :size="36">
                    <CircleCloseFilled />
                  </el-icon>
                </template>
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名称"
          prop="userName"
          width="120px"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="邮箱" prop="email" width="220px" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="手机号" prop="phone" width="150px" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="用户类型" prop="userType" width="100px" align="center">
          <template #default="scope">
            <KoiTag :tagOptions="userTypeOptions" :value="scope.row.userType"></KoiTag>
          </template>
        </el-table-column>
        <el-table-column label="用户性别" prop="sex" width="100px" align="center">
          <template #default="scope">
            <KoiTag :tagOptions="userSexOptions" :value="scope.row.sex"></KoiTag>
          </template>
        </el-table-column>
        <!-- 注意：如果后端数据返回的是字符串"0" OR "1",这里的active-value AND inactive-value不需要加冒号，会认为是字符串，否则：后端返回是0 AND 1数字，则需要添加冒号 -->
        <el-table-column label="用户状态" prop="userStatus" width="100px" align="center">
          <template #default="scope">
            <!-- {{ scope.row.userStatus }} -->
            <el-switch
              v-model="scope.row.userStatus"
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
        <el-table-column label="创建时间" prop="createTime" width="180px" align="center"></el-table-column>
        <el-table-column label="备注" prop="remark" width="200px" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="120"
          fixed="right"
          v-auth="['system:role:update', 'system:role:delete']"
        >
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
                <el-form-item label="用户名称" prop="userTitle">
                  <el-input v-model="form.userTitle" placeholder="请输入用户名称" clearable />
                </el-form-item>
              </el-col>
              <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                <el-form-item label="用户类型" prop="userType">
                  <el-select placeholder="请选择用户类型" v-model="form.userType" clearable>
                    <el-option
                      v-for="item in userTypeOptions"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                <el-form-item label="用户状态" prop="userStatus">
                  <el-select v-model="form.userStatus" placeholder="请选择用户状态" clearable>
                    <el-option label="启用" value="0" />
                    <el-option label="停用" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                <el-form-item label="用户头像" prop="avatar">
                  <KoiUploadImage v-model:imageUrl="form.avatar">
                    <template #content>
                      <el-icon><Avatar /></el-icon>
                      <span>请上传头像</span>
                    </template>
                    <template #tip>图片最大为 3M</template>
                  </KoiUploadImage>
                  <!-- <el-input v-model="form.avatar" placeholder="请输入用户头像地址" clearable /> -->
                </el-form-item>
              </el-col>
              <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
                <el-form-item label="用户备注" prop="remark">
                  <el-input v-model="form.remark" :rows="5" type="textarea" placeholder="请输入用户备注" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          {{ form }}
        </template>
      </KoiDrawer>

      <KoiDialog ref="koiDialogRef" title="分配角色" :height="450" :loading="confirmLoading" :footerHidden="true">
        <template #content>
          <div class="flex flex-justify-center">
            <el-transfer
              :props="{
                key: 'value',
                label: 'label'
              }"
              :titles="['角色列表', '拥有角色']"
              target-order="original"
              filterable
              filter-placeholder="关键字搜索"
              :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
              }"
              v-model="transferRightList"
              :data="transferLeftList"
              @change="handleTransferChange"
            />
          </div>
        </template>
      </KoiDialog>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="userPage">
// 已使用字典案例
import { ref, reactive, onMounted } from "vue";
// @ts-ignore
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
import { listPage, getById, add, update, deleteById, batchDelete, updateStatus } from "@/api/system/user/index.ts";

import { listNormalRole, assignUserRole } from "@/api/system/role/index.ts";
// @ts-ignore
import { listDataByType } from "@/api/system/dict/data/index.ts";

// 数据表格加载页面动画
const loading = ref(false);
/** 是否显示搜索表单 */
const showSearch = ref<boolean>(true); // 默认显示搜索条件
// 数据表格数据
const tableList = ref<any>([
  {
    userId: 1,
    loginName: "YU-ADMIN",
    userName: "超级管理员",
    userType: "1",
    email: "YU-ADMIN666@163.com",
    phone: "18888888888",
    sex: "1",
    avatar: "https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_b.webp",
    userStatus: "0",
    remark: "管理员",
    createTime: "2023-08-06 04:00:00"
  },
  {
    userId: 2,
    loginName: "KOI",
    userName: "小锦鲤",
    userType: "1",
    email: "koi@qq.com",
    phone: "18666666666",
    sex: "1",
    avatar: "https://pic2.zhimg.com/v2-44ce1b82f7e68de4078bf513221619e1_b.webp",
    userStatus: "0",
    remark: "管理员",
    createTime: "2023-08-07 04:00:00"
  },
  {
    userId: 3,
    loginName: "YXT",
    userName: "于金金",
    userType: "2",
    email: "koi@qq.com",
    phone: "18666666666",
    sex: "2",
    avatar: "https://pic1.zhimg.com/v2-3cbc889feac057cc7fb85a40c82598dc_b.webp",
    userStatus: "0",
    remark: "管理员",
    createTime: "2023-08-08 04:00:00"
  },
  {
    userId: 4,
    loginName: "orange",
    userName: "迪迦",
    userType: "1",
    email: "YU-ADMIN666@163.com",
    phone: "18888888888",
    sex: "1",
    avatar: "https://pic3.zhimg.com/v2-b6c350529f3c06c8a90d886c311f3866_b.webp",
    userStatus: "0",
    remark: "远古时代战士",
    createTime: "2023-08-06 04:00:00"
  },
  {
    userId: 5,
    loginName: "apple",
    userName: "盖亚",
    userType: "1",
    email: "koi@qq.com",
    phone: "18666666666",
    sex: "1",
    avatar: "https://pic2.zhimg.com/v2-430e1a7dd0508a0b4b01dca9b94b22f5_b.webp",
    userStatus: "0",
    remark: "远古时代战士",
    createTime: "2023-08-07 04:00:00"
  },
  {
    userId: 6,
    loginName: "banana",
    userName: "阿古茹",
    userType: "2",
    email: "koi@qq.com",
    phone: "18666666666",
    sex: "2",
    avatar: "https://pic3.zhimg.com/v2-6e8ff25c222b6302cb836c9f6b013e7e_b.webp",
    userStatus: "0",
    remark: "远古时代战士",
    createTime: "2023-08-08 04:00:00"
  },
  {
    userId: 7,
    loginName: "pear",
    userName: "帝骑",
    userType: "1",
    email: "YU-ADMIN666@163.com",
    phone: "18888888888",
    sex: "1",
    avatar: "https://pic2.zhimg.com/v2-d75d120cdab34142933ad9df18508ad1_b.webp",
    userStatus: "0",
    remark: "假面骑士",
    createTime: "2023-08-06 04:00:00"
  },
  {
    userId: 8,
    loginName: "pineapple",
    userName: "创骑",
    userType: "1",
    email: "koi@qq.com",
    phone: "18666666666",
    sex: "1",
    avatar: "https://pic3.zhimg.com/v2-a42559223697c17188a75ad3a10e1cea_b.webp",
    userStatus: "0",
    remark: "假面骑士",
    createTime: "2023-08-07 04:00:00"
  },
  {
    userId: 9,
    loginName: "mango",
    userName: "时王",
    userType: "2",
    email: "koi@qq.com",
    phone: "18666666666",
    sex: "2",
    avatar: "https://img0.baidu.com/it/u=1752705848,3929873216&fm=253&app=138&size=w931&n=0&f=JPEG",
    userStatus: "0",
    remark: "假面骑士",
    createTime: "2023-08-08 04:00:00"
  },
  {
    userId: 10,
    loginName: "plum",
    userName: "海绵宝宝",
    userType: "1",
    email: "YU-ADMIN666@163.com",
    phone: "18888888888",
    sex: "1",
    avatar: "https://img1.baidu.com/it/u=3941674148,2170642163&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255",
    userStatus: "0",
    remark: "地底世界",
    createTime: "2023-08-06 04:00:00"
  },
  {
    userId: 11,
    loginName: "watermelon",
    userName: "派大星",
    userType: "1",
    email: "koi@qq.com",
    phone: "18666666666",
    sex: "1",
    avatar: "https://img2.baidu.com/it/u=1519337523,3739613381&fm=253&fmt=auto&app=120&f=JPEG?w=600&h=600",
    userStatus: "0",
    remark: "地底世界",
    createTime: "2023-08-07 04:00:00"
  },
  {
    userId: 12,
    loginName: "peach",
    userName: "章鱼哥",
    userType: "2",
    email: "koi@qq.com",
    phone: "18666666666",
    sex: "2",
    avatar: "https://img2.baidu.com/it/u=71901679,703168528&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    userStatus: "0",
    remark: "地底世界",
    createTime: "2023-08-08 04:00:00"
  },
  {
    userId: 13,
    loginName: "grape",
    userName: "光头强",
    userType: "1",
    email: "YU-ADMIN666@163.com",
    phone: "18888888888",
    sex: "1",
    avatar: "https://img0.baidu.com/it/u=1121602739,1172990093&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=378",
    userStatus: "0",
    remark: "熊出没",
    createTime: "2023-08-06 04:00:00"
  },
  {
    userId: 14,
    loginName: "Blackberry",
    userName: "熊大",
    userType: "1",
    email: "koi@qq.com",
    phone: "18666666666",
    sex: "1",
    avatar: "https://img1.baidu.com/it/u=1544796506,2220725573&fm=253&fmt=auto&app=120&f=JPEG?w=501&h=500",
    userStatus: "0",
    remark: "熊出没",
    createTime: "2023-08-07 04:00:00"
  },
  {
    userId: 15,
    loginName: "Blueberry",
    userName: "熊二",
    userType: "2",
    email: "koi@qq.com",
    phone: "18666666666",
    sex: "2",
    avatar: "https://img1.baidu.com/it/u=550431475,3093096287&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=514",
    userStatus: "0",
    remark: "熊出没",
    createTime: "2023-08-08 04:00:00"
  }
]);

// 查询参数
const searchParams = ref({
  pageNo: 1, // 第几页
  pageSize: 10, // 每页显示多少条
  loginName: "",
  userName: "",
  phone: ""
});
const total = ref<number>(0);
// 重置搜索参数
const resetSearchParams = () => {
  searchParams.value = {
    pageNo: 1,
    pageSize: 10,
    loginName: "",
    userName: "",
    phone: ""
  };
  dateRange.value = [];
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

import { koiDatePicker } from "@/utils/index.ts";
// 时间
const dateRange = ref();
/** @current-change：点击分页组件页码发生变化：例如：切换第2、3页 OR 上一页 AND 下一页 OR 跳转某一页 */
/** @size-change：点击分页组件下拉选中条数发生变化：例如：选择10条/页、20条/页等 */
// 分页查询，@current-change AND @size-change都会触发分页，调用后端分页接口
/** 数据表格 */
const handleListPage = async () => {
  total.value = 15;
  // try {
  //   loading.value = true;
  //   tableList.value = []; // 重置表格数据
  //   const res: any = await listPage(
  //     koiDatePicker(searchParams.value, dateRange.value)
  //   );
  //   console.log("用户数据表格数据->", res.data);
  //   tableList.value = res.data.records;
  //   total.value = res.data.total;
  //   loading.value = false;
  // } catch (error) {
  //   console.log(error);
  //   koiNoticeError("数据查询失败，请刷新重试🌻");
  // }
};

// 静态页面防止报错(可直接删除)
// @ts-ignore
const handleStaticPage = () => {
  listPage(koiDatePicker(searchParams.value, dateRange.value));
};

/** 数据表格[删除、批量删除等刷新使用] */
const handleTableData = async () => {
  try {
    const res: any = await listPage(koiDatePicker(searchParams.value, dateRange.value));
    // console.log("用户数据表格数据->", res.data);
    tableList.value = res.data.records;
    total.value = res.data.total;
  } catch (error) {
    console.log(error);
    koiNoticeError("数据查询失败，请刷新重试🌻");
  }
};

// 获取数据表格数据
onMounted(() => {
  handleListPage();
  handleDict1();
  handleDict2();
});

// 翻译数据[用户类型]
const userTypeOptions = ref();
/** 字典翻译tag */
const handleDict1 = async () => {
  try {
    userTypeOptions.value = [
      {
        dictLabel: "系统用户",
        dictValue: "1",
        dictTag: "",
        dictColor: ""
      },
      {
        dictLabel: "注册用户",
        dictValue: "2",
        dictTag: "warning",
        dictColor: ""
      }
    ];
    // const res: any = await listDataByType("sys-user-type");
    // console.log("字典数据", res.data);
    // userTypeOptions.value = res.data;
  } catch (error) {
    console.log(error);
    koiMsgError("数据字典查询失败，请刷新重试🌻");
  }
};

// 翻译数据[用户性别]
const userSexOptions = ref();
/** 字典翻译tag */
const handleDict2 = async () => {
  try {
    userSexOptions.value = [
      { dictLabel: "男", dictValue: "1", dictTag: "", dictColor: "" },
      { dictLabel: "女", dictValue: "2", dictTag: "danger", dictColor: "" },
      { dictLabel: "未知", dictValue: "3", dictTag: "info", dictColor: "" }
    ];
    // const res: any = await listDataByType("sys-user-sex");
    // console.log("字典数据", res.data);
    // userSexOptions.value = res.data;
  } catch (error) {
    console.log(error);
    koiMsgError("数据字典查询失败，请刷新重试🌻");
  }
};

const ids = ref([]); // 选中数组
const single = ref<boolean>(true); // 非单个禁用
const multiple = ref<boolean>(true); // 非多个禁用
/** 是否多选 */
const handleSelectionChange = (selection: any) => {
  // console.log(selection);
  ids.value = selection.map((item: any) => item.userId);
  single.value = selection.length != 1; // 单选
  multiple.value = !selection.length; // 多选
};

/** 添加 */
const handleAdd = () => {
  // 重置表单
  resetForm();
  // 标题
  title.value = "用户添加";
  form.value.userStatus = "0";
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
  title.value = "用户修改";
  const userId = row ? row.userId : ids.value[0];
  if (userId == null || userId == "") {
    koiMsgError("请选中需要修改的数据🌻");
  }
  console.log(userId);
  // 回显数据
  handleEcho(userId);
  koiDrawerRef.value.koiOpen();
  koiMsgSuccess("修改🌻");
};

/** 添加 AND 修改抽屉 */
const koiDrawerRef = ref();
// 标题
const title = ref("用户类型管理");
// form表单Ref
const formRef = ref<any>();
// form表单
let form = ref<any>({
  userTitle: "",
  userType: "",
  userStatus: "",
  avatar: "",
  phone: "",
  remark: ""
});
/** 清空表单数据 */
const resetForm = () => {
  form.value = {
    userTitle: "",
    userType: "",
    userStatus: "",
    avatar: "",
    phone: "",
    remark: ""
  };
};
/** 表单规则 */
const rules = reactive({
  userTitle: [{ required: true, message: "请输入用户名字", trigger: "change" }],
  userType: [{ required: true, message: "请输入用户类型", trigger: "change" }],
  userStatus: [{ required: true, message: "请输入选择用户状态", trigger: "change" }]
});

// 确定按钮是否显示loading
const confirmLoading = ref(false);
/** 确定  */
const handleConfirm = () => {
  if (!formRef.value) return;
  confirmLoading.value = true;
  (formRef.value as any).validate(async (valid: any) => {
    if (valid) {
      console.log("表单ID", form.value.userId);
      if (form.value.userId != null && form.value.userId != "") {
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
  let text = row.userStatus === "0" ? "启用" : "停用";
  koiMsgBox("确认要[" + text + "]-[" + row.userName + "]吗？")
    .then(async () => {
      resetForm();
      if (!row.userId || !row.userStatus) {
        koiMsgWarning("请选择需要修改的数据🌻");
        return;
      }
      try {
        await updateStatus(row.userId, row.userStatus);
        koiNoticeSuccess("修改成功🌻");
      } catch (error) {
        console.log(error);
        koiNoticeError("修改失败，请刷新重试🌻");
        handleTableData();
      }
    })
    .catch(() => {
      koiMsgError("已取消🌻");
    });
};

// 分配角色弹出框
const koiDialogRef = ref();
/** 分配角色 */
const handleAssignRoles = async () => {
  try {
    // 传递当前登录用户ID
    const res: any = await listNormalRole(1);
    transferLeftList.value = res.data.data1; // 左侧所有数据，右边出现一样的会自动进行去除
    transferRightList.value = res.data.data2;
  } catch (error) {
    console.log(error);
    koiMsgError("加载角色数据失败");
  }
  koiDialogRef.value.koiOpen();
};
// 右侧选中数据，必须是['1']数据
const transferRightList = ref(["1"]);
const transferLeftList = ref<any>([
  {
    label: "王者农药",
    value: "1"
  },
  {
    label: "QQ飞车",
    value: "2"
  },
  {
    label: "举例数据",
    value: "3"
  },
  {
    label: "三国杀",
    value: "4"
  },
  {
    label: "和平精英",
    value: "5"
  },
  {
    label: "刺激战场",
    value: "6"
  }
]);

// 右侧列表元素变化时触发
const handleTransferChange = async (value: any) => {
  console.log(value);
  try {
    await assignUserRole(value);
    koiNoticeSuccess("分配角色成功🌻");
  } catch (error) {
    console.log(error);
    handleAssignRoles();
    koiMsgError("分配角色失败，请重试");
  }
};

/** 删除 */
const handleDelete = (row: any) => {
  const id = row.userId;
  if (id == null || id == "") {
    koiMsgWarning("请选中需要删除的数据🌻");
  }
  koiMsgBox("您确认需要删除用户名称[" + row.userTitle + "]么？")
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

<style lang="scss" scoped>
// 穿梭框高度调整
:deep(.el-transfer-panel__body) {
  height: 400px;
}
</style>
