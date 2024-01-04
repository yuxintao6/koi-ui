<template>
  <!-- 最外层的大盒子 -->
  <div class="bigBox">
    <div class="box" ref="box" v-if="!isMobile">
      <!-- 滑动盒子 -->
      <div class="slide-box" ref="slideRef">
        <h1 class="slide-title" v-if="switchLock">欢迎登录-KOI-ADMIN🌻</h1>
        <h1 class="slide-title" v-if="!switchLock">欢迎注册-KOI-ADMIN🌻</h1>
        <p class="slide-title">JOIN US</p>
        <div class="img-box">
          <img class="select-none" :src="switchLogo" alt="LOGO" />
        </div>
        <div class="slide-button" v-if="switchLock" @click="koiSwitchRegister">还没有账户？点击注册🍀</div>
        <div class="slide-button" v-if="!switchLock" @click="koiSwitchLogin">已存在账户？点击登录🍀</div>
      </div>

      <!-- 注册盒子 -->
      <div class="register-form">
        <!-- 标题盒子 -->
        <div class="register-title">
          <h1>用户注册🌻</h1>
        </div>
        <!-- 输入框盒子 -->
        <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules">
          <el-form-item prop="regUserName">
            <el-input type="text" placeholder="请输入用户名" :suffix-icon="User" v-model="registerForm.regUserName" />
          </el-form-item>
          <el-form-item prop="regPwd">
            <el-input type="password" placeholder="请输入密码" show-password :suffix-icon="Lock" v-model="registerForm.regPwd" />
          </el-form-item>
          <el-form-item prop="regConfirmPwd">
            <el-input
              type="password"
              placeholder="请输入确认密码"
              show-password
              :suffix-icon="Lock"
              v-model="registerForm.regConfirmPwd"
            />
          </el-form-item>
          <el-form-item prop="regCode">
            <el-select v-model="registerForm.regCode" filterable placeholder="请选择管理员">
              <el-option v-for="item in adminOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 注册按钮盒子 -->
        <div class="register-btn-box">
          <el-button class="register-btn" v-if="!loading" @click="handleRegister">注册🌻</el-button>
          <el-button class="register-disabled-btn" v-if="loading" :loading="loading">注册中</el-button>
        </div>
      </div>

      <!-- 登录盒子 -->
      <div class="login-form">
        <!-- 标题盒子 -->
        <div class="login-title">
          <h1>LOGIN🍀</h1>
        </div>
        <!-- 输入框盒子 -->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
          <el-form-item prop="userName">
            <el-input type="text" placeholder="请输入用户名" :suffix-icon="User" v-model="loginForm.loginName" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" show-password :suffix-icon="Lock" v-model="loginForm.password" />
          </el-form-item>
          <el-form-item prop="securityCode">
            <el-input
              type="text"
              placeholder="请输入验证码"
              :suffix-icon="Open"
              v-model="loginForm.securityCode"
              @keydown.enter="handleKoiLogin"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <img class="w-100px h-30px" :src="loginForm.captchaPicture" @click="handleCaptcha" />
            <div class="text-gray-400 text-12px m-l-10px select-none" @click="handleCaptcha">看不清，换一张</div>
          </el-form-item>
        </el-form>
        <!-- 登录按钮盒子 -->
        <div class="login-btn-box">
          <el-button class="login-btn" v-if="!loading" @click="handleKoiLogin">登录🌻</el-button>
          <el-button class="login-disabled-btn" v-if="loading" :loading="loading">登录中</el-button>
        </div>
      </div>
    </div>

    <!-- 备案号-->
    <div class="beianhao" v-if="!isMobile">
      <a href="https://beian.miit.gov.cn/" target="_blank">网站备案号：豫ICP备2022022094号-1</a>
    </div>

    <!-- 移动端登录盒子 -->
    <div class="login-form" v-if="isMobile">
      <!-- 标题盒子 -->
      <div class="login-title">
        <h1>LOGIN🍀</h1>
      </div>
      <!-- 输入框盒子 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <el-form-item prop="userName">
          <el-input type="text" placeholder="请输入用户名" :suffix-icon="User" v-model="loginForm.loginName" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" show-password :suffix-icon="Lock" v-model="loginForm.password" />
        </el-form-item>
        <el-form-item prop="securityCode">
          <el-input
            type="text"
            placeholder="请输入验证码"
            :suffix-icon="Open"
            v-model="loginForm.securityCode"
            @keydown.enter="handleKoiLogin"
          ></el-input>
          <el-form-item>
            <div class="flex flex-items-center m-t-10px">
              <img class="w-100px h-30px" :src="loginForm.captchaPicture" @click="handleCaptcha" />
              <div class="text-gray-400 w-100px text-12px m-l-10px select-none" @click="handleCaptcha">看不清，换一张</div>
            </div>
          </el-form-item>
        </el-form-item>
      </el-form>
      <!-- 按钮盒子 -->
      <div class="login-btn-box">
        <el-button class="login-btn" v-if="!loading" @click="handleKoiLogin">登录🌻</el-button>
        <el-button class="login-disabled-btn" v-if="loading" :loading="loading">登录中</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock, Open } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { getAssets } from "@/utils/index.ts";

