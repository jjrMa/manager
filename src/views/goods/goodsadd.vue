<template>
<el-card class="box-card">
  <!-- 面包屑 -->
  <cus-Breadcrumb level1='商品管理' level2='商品列表'></cus-Breadcrumb>
  <!-- 提示框 -->
  <el-alert class="alert" title="添加商品信息" type="info" center :closable="false" show-icon></el-alert>
  <!-- 步骤条 -->
  <el-steps class="steps" :space="400" align-center :active="active*1" finish-status="success">
    <el-step title="基本信息"></el-step>
    <el-step title="商品参数"></el-step>
    <el-step title="商品属性"></el-step>
    <el-step title="商品图片"></el-step>
    <el-step title="商品内容"></el-step>
  </el-steps>
  <!-- tabs选项卡 -->
  <!-- element-ui已经封装好了，当切换时,v-model的值自动切换为el-tabs-pane的name对应的值. -->
  <el-form class="form" label-position="top" :model="form" label-width="80px">
    <el-tabs @tab-click="handleTabClick" class="tabs" v-model="active" tab-position="left">

      <el-tab-pane name="1" label="基本信息">
        <el-form-item label="商品名称">
          <el-input v-model="form.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="form.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="form.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <!-- 级联选择器 -->
          <el-cascader
            clearable
            :options="options"
            :props="defaultProps"
            v-model="selectedOptions"
            expand-trigger="hover"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-tab-pane>

      <el-tab-pane name="2" label="商品参数">
        <el-form-item v-for="item in dynamicsParams" :key="item.attr_id" :label="item.attr_name">
        <el-checkbox-group v-model="item.attr_vals">
          <el-checkbox border v-for="val in item.attr_vals" :key="val" :label="val"></el-checkbox>
        </el-checkbox-group>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      active: '1',
      form: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        // 分类id
        goods_cat: ''
      },
      // 层级下拉框的数据源
      options: [],
      // 层级下拉框的数据源配置
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 绑定到层级下拉框上的数据
      selectedOptions: [],
      checkList: [],
      dynamicsParams: [],
      staticParams: []
    }
  },
  created () {
    this.loadOptions()
  },
  methods: {
    async handleTabClick () {
      if (this.active === '2' || this.active === '3') {
        if (this.selectedOptions.length !== 3) {
          this.$message.error('请选择商品的三级分类')
          return
        }
      }
      if (this.active === '1') {
        const { data: resData } = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
        this.dynamicsParams = resData.data
        console.log(this.dynamicsParams)
        this.dynamicsParams.forEach((item) => {
          item.attr_vals = item.attr_vals.trim().length === 0 ? [] : item.attr_vals.trim().split(',')
        })
      }
    },
    handleChange () {
      if (this.selectedOptions.length !== 3) {
        this.$message.warning('商品只能添加到三级分类')
        this.selectedOptions.length = 0
      }
    },
    async loadOptions () {
      const { data: resData } = await this.$http.get(`categories?type=3`)

      this.options = resData.data
      // console.log(this.options)
    }
  }
}
</script>

<style scoped>
.alert{
  margin-top: 26px;
  margin-bottom: 10px;
}
.form{
  height: 400px;
  overflow: auto;
}
</style>
