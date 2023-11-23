import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// keepAlive 组件name
import vueSetupExtend from "vite-plugin-vue-setup-extend";
// 引入svg需要的插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import Unocss from "unocss/vite";
// 数据mock配置
import { viteMockServe } from "vite-plugin-mock";
// @ts-ignore gzip压缩
import viteCompression from "vite-plugin-compression";
import path from "path";

// https://vitejs.dev/config/
// @ts-ignore 配置mock根据官网，这里写法将改成箭头函数
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd()); // 获取配置文件别名配置
  return {
    plugins: [
      vue(),
      Unocss(),
      vueSetupExtend(),
      viteCompression(),
      createSvgIconsPlugin({
        // 配置SVG图片
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      // 配置mock
      viteMockServe({
        // 解析根目录下的mock文件夹
        mockPath: "mock",
        localEnabled: command === "serve", // 保证开发阶段可以使用mock接口
        supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
        watchFiles: true // 监视文件更改 更改mock的时候，不需要重新启动编译
      })
    ],
    resolve: {
      // 配置路径别名
      alias: {
        "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
        "~": path.resolve("./src")
      }
    },
    css: {
      // css全局变量使用，@/styles/variable.scss文件
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    },
    server: {
      host: "0.0.0.0", // 配置localhost、本机IP地址
      port: 5730, // 端口号
      hmr: true, // 热更新
      open: true, // 自动打开
      proxy: {
        // 代理跨域
        [env.VITE_SERVER]: {
          // 配置哪个环境下的
          target: env.VITE_SERVER,
          rewrite: path => path.replace(/^\/koi-api/, ""), // 路径重写，例如：将路径中包含dev-api字段替换为空。注意：只有请求真实后端接口才会有用，使用mock接口还是得带koi
          // 允许跨域
          changeOrigin: true
        }
      }
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: env.VITE_DELETE_CONSOLE,
          drop_debugger: env.VITE_DELETE_CONSOLE
        }
      }
    }
  };
});
