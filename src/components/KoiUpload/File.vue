<template>
  <div>
    <el-upload
      :file-list="koiFileList"
      :multiple="props.isMultiple"
      :limit="props.limit"
      :accept="props.acceptType"
      :auto-upload="false"
      :show-file-list="false"
      :disabled="props.fileDisabled"
      :on-change="handleChange"
      :folderName="folderName"
    >
      <div class="el-upload-text">
        <el-icon size="16"><Upload /></el-icon>
        <span>上传文件</span>
      </div>
    </el-upload>
    <div class="template-list">
      <div class="template" v-for="(item, index) in koiFileList" :key="index">
        <el-icon size="16"><Link /></el-icon>
        <span class="document-name">{{ item.name }}</span>
        <span v-if="!props.fileDisabled">
          <el-icon size="16" @click="removeFile(item.url, index)">
            <Close />
          </el-icon>
        </span>
        <!-- 默认不显示下载 -->
        <span v-if="isDownLoad" style="padding-left: 5px">
          <el-icon size="16" @click="handleDownLoad(item.url)"><Download /></el-icon>
        </span>
      </div>
    </div>
    <span class="file-tips">
      <slot name="tip"> 支持{{ acceptTypes }}；文件大小不能超过{{ props.fileSize }}M；最多上传{{ props.limit }}个； </slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { ElLoading } from "element-plus";
import { koiNoticeSuccess, koiNoticeError, koiMsgWarning, koiMsgBoxAlert } from "@/utils/koi.ts";
import koi from "@/utils/axios.ts";
const emits = defineEmits(["fileSuccess", "fileRemove", "update:koiFileList"]);
interface Props {
  acceptType?: string; // 上传文件类型
  acceptTypes?: string; // 描述 - 上传文件类型
  isMultiple?: boolean; //   是否可批量上传
  limit?: number; // 允许上传文件的最大数量
  fileDisabled?: boolean; // 是否禁用上传
  fileSize?: number; // 文件大小
  action?: string;
  fileList?: any; // 回显的文件
  isDownLoad?: boolean; // 是否可以下载
  folderName?: string; // 后端文件夹名称
}
// 接收父组件传递过来的参数
const props = withDefaults(defineProps<Props>(), {
  acceptType: ".xls,.xlsx,.pdf,.doc,.docx,.txt,.jar,.zip",
  acceptTypes: "xls/xlsx/pdf/doc/docx/txt/jar/zip",
  isMultiple: true,
  limit: 5,
  fileDisabled: false,
  fileSize: 20,
  action: "/koi/file/uploadFile",
  fileList: [],
  isDownLoad: false,
  folderName: "files"
});
let koiFileList = ref<any>([]);
// 父组件传递回显数据
koiFileList.value = props.fileList;
// alert(JSON.stringify(props.fileList)); // 传递回显数据
// 修改进行回显的时候使用
watch(
  () => [props.fileList],
  () => {
    // 父组件传递回显数据
    koiFileList.value = props.fileList;
  }
);
// const handleExceed = () => {
//   koiMsgWarning(`当前最多只能上传 ${props.limit} 个，请移除后上传！`)
// }
/**
 * 文件变化handleChange 这里监听上传文件的变化上传一个，执行一下后端上传单个文件请求方法。
 */
const handleChange = async (file: any) => {
  // 防止多次执行change
  const rawFile = file.raw;
  const list = props.acceptTypes.split("/");
  let acceptTypeList = list.map((item: string) => {
    return getType(item);
  });
  // 如果要检索的字符串值没有出现，则该方法返回 -1
  const isString = acceptTypeList.filter((item: string) => {
    return rawFile.type.indexOf(item) > -1;
  });
  // 用于校验是否符合上传条件
  const type = props.acceptTypes.replace("/", ", ");
  if (isString.length < 1) {
    koiMsgWarning(`仅支持格式为${type}的文件`);
    return false;
  } else if (rawFile.size / 1024 / 1024 > props.fileSize) {
    koiMsgWarning(`文件大小不能超过${props.fileSize}MB!`);
    const arr = [...koiFileList.value];
    koiFileList.value = arr.filter((item: any) => {
      return item.uid != rawFile.uid;
    });
    return false;
  } else {
    let formData = new FormData();
    formData.append("file", rawFile);
    formData.append("fileType", "2");
    const loadingInstance = ElLoading.service({
      text: "正在上传",
      background: "rgba(0,0,0,.2)"
    });
    // 上传到服务器上面
    const requestURL: string = props.action;
    koi
      .post(requestURL + "/" + props.fileSize + "/" + props.folderName, formData)
      .then((res: any) => {
        loadingInstance.close();
        let fileMap = res.data;
        koiFileList.value.push({
          name: fileMap.fileName,
          url: fileMap.filePath
        });
        emits("update:koiFileList", koiFileList.value);
        emits("fileSuccess", fileMap);
        koiNoticeSuccess(`文件上传成功🌻`);
      })
      .catch(error => {
        console.log("文件上传", error);
        loadingInstance.close();
        koiNoticeError(`文件上传失败🌻`);
      });
  }
  return true;
};

// 校验上传文件格式
const getType = (acceptType: string) => {
  let val = "";
  switch (acceptType) {
    case "xls":
      val = "excel";
      break;
    case "doc":
      val = "word";
      break;
    case "pdf":
      val = "pdf";
      break;
    case "zip":
      val = "zip";
      break;
    case "xlsx":
      val = "sheet";
      break;
    case "pptx":
      val = "presentation";
      break;
    case "docx":
      val = "document";
      break;
    case "text":
      val = "text";
      break;
  }
  return val;
};

// 移除文件
const removeFile = (url: string, index: number) => {
  koiFileList.value.splice(index, 1);
  emits("update:koiFileList", koiFileList.value);
  emits("fileRemove", url);
};

// 下载
const handleDownLoad = (url: string) => {
  koiMsgBoxAlert("根据此地址浏览器访问自行下载：" + url);
  // window.open(url);
};
</script>

<style lang="scss" scoped>
.el-upload-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 106px;
  height: 32px;
  color: var(--el-color-primary);

  /* 设置用户禁止选中 */
  user-select: none;
  border: 2px dashed var(--el-color-primary);
  border-radius: 6px;
  img {
    display: block;
    width: 14px;
    height: 14px;
  }
  span {
    padding-left: 6px;
    font-family: "PingFangSC-Regular, PingFang SC";
    font-size: 14px;
    font-weight: 500;
  }
}
.template-list {
  padding-bottom: 4px;
}
.template {
  display: flex;
  align-items: center;
  padding: 5px 0;
  span {
    line-height: 10px;
  }
  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  .document-name {
    margin-right: 12px;
    font-size: 14px;
  }
}
.file-tips {
  font-family: "PingFangSC-Regular, PingFang SC";
  font-size: 12px;
  color: var(--el-color-primary);
}
</style>
