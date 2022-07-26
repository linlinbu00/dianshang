<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 输入框 添加按钮 -->
      <el-row :gutter="24" type="flex"
        ><el-col :span="12"
          ><el-input
            placeholder="请输入内容"
            v-model="userInfo.query"
            @clear="getUserList"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList(userInfo.query)"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true"
            >添加用户</el-button
          >
        </el-col></el-row
      >
      <!-- 表格 -->
      <el-table :data="userList" stripe style="width: 100%" border>
        <el-table-column type="index" label="#" width="80px"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope="scope">
            <!-- slot-scope=scope插槽可以通过scope.row获取该行绑定的数据 （在table里面的那一行数据） -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeUserState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <el-button
              @click="deleteUser(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="userInfo.pagesize"
        :total="user.total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      @close="closeDialog"
    >
      <el-form
        :model="form"
        :rules="formRules"
        ref="formRef"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="closeEditDialog"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  changeUserState,
  addUser,
  searchUser,
  editUser,
  deleteUser,
} from "@/api/user";
export default {
  data() {
    return {
      editForm: {},
      form: {
        // username: "",
        // password: "",
        // email: "",
        // mobile: "",
        username: "布灵灵",
        password: "123456",
        email: "123@qq.com",
        mobile: "13988777788",
      },
      // 添加用户表单校验
      formRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "手机号不能为空",
          },
          {
            min: 3,
            max: 10,
            trigger: "blur",
            message: "用户名的长度在3-10之间",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "密码不能为空",
          },
          {
            min: 6,
            max: 15,
            trigger: "blur",
            message: "密码的长度在6-15之间",
          },
        ],
        email: [
          {
            required: true,
            trigger: "blur",
            message: "邮箱不能为空",
          },
          {
            pattern: /^\w+@\w+(\.\w+)+$/,
            trigger: "blur",
            message: "邮箱格式不正确",
          },
        ],
        mobile: [
          {
            required: true,
            trigger: "blur",
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            trigger: "blur",
            message: "手机号格式不正确",
          },
        ],
      },
      editFormRules: {
        email: [
          {
            required: true,
            trigger: "blur",
            message: "邮箱不能为空",
          },
          {
            pattern: /^\w+@\w+(\.\w+)+$/,
            trigger: "blur",
            message: "邮箱格式不正确",
          },
        ],
        mobile: [
          {
            required: true,
            trigger: "blur",
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            trigger: "blur",
            message: "手机号格式不正确",
          },
        ],
      },
      // 是否显示编辑用户弹框
      editDialogVisible: false,
      // 是否显示添加用户弹框
      dialogVisible: false,
      // 用户数据
      userList: [],
      // res.data.data
      user: {},
      userInfo: {
        // 查询关键字
        query: "",
        // 页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 2,
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 删除用户
    async deleteUser(id) {
      try {
        const result = await this.$confirm(
          "此操作将永久删除该用户, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).catch((error) => error);

        if (result !== "confirm") {
          return this.$message.info("取消删除");
        }
        const res = await deleteUser(id);
        console.log(res);
        this.getUserList();
        this.$message.success("删除用户成功！");
      } catch (error) {
        this.$message.error("删除用户失败");
      }
    },
    closeEditDialog() {
      this.$refs.editFormRef.resetFields();
    },
    // 展示编辑用户弹出
    async showEditDialog(id) {
      try {
        this.editDialogVisible = true;
        // console.log(id);
        const res = await searchUser(id);
        console.log(res);
        this.editForm = res.data.data;
      } catch (error) {
        this.$message.error("获取编辑用户信息失败");
        console.log(error);
      }
    },
    // 编辑用户
    async editUser() {
      await this.$refs.editFormRef.validate();
      try {
        const res = await editUser(this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile,
        });
        console.log(res);
        this.getUserList();
        this.editDialogVisible = false;
        this.$message.success("更新用户数据成功");
      } catch (error) {
        this.editDialogVisible = false;
        this.$message.error("更新用户数据失败");
      }
    },
    // 添加用户
    async addUser() {
      try {
        await this.$refs.formRef.validate();
        await addUser(this.form);
        // console.log(res);
        this.getUserList();
        this.$message.success("添加用户成功");
        this.dialogVisible = false;
      } catch (error) {
        this.$message.error("添加用户失败");
        console.log(error);
        this.dialogVisible = false;
      }
    },
    // 重置
    closeDialog() {
      this.$refs.formRef.resetFields();
    },
    //修改用户状态
    async changeUserState(value) {
      try {
        // console.log(value);
        const res = await changeUserState(value.id, value.mg_state);
        console.log(res);
        if (res.data.data.mg_state === 0) {
          res.data.data.mg_state = false;
        } else {
          res.data.data.mg_state = true;
        }
        value.mg_state = res.data.data.mg_state;
        this.$message.success("修改用户状态成功");
      } catch (error) {
        value.mg_state = !value.mg_state;
        this.$message.error("修改用户状态失败");
      }
    },
    //监听pageSize 每页显示条数改变时会触发
    handleSizeChange(pageSize) {
      // console.log(`每页 ${val} 条`);
      // 将当前更改的每页可显示的数量重新赋值给请求的参数中 并重新发起请求
      this.userInfo.pagesize = pageSize;
      this.getUserList();
    },
    //监听currentPage 页码改变时会触发
    handleCurrentChange(pageNum) {
      // console.log(`当前页: ${val}`);
      // 将当前更改的页码重新赋值给请求的参数中 并重新发起请求
      this.userInfo.pagenum = pageNum;
      this.getUserList();
    },
    // 获取用户列表
    async getUserList() {
      try {
        const res = await getUserList(this.userInfo);
        // console.log(res);
        this.user = res.data.data;
        this.userList = res.data.data.users;
      } catch (error) {
        this.$message("获取用户信息失败！");
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
