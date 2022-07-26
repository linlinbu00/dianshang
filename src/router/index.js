import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      path: "/login",
    },
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
  },
  {
    path: "/home",
    component: () => import("@/views/home"),
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        component: () => import("@/views/home/welcome"),
      },
      {
        path: "/users",
        component: () => import("@/views/home/user"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
