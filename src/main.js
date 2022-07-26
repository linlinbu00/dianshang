import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/global.css";
// 安装 引入 引入样式文件 注册
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/fonts/iconfont.css";
import "@/permission"; // 路由守卫
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
