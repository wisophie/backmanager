<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary"> 添加角色 </el-button>
        </el-col>
      </el-row>
      <!-- //角色列表区 -->
      <el-table :data="rolelist" border stripe>
        <el-table-column type="expand">
          <template v-slot="scope">{{ scope.row }}</template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showsetrights(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="分配权限"
      :visible.sync="setrightdiavisible"
      @close="setightdiaclose"
      width="50%"
    >
      <el-tree
        :data="rightslist"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="defkeys"
        :props="treeprops"
        ref="treeref"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setrightdiavisible = false">取 消</el-button>
        <el-button type="primary" @click="allotrights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolelist: [],
      rightslist: [],
      defkeys: [],
      setrightdiavisible: false,
      treeprops: {
        label: "authName",
        children: "children",
      },
      roleid: "",
    };
  },
  created() {
    this.getrolelist();
  },
  methods: {
    async getrolelist() {
      const { data: res } = await this.request.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败");
      }
      this.rolelist = res.data;
    },
    async showsetrights(role) {
      this.roleid = role.id;
      const { data: res } = await this.request.get("rights/tree");
      if (res.meta.status !== 200) {
        this.$message.error("获取权限失败");
      }
      this.rightslist = res.data;
      //调用getleafkeys
      this.getleafkeys(role, this.defkeys);
      this.setrightdiavisible = true;
    },
    //获取默认选择的节点
    getleafkeys(node, arr) {
      if (!node.children) return arr.push(node.id);
      node.children.forEach((item) => {
        this.getleafkeys(item, arr);
      });
    },
    setightdiaclose() {
      this.defkeys = [];
    },

    async allotrights() {
      //拼接数组
      const keys = [
        ...this.$refs.treeref.getCheckedKeys(),
        ...this.$refs.treeref.getHalfCheckedKeys(),
      ];
      console.log(keys);
      //转成，分割的字符串
      const keystr = keys.join(",");
      console.log(keystr);
      const { data: res } = await this.request.post(
        `roles/${this.roleid}/rights`,
        {
          rids: keystr,
        }
      );
      console.log(this.roleid);
      if (res.meta.status !== 200) {
        return this.$message.error("分配权限失败");
      }
      this.$message.success("分配权限成功");
      this.getrolelist();
      this.setrightdiavisible = false;
    },
  },
};
</script>

<style>
</style>