/** 适配移动端开始 */
import { useScreenStore } from "@/hooks/screen/index.ts";
// 获取当前为[移动端、IPad、PC端]仓库，阔以使用 watchEffect(() => {}) 进行监听。
const { isMobile } = useScreenStore();
/** 适配移动端结束 */

import type { FormInstance, FormRules } from "element-plus";
import { koiMsgError, koiNoticeSuccess, koiMsgSuccess } from "@/utils/koi.ts";
import { useRouter } from "vue-router";
import { koiMsgWarning } from "@/utils/koi.ts";
// import { koiLogin } from "@/api/mock/index.ts";
import authLogin from "@/assets/json/authLogin.json";
import useUserStore from "@/stores/modules/user.ts";
import useKeepAliveStore from "@/stores/modules/keepAlive.ts";
import { HOME_URL } from "@/config/index.ts";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter.ts";
import useTabsStore from "@/stores/modules/tabs.ts";

const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();
const router = useRouter();

/** 用户登录代码 */
const loginFormRef = ref<FormInstance>();
const loading = ref(false);
interface ILoginUser {
  loginName: string;
  password: string | number;
  securityCode: string | number;
  codeKey: string | number;
  captchaPicture: any;
}

const loginForm = reactive<ILoginUser>({
  loginName: "koi",
  password: "123456",
  securityCode: "1234",
  codeKey: "",
  captchaPicture: "https://img2.baidu.com/it/u=3634763958,804148936&fm=253&fmt=auto&app=138&f=JPEG?w=942&h=298"
});

const loginRules = reactive<FormRules<ILoginUser>>({
  loginName: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  securityCode: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
});
/** 获取验证码 */
const handleCaptcha = async () => {
  // try {
  //   const res: any = await getCaptcha();
  //   loginForm.codeKey = res.data.codeKey;
  //   loginForm.captchaPicture = res.data.captchaPicture;
  // } catch (error) {
  //   console.log(error);
  //   koiMsgError("验证码获取失败🌻");
  // }
};

