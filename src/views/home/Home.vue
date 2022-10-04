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
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          router
          :default-active="activepath"
          :collapse='isCollapse'
          :collapse-transition='false'
        >
          <el-submenu
            :index="item.id + ' '"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconslist[item.id]"></i>
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
      iconslist:{
        '125':'el-icon-user-solid',
        '103':'el-icon-s-tools',
        '101':'el-icon-s-goods',
        '102':'el-icon-s-claim',
        '145':'el-icon-s-marketing',
      },
      activepath: "",
      isCollapse:false,//是否折叠
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
    //二级菜单处理高亮效果
    saveNavState(activePath) {
      window.sessionStorage.setItem("activepath", activePath);
      this.activepath = activePath;
    },
    toggleCollapse(){
      this.isCollapse=!this.isCollapse
    }
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
  background-color: #333744;
  transition:0.3s;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  flex-grow: 1;
  background-color: rgb(235, 235, 235);
}
.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>
