<template>
<el-card class="box-card">
  <cus-Breadcrumb level1='商品管理' level2='分类参数'></cus-Breadcrumb>
  <el-alert class="alert" title="注意:只允许为第三级分类设置参数" type="warning"  :closable="false" show-icon></el-alert>
  <el-row>
    <el-col :span="24" class="col">
      <span>请选择商品分类</span>
      <el-cascader
            :options="options"
            v-model="selectedOptions"
            :show-all-levels="false"
            :props="{ label:'cat_name', value:'cat_id'}"
            expand-trigger="hover"
            @change="handleChange">
      </el-cascader>
      <el-tabs v-model="activeName">
        <el-tab-pane label="动态参数" name="many">
          <el-button :disabled="isDisabled" type="primary" size="mini">设置动态参数</el-button>
          <el-table
            :data="dynamicParams"
            style="width: 100%">
            <el-table-column
              type="expand"
              width="40">
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column
              prop="index"
              label="#"
              width="40">
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="属性名称"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primany" icon="el-icon-edit" plain></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <el-button :disabled="isDisabled" type="primary" size="mini">设置静态参数</el-button>
          <el-table
            :data="staticParams"
            style="width: 100%">
            <el-table-column
              type="expand"
              width="40">
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column
              prop="index"
              label="#"
              width="40">
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="属性名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="attr_vals"
              label="属性值"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primany" icon="el-icon-edit" plain></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      options: [],
      selectedOptions: [],
      activeName: 'many',
      dynamicParams: [],
      staticParams: [],
      isDisabled: true
    }
  },
  created () {
    this.loadOptions()
  },
  methods: {
    handleChange () {
      if (this.selectedOptions.length === 3) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    },
    async loadOptions () {
      const { data: {data, meta: { status, msg }} } = await this.$http.get(`categories?type=3`)
      if (status === 200) {
        this.options = data
        console.log(this.options)
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.alert{
  margin-top: 16px;
}
.col{
  margin-top: 16px;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