/** 登录 */
const handleKoiLogin = () => {
  if (loginForm.loginName != "koi") {
    koiMsgWarning("用户名必须koi！");
    return false;
  }

  if (!loginFormRef.value) return;
  (loginFormRef.value as any).validate(async (valid: any, fields: any) => {
    // @ts-ignore
    const loginName = loginForm.loginName;
    // @ts-ignore
    const password = loginForm.password;
    // @ts-ignore
    const securityCode = loginForm.securityCode;
    if (valid) {
      loading.value = true;
      try {
        // 1、执行登录接口
        // const res: any = await koiLogin({ loginName, password, securityCode });
        // console.log("tokenValue", res.data.tokenValue);
        // userStore.setToken(res.data.tokenValue);
        userStore.setToken(authLogin.data.tokenValue);

        // 2、添加动态路由 AND 用户按钮 AND 角色信息 AND 用户个人信息
        await initDynamicRouter();

        // 3、清空 tabs数据、keepAlive缓存数据
        tabsStore.setTab([]);
        keepAliveStore.setKeepAliveName([]);

        // 4、跳转到首页
        loading.value = false;
        koiMsgSuccess("登录成功🌻");
        router.push(HOME_URL);

        // 等待1秒关闭loading
        // let loadingTime = 1;
        // setInterval(() => {
        //   loadingTime--;
        //   if (loadingTime === 0) {
        //     koiNoticeSuccess("登录成功🌻");
        //     // Token过期，跳转到上次记录的页面
        //     const redirectPath = route.query.redirect as string | undefined;
        //     loading.value = false;
        //     router.push(redirectPath || "/home");
        //   }
        // }, 1000);
        // }
      } catch (error) {
        // 等待1秒关闭loading
        let loadingTime = 1;
        setInterval(() => {
          loadingTime--;
          if (loadingTime === 0) {
            loading.value = false;
          }
        }, 1000);
      }
    } else {
      console.log("登录校验失败", fields);
      koiMsgError("校验失败，信息填写有误🌻");
    }
  });

  /* 静态资源版本进入
  // 等待1秒进入
  let loadingTime = 1;
  setInterval(() => {
    loadingTime--;
    if (loadingTime === 0) {
      loading.value = false;
      if (!userFormRef.value) return;
      (userFormRef.value as any).validate((valid: any, fields: any) => {
        console.log("login-valid", valid);
        if (valid) {
          console.log("登录submit!", valid);
          koiNoticeSuccess("登录成功🌻");
          router.push("/home");
        } else {
          console.log("error submit!", fields);
        }
      });
    }
  }, 1000);
  */
};

// const router = useRouter()

const registerFormRef = ref<FormInstance>();
interface IRegisterForm {
  regUserName: any;
  regPwd: string | number;
  regConfirmPwd: string | number;
  regCode?: string;
}

/** 注册代码 */
const registerForm = reactive<IRegisterForm>({
  regUserName: "YU-ADMIN🌻",
  regPwd: "123456",
  regConfirmPwd: "1234567",
  regCode: "1"
});
const registerRules = {
  regUserName: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  regPwd: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  regConfirmPwd: [{ required: true, message: "确认密码不能为空", trigger: "blur" }],
  regCode: [{ required: true, message: "审核员不能为空", trigger: "blur" }]
};

const adminOptions = ref([
  {
    value: "1",
    label: "YU-ADMIN🌻"
  },
  {
    value: "2",
    label: "于金金🍀"
  },
  {
    value: "3",
    label: "张大仙🌸"
  },
  {
    value: "4",
    label: "蕾姆🌹"
  },
  {
    value: "5",
    label: "橙留香🌵"
  },
  {
    value: "6",
    label: "菠萝吹雪🌵"
  },
  {
    value: "7",
    label: "陆小果🌵"
  }
]);

// 进入页面加载管理员信息
onMounted(() => {
  // 获取验证码
  handleCaptcha();
  // 加载注册管理员信息
  listAdminInfo();
});

// 加载管理员信息
const listAdminInfo = () => {
  console.log("加载管理员信息");
  // koi.get("/listAdminInfo").then(res=>{
  //     if(res.code=="200"){
  //         adminOptions = res.data
  //     }
  // })
};
/** 注册 */
const handleRegister = () => {
  if (registerForm.regPwd != registerForm.regConfirmPwd) {
    koiMsgError("两次密码输入不同，请检查后重新注册！");
    return false;
  }
  loading.value = true;
  // 等待1秒进入
  let loadingTime = 1;
  setInterval(() => {
    loadingTime--;
    if (loadingTime === 0) {
      loading.value = false;
      if (!registerFormRef.value) return;
      (registerFormRef.value as any).validate((valid: any, fields: any) => {
        if (valid) {
          console.log("注册submit!", valid);
          koiNoticeSuccess("注册成功，请前去登录🌻");
          router.push("/login");
        } else {
          console.log("error submit!", fields);
        }
      });
    }
  }, 1000);
  // koi.post("/user/register", user).then(res => {
  //   if (res.code === "200") {
  //     koiMsgSuccess("申请成功，请耐心等待管理员审核！")
  //     regUser = {
  //       regUsername: '',
  //       regRePwd: '',
  //       regPwd: '',
  //       regCode: ""
  //     }
  //     changeToLogin()
  //   }
  //   if (res.code === "400") {
  //     alert(res.msg)
  //     return
  //   }
  // })
};

