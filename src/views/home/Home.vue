<template>
  <el-container class="ct">
    <el-header>
      <div>
        <img src="@/assets/enterprise.jpg" alt="" />
        <span>企业信息管理系统</span>
      </div>

      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          router
          :default-active="activepath"
        >
          <el-submenu
            :index="item.id + ' '"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>

            <el-menu-item
              :index="'/' + subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
              @click="saveNavState('/' + subitem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subitem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getMenuList();
    this.activepath = window.sessionStorage.getItem("activepath");
  },
  data() {
    return {
      menulist: [],
      activepath: "",
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async loget() {
      await this.request.get("/admin/server").then((res) => {
        // console.log(res);
      });
    },
    async getMenuList() {
      const { data: res } = await this.request.get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activepath", activePath);
      this.activepath = activePath;
    },
  },
};
</script>

<style lang="less" scoped>
/* .ct {
  height: 100%;
} */
.el-header {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  background-color: rgb(49, 49, 49);
  > div > img {
    width: 80px;
    margin-left: 20px;
  }
  > div > span {
    margin-left: 20px;
  }
}
.el-aside {
  height: 100vh;
  background-color: rgb(61, 59, 59);
  .el-menu {
    border-right: none;
  }
}
.el-main {
  flex-grow: 1;
  background-color: rgb(235, 235, 235);
}
</style>
