<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-Bread level1="权限管理" level2="角色列表"></my-Bread>
    <el-row class="addbtn">
      <el-button type="primary">添加用户</el-button>
    </el-row>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
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
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.$http.defaults.headers.common[
        'Authorization'
      ] = sessionStorage.getItem('token')
      this.loading = true
      const { data: resData } = await this.$http.get('roles')
      const {
        data,
        meta: { status, msg }
      } = resData
      //   console.log(this)
      //   console.log(this.$http)
      //   console.log(this.$http.get())
      //   console.log(this.$http.get('roles'))
      console.log(resData)
      if (status === 200) {
        this.list = data
        this.loading = false
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 60px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.addbtn {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