// 切换开关
const switchLock = ref(true);
// 切换Logo
const switchLogo = ref(`${getAssets("images/login/waoku.jpg")}`);
// 根据ref设置css
const slideRef = ref();
// 切换按钮背景颜色
const switchBtnBgAndslideTitle = ref("#FE3E7C");
// 切换按钮悬浮背景颜色
const switchBtnHoverBg = ref("#F9739E");
/** 切换登录 */
const koiSwitchLogin = () => {
  switchLock.value = true;
  switchLogo.value = `${getAssets("images/login/waoku.jpg")}`;
  slideRef.value.style.background = "#edd4dc";
  slideRef.value.style.transform = "translateX(0%)"; // 设置元素的 transform 属性来触发过渡
  switchBtnBgAndslideTitle.value = "#FE3E7C";
  switchBtnHoverBg.value = "#F9739E";
};

/** 切换注册 */
const koiSwitchRegister = () => {
  switchLock.value = false;
  switchLogo.value = `${getAssets("images/login/wuwu.jpg")}`;
  slideRef.value.style.background = "#c9e0ed";
  slideRef.value.style.transform = "translateX(100%)"; // 设置元素的 transform 属性来触发过渡
  switchBtnBgAndslideTitle.value = "#409EFF";
  switchBtnHoverBg.value = "#79BBFF";
};
</script>

<style lang="scss" scoped>
/** 备案号 */
.beianhao {
  position: absolute;
  bottom: 10px;
  left: 45%;
  font-size: 12px;
  font-weight: bold;
}

/** 最外层大盒子 */
.bigBox {
  display: flex;

  /* 溢出隐藏 */
  height: 100vh;
  overflow-x: hidden;

  /* 渐变方向从左到右 */
  background: linear-gradient(to right, rgb(247 209 215), rgb(191 227 241));
}

/* 最外层的大盒子 */
.box {
  /* 相对定位 */
  position: relative;
  z-index: 2;
  display: flex;
  min-width: 720px;
  min-height: 400px;
  margin: auto;

  /* 设置边框 */
  border: 1px solid rgb(255 255 255 / 60%);

  /* 设置圆角 */
  border-radius: 8px;

  /* 设置盒子阴影 */
  box-shadow: 2px 1px 19px rgb(0 0 0 / 10%);
}

/* 滑动的盒子 */
.slide-box {
  /* 绝对定位 */
  position: absolute;

  /* 距离大盒子顶部为0 */
  top: 0;

  /* 距离大盒子左侧为0 */
  left: 0;
  z-index: 10;

  /* 宽度为大盒子的一半 */
  width: 50%;
  height: 100%;
  font-size: 16px;
  background-color: #edd4dc;
  border-radius: 4px;
  box-shadow: 2px 1px 19px rgb(0 0 0 / 10%);

  /* 动画过渡，先加速再减速 */
  transition: 0.5s ease-in-out;
}

/* 滑动盒子的标题 */
.slide-box h1 {
  margin-top: 50px;
  font-weight: bold;
  text-align: center;

  /* 文字阴影 */
  text-shadow: 4px 4px 3px rgb(0 0 0 / 10%);

  /* 文字间距 */
  letter-spacing: 2px;

  /* 禁止选中 */
  user-select: none;
}

/* 滑动盒子的文字 */
.slide-box p {
  height: 30px;
  margin: 20px 0;
  font-weight: bold;
  line-height: 30px;
  text-align: center;
  text-shadow: 4px 4px 3px rgb(0 0 0 / 10%);

  /* 禁止选中 */
  user-select: none;
}

/* 滑动盒子的点击切换变化文字颜色 */
.slide-title {
  font-size: 20px;
  color: v-bind(switchBtnBgAndslideTitle);
}

/* LOGO图片盒子 */
.img-box {
  width: 80px;
  height: 80px;
  margin: auto;
  margin-top: 30px;
  overflow: hidden;

  /* 设置用户禁止选中 */
  user-select: none;

  /* 设置为圆形 */
  border-radius: 50%;
  box-shadow: 4px 4px 3px rgb(0 0 0 / 10%);
}

