<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        title="消息提示的文案"
        type="info"
        show-icon
        center
        :closable="false"
      >
      </el-alert>
      <el-steps
        :space="260"
        :active="activeindex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="基本属性"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :model="addForm"
        :rules="addFormrules"
        ref="addFormref"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeindex"
          tab-position="left"
          :before-leave="beforetableave"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="catelist"
                :props="cateprops"
                @change="handlechange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="基本属性" name="2">基本属性</el-tab-pane>
          <el-tab-pane label="基本图片" name="3"
            ><el-upload
              action="http://127.0.0.1:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              multiple
              :limit="3"
              list-type="picture"
              :headers="headerobj"
              :on-success="handlesuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload></el-tab-pane
          >

          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <el-dialog title="图片预览" :visible.sync="preVisible" width="35%">
      <img :src="previewpath" alt="" class="imgr" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeindex: "0",
      addForm: {
        goods_name: "",
        goods_cat: [],
        pics: [],
      },
      addFormrules: {
        goods_name: [
          {
            required: true,
            message: "please input the name of goods",
            trigger: "blur",
          },
        ],
        goods_cat: [
          {
            required: true,
            message: "please input the name of goods",
            trigger: "blur",
          },
        ],
      },
      //cascader'data
      catelist: [],
      cateprops: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      headerobj: { Authorization: window.sessionStorage.getItem("token") },
      previewpath: "",
      preVisible: false,
    };
  },
  created() {
    this.getcatelist();
  },
  methods: {
    async getcatelist() {
      const { data: res } = await this.request.get("categories");
      if (res.meta.status !== 200) {
        return this.$message.error("获取失败");
      }
      this.catelist = res.data;
    },
    handlechange() {},
    beforetableave(activeName, oldActiveName) {
      if (oldActiveName === "0" && this.addForm.goods_cat.length !== 3) {
        this.$message.error("please select the categories of goods!");
        return false;
      }
    },
    handlePreview(file) {
      this.previewpath = file.response.data.url;
      this.preVisible = true;
    },
    handleRemove(file) {
      const filepath = file.response.data.tmp_path;
      const i = this.addForm.pics.findIndex((x) => x.pics === filepath);
      this.addForm.pics.splice(i, 1);
    },
    handlesuccess(res) {
      const picinfo = {
        pics: res.data.tmp_path,
      };
      this.addForm.pics.push(picinfo);
    },
  },
};
</script>

<style lang="less" scoped>
.imgr {
  width: 100%;
}
</style>