import axios from "axios";
import store from "@/store/index";
import { Message } from "element-ui";
const request = axios.create({
  baseURL: "http://liufusong.top:8899/api/private/v1/",
});
// 请求拦截器

request.interceptors.request.use(
  (config) => {
    // config 当前的配置项
    // 设置token
    const token = store.getters.token;
    // console.log(token);
    // 判断token是否存在
    if (token) {
      // 存在--添加请求头
      config.headers.Authorization = token;
      // console.log(token);
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// 响应拦截器
request.interceptors.response.use((res) => {
  //   const {
  //     data: {
  //       data: { token },
  //     },
  //   } = res;
  if (res.status === 200) {
    return res;
  }
  Message.error("系统错误");
  return Promise.reject("系统错误");
});
export default request;
