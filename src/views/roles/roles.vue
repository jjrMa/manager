<template>
   <el-card class="box-card">
      <!-- 面包屑 -->
      <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb> -->
      <cus-Breadcrumb level1='权限管理' level2='角色列表'></cus-Breadcrumb>
      <el-row class="row-add">
        <el-col :span="24">
          <el-button>添加角色</el-button>
        </el-col>
      </el-row>

       <!-- 表格 -->
       <el-table
      :data="list"
      style="width: 100%">
       <el-table-column
       type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="180">
      </el-table-column>
     <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button  plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button  plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          <el-button   plain size="mini" type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      loading: true
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      this.loading = true
      const { data: resData } = await this.$http.get('roles')
      const { data, meta: { status, msg } } = resData
      this.loading = false
      if (status === 200) {
        this.list = data
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>
<style>
.row-add{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
