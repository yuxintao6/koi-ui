// @ts-nocheck
// 工具类提示信息
import { ElNotification, ElMessageBox, ElMessage } from "element-plus";

/** 封装任意提示类型通知，默认info */
export function koiNotice(message: any, title = "温馨提示", duration = 2000, type = "info", parseHtml = false) {
  ElNotification.closeAll();
  ElNotification({
    // @ts-ignore
    message,
    title,
    type,
    duration: duration,
    showClose: true,
    dangerouslyUseHTMLString: parseHtml
  });
}
/** 封装提示通知，默认success */
export function koiNoticeSuccess(message: any, title = "温馨提示", duration = 2000, type = "success", parseHtml = false) {
  ElNotification.closeAll();
  ElNotification({
    // @ts-ignore
    message,
    type,
    title,
    duration: duration,
    showClose: true,
    dangerouslyUseHTMLString: parseHtml
  });
}
/** 封装提示通知，默认error */
export function koiNoticeError(message: any, title = "温馨提示", duration = 2000, type = "error", parseHtml = false) {
  ElNotification.closeAll();
  ElNotification({
    // @ts-ignore
    message,
    type,
    title,
    duration: duration,
    showClose: true,
    dangerouslyUseHTMLString: parseHtml
  });
}
/** 封装提示通知，默认warning */
export function koiNoticeWarning(message: any, title = "温馨提示", duration = 2000, type = "warning", parseHtml = false) {
  ElNotification.closeAll();
  ElNotification({
    // @ts-ignore
    message,
    title,
    type,
    duration: duration,
    showClose: true,
    dangerouslyUseHTMLString: parseHtml
  });
}
/** 封装提示通知，默认info */
export function koiNoticeInfo(message: any, title = "温馨提示", duration = 2000, type = "info", parseHtml = false) {
  ElNotification.closeAll();
  ElNotification({
    // @ts-ignore
    message,
    title,
    type,
    duration: duration,
    showClose: true,
    dangerouslyUseHTMLString: parseHtml
  });
}

/** 封装提示信息，默认info */
export function koiMsg(message: any, duration = 2000, type = "info", parseHtml = false) {
  ElMessage.closeAll();
  ElMessage({
    // @ts-ignore
    message,
    type,
    duration: duration,
    showClose: true,
    dangerouslyUseHTMLString: parseHtml
  });
}
/** 封装提示信息，默认success */
export function koiMsgSuccess(message: any, duration = 2000, type = "success", parseHtml = false) {
  ElMessage.closeAll();
  ElMessage({
    // @ts-ignore
    message,
    type,
    duration: duration,
    showClose: true,
    dangerouslyUseHTMLString: parseHtml
  });
}
/** 封装提示信息，默认error */
export function koiMsgError(message: any, duration = 2000, type = "error", parseHtml = false) {
  ElMessage.closeAll();
  ElMessage({
    // @ts-ignore
    message,
    type,
    duration: duration,
    showClose: true,
    dangerouslyUseHTMLString: parseHtml
  });
}
/** 封装提示信息，默认warning */
export function koiMsgWarning(message: any, duration = 2000, type = "warning", parseHtml = false) {
  ElMessage.closeAll();
  ElMessage({
    // @ts-ignore
    message,
    type,
    duration: duration,
    showClose: true,
    dangerouslyUseHTMLString: parseHtml
  });
}
/** 封装提示信息，默认info */
export function koiMsgInfo(message: any, duration = 2000, type = "info", parseHtml = false) {
  ElMessage.closeAll();
  ElMessage({
    // @ts-ignore
    message,
    type,
    duration: duration,
    showClose: true,
    dangerouslyUseHTMLString: parseHtml
  });
}

/** 封装确认信息，默认warning */
export function koiMsgBox(
  message: any = "您确定进行关闭么？",
  title: string = "温馨提示：",
  confirmButtonText: string = "确定",
  cancelButtonText: string = "取消",
  type: string = "warning"
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    ElMessageBox.confirm(message, title, {
      confirmButtonText,
      cancelButtonText,
      type,
      draggable: true,
      dangerouslyUseHTMLString: true
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}

/** 封装确认信息，默认warning  */
export function koiMsgBoxHtml(
  message: string = `<p style="color: teal">您确定进行关闭么？</p>`,
  title: string = "温馨提示：",
  confirmButtonText: string = "确定",
  cancelButtonText: string = "取消",
  type: string = "warning"
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    ElMessageBox.confirm(message, title, {
      confirmButtonText,
      cancelButtonText,
      type,
      draggable: true,
      dangerouslyUseHTMLString: true
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}

/** Prompt 类型的消息框 */
export function koiMsgBoxPrompt(
  // @ts-ignore
  message: any = "请输入需要修改的数据？",
  title: string = "温馨提示：",
  confirmButtonText: string = "确定",
  cancelButtonText: string = "取消",
  type: string = "info",
  inputPattern: string = "",
  inputErrorMessage: string = "无效输入"
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    ElMessageBox.prompt(message, title, {
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      type,
      inputPattern: inputPattern,
      inputErrorMessage: inputErrorMessage,
      draggable: true
    })
      .then((res: any) => {
        // 返回值获取通过[res.value]
        resolve(res);
      })
      .catch(() => {
        reject(false);
      });
  });
}

/** Alert 类型的消息框 */
export function koiMsgBoxAlert(
  // @ts-ignore
  message: any = "请输入需要修改的数据？",
  title: string = "温馨提示：",
  confirmButtonText: string = "确定",
  type: string = "info"
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    ElMessageBox.alert(message, title, {
      confirmButtonText: confirmButtonText,
      type,
      draggable: true
    })
      .then(() => {
        // 返回值获取通过[res.value]
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}
