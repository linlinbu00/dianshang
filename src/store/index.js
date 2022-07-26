import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: {
    user,
  },
});
export default store;
