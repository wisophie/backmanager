<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="queryinfo.query"
            clearable
            @clear="getuserlist()"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getuserlist()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="adddiavisible = true">
            添加用户
          </el-button>
        </el-col>
      </el-row>
      <!-- //用户列表区 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userstatechanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showedituser(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="deluser(scope.row.id)"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="small"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="adddiavisible"
      @close="adddiaclose"
      width="50%"
    >
      <el-form
        ref="addformref"
        :model="addform"
        :rules="addormsules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addform.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addform.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addform.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="adddiavisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改用户信息"
      :visible.sync="editdiavisible"
      @close="editdiaclose"
      width="50%"
    >
      <el-form
        ref="editformref"
        :model="editform"
        :rules="addormsules"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editform.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editform.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editform.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editdiavisible = false">取 消</el-button>
        <el-button type="primary" @click="edituserinfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    //邮箱和手机的验证规则
    var mailcheck = (rule, value, cb) => {
      const regemail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (regemail.test(value)) return cb();
      cb(new Error("邮箱格式不正确"));
    };
    var mobilecheck = (rule, value, cb) => {
      const regemobile = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (regemobile.test(value)) {
        return cb();
      }
      cb(new Error("手机格式不正确"));
    };

    return {
      queryinfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      userlist: [],
      total: 0,
      adddiavisible: false,
      editdiavisible: false,
      addform: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      editform: {},
      addormsules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: mailcheck, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: mobilecheck, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getuserlist();
  },
  methods: {
    async getuserlist() {
      const { data: res } = await this.request.get("users", {
        params: this.queryinfo,
      });
      if (res.meta.status !== 200)
        return this.$message.error("获取用户列表失败");
      this.userlist = res.data.users;
      this.total = res.data.total;
    },
    handleSizeChange(newsize) {
      this.queryinfo.pagesize = newsize;
      this.getuserlist();
    },
    handleCurrentChange(newpage) {
      this.queryinfo.pagenum = newpage;
      this.getuserlist();
    },
    async userstatechanged(userinfo) {
      console.log(userinfo);
      const { data: res } = await this.request.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return this.$message.error("更新用户状态失败");
      }
      this.$message.success("更新用户状态成功");
    },
    adddiaclose() {
      this.$refs.addformref.resetFields();
    },
    //添加用户函数
    adduser() {
      this.$refs.addformref.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.request.post("users", this.addform);
        if (res.meta.status !== 201) {
          this.$message.error("添加用户失败");
        }
        this.$message.success("添加用户成功");
        this.adddiavisible = false;
        //重新获取用户列表
        this.getuserlist();
      });
    },
    async showedituser(id) {
      const { data: res } = await this.request.get("users/" + id);
      if (res.meta.status !== 200) {
        this.$message.error("查询用户失败");
      }
      this.editform = res.data;
      this.editdiavisible = true;
    },
    //修改用户
    editdiaclose() {
      this.$refs.editformref.resetFields();
    },
    edituserinfo() {
      this.$refs.editformref.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.request.put(
          "users/" + this.editform.id,
          {
            email: this.editform.email,
            mobile: this.editform.mobile,
          }
        );
        if (res.meta.status !== 200) {
          this.$message.error("修改用户失败");
        }
        this.$message.success("修改用户信息成功");
        this.editdiavisible = false;
        //重新获取用户列表
        this.getuserlist();
      });
    },
    //删除用户
    async deluser(id) {
      const result = await this.$confirm("永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      if (result !== "confirm") return this.$message.info("取消删除");
      const { data: res } = await this.request.delete("users/" + id);
      console.log(res);
      if (res.meta.status !== 200) {
        this.$message.error("删除用户失败");
      }
      this.$message.success("删除用户成功");
      this.getuserlist();
    },
  },
};
</script>

<style lang='less' scoped>
</style>