/* LOGO图片 */
.img-box img {
  width: 100%;

  /* 动画过渡，先加速再减速 */
  transition: 0.5s ease-in-out;
}

/* 没有账号去登录按钮 */
.slide-button {
  width: 160px;
  padding: 8px 16px;
  margin: auto;
  margin-top: 60px;
  font-size: 14px;
  line-height: 14px;
  color: #ffffff;
  cursor: pointer;

  /* 设置用户禁止选中 */
  user-select: none;
  background: v-bind(switchBtnBgAndslideTitle);
  border: 1px solid rgb(255 255 255);
  border-radius: 20px;
  box-shadow: 4px 4px 3px rgb(0 0 0 / 10%);
  &:hover {
    background: v-bind(switchBtnHoverBg);
  }
}

/* 登录和注册盒子 */
.login-form,
.register-form {
  flex: 1; // 各占一半
  height: 100%;
}

/* 登录标题盒子 */
.login-title {
  height: 90px;
  line-height: 90px;
}

/* 登录标题 */
.login-title h1 {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
  text-align: center;
  text-shadow: 4px 4px 3px rgb(0 0 0 / 10%);
  letter-spacing: 5px;

  /* 禁止选中 */
  user-select: none;
}

/* 输入框盒子 */
.el-form {
  display: flex;

  /* 纵向布局 */
  flex-direction: column;

  /* 水平居中 */
  align-items: center;
}
.el-form-item {
  width: 60%;
}
.el-select {
  width: 100%;
}

/* 登录盒子位置 */
.login-btn-box {
  display: flex;
}

/* 登录按钮 */
.login-btn {
  height: 32px;
  padding: 8px 16px;
  margin: auto;
  font-size: 14px;
  line-height: 14px;
  color: #ffffff;
  cursor: pointer;

  /* 设置用户禁止选中 */
  user-select: none;
  background: #409eff;
  border: 1px solid rgb(255 255 255);
  border-radius: 20px;
  box-shadow: 4px 4px 3px rgb(0 0 0 / 10%);
  &:hover {
    background: #67aff7;
  }
}

/* 登录中按钮 */
.login-disabled-btn {
  height: 32px;
  padding: 8px 16px;
  margin: auto;
  font-size: 14px;
  line-height: 14px;
  color: #ffffff;
  pointer-events: none;
  cursor: pointer;

  /* 设置用户禁止选中 */
  user-select: none;
  background: #67aff7;
  border: 1px solid rgb(255 255 255);
  border-radius: 20px;
  box-shadow: 4px 4px 3px rgb(0 0 0 / 10%);
}

/* 注册标题盒子 */
.register-title {
  height: 98px;
  line-height: 98px;
}

/* 注册标题 */
.register-title h1 {
  font-size: 22px;
  font-weight: bold;
  color: #fe3e7c;
  text-align: center;
  text-shadow: 4px 4px 3px rgb(0 0 0 / 10%);
  letter-spacing: 5px;

  /* 禁止选中 */
  user-select: none;
}

/* 注册按钮盒子 */
.register-btn-box {
  display: flex;
}

/* 注册按钮 */
.register-btn {
  height: 32px;
  padding: 8px 16px;
  margin: auto;
  font-size: 14px;
  line-height: 14px;
  color: #ffffff;
  cursor: pointer;

  /* 设置用户禁止选中 */
  user-select: none;
  background: #fe3e7c;
  border: 1px solid rgb(255 255 255);
  border-radius: 20px;
  box-shadow: 4px 4px 3px rgb(0 0 0 / 10%);
  &:hover {
    background: #f9739e;
  }
}

/* 注册中按钮 */
.register-disabled-btn {
  height: 32px;
  padding: 8px 16px;
  margin: auto;
  font-size: 14px;
  line-height: 14px;
  color: #ffffff;
  cursor: pointer;

  /* 设置用户禁止选中 */
  user-select: none;
  background: #f9739e;
  border: 1px solid rgb(255 255 255);
  border-radius: 20px;
  box-shadow: 4px 4px 3px rgb(0 0 0 / 10%);
}

/** 输入框变黑 */
:deep(.el-input__wrapper) {
  @apply dark:bg-#1D1E1F;
}
</style>
