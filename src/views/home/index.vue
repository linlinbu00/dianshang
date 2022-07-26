<template>
  <el-container class="container">
    <el-header>
      <div class="left">
        <img
          src="http://liufusong.top/hm-admin/img/heima.b5a855ee.png"
          alt=""
        />
        <span>杭州黑马后台管理系统</span>
      </div>
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isShowCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggle">|||</div>
        <el-menu
          router
          :collapse-transition="false"
          :collapse="isShowCollapse"
          unique-opened
          background-color="#333744"
          text-color="#fff"
          :default-active="activePath"
          active-text-color="#409eff"
        >
          <!-- 一级 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconList[item.id]" class="icons"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级 -->
            <el-menu-item
              @click="navState('/' + subItem.path)"
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              ><i class="el-icon-menu"></i>
              <span>{{ subItem.authName }}</span></el-menu-item
            >
          </el-submenu>
        </el-menu></el-aside
      >
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenuList } from "@/api/user.js";
export default {
  data() {
    return {
      menuList: [],
      iconList: {
        125: "iconfont icon-users",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      isShowCollapse: false,
      activePath: "",
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    // 保存导航栏激活状态
    navState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    // 菜单是否折叠
    toggle() {
      this.isShowCollapse = !this.isShowCollapse;
    },
    logOut() {
      this.$store.dispatch("user/logOut");
    },
    async getMenuList() {
      try {
        const res = await getMenuList();
        this.menuList = res.data.data;
        // console.log(res);
      } catch (error) {
        this.$message.error("菜单列表数据获取失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.container {
  height: 100%;
}
.el-header {
  padding-left: 0;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  .left {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #373d41;
  .el-menu {
    border-right: none;
  }
  .icons {
    margin-right: 8px;
    font-size: 18px;
  }
}

.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
