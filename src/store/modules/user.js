import { login } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router from "@/router";

// 状态
const state = {
  token: getToken(),
};
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token;
    setToken(token);
  },
  removeToken(state) {
    state.token = null;
    removeToken();
  },
};
// 执行异步
const actions = {
  async loginIn({ commit }, token) {
    const res = await login(token);
    console.log(res.data.data.token);
    // token = res.token;
    // console.log(token);
    commit("setToken", res.data.data.token);
  },
  logOut(context) {
    context.commit("removeToken");
    router.push("/login");
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
