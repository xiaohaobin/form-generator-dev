<template>
  <div class="diy-nav">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#213145"
      text-color="#fff"
      active-text-color="#0ec439">  
      <el-menu-item :index="item.index" v-for="(item,i) in routerLinkData" :key="i">        
        <router-link :to="item.path" active-class="_active" slot="title" class="router-link-ele">
          <i :class="item.iconClass"></i> {{ item.txt }}
        </router-link>
      </el-menu-item>      

      <el-menu-item index="4" @click="toHome">        
        <a slot="title" class="router-link-ele"><i class="el-icon-setting"></i> 表单配置化</a>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import routerData from '@/utils/routerData.js'

  export default {
    name: 'diyNav',
    data() {
      return {
        // routerLinkData:[
        //   {txt:'换机申请模板管理', url:'/index/template', name:'template', index:'1', iconClass:'el-icon-menu'},
        //   {txt:'校验规则管理', url:'/index/regular', name:'regular', index:'2', iconClass:'el-icon-folder-checked'},
        //   {txt:'字段管理后台', url:'/index/field', name:'field', index:'3', iconClass:'el-icon-edit-outline'},
        // ],
        routerLinkData:routerData,
        defaultActive:'1',
      }
    },
    created() {
      console.log(this.$route.name,"...")
      //修改菜单选中状态，根据路由
      this.setDefaultActive();
    },
    mounted() {
      
    },
    methods:{
      //修改菜单选中状态，根据路由
      setDefaultActive(){
        const i = this.$xhb.getItemByProp(this.routerLinkData, 'name', this.$route.name).index;
        // console.log(i,"当前所选索引");
        this.defaultActive = i
      },
      toHome(){
        this.$router.replace(
            // { name: 'main'}
            {path:"/home"}//指定跳转到某个嵌套子页面
        )
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .diy-nav{
    height: calc(100vh - 54px);
    background-color: #213145;
    box-shadow: 0px 0 2px #213145;
  }
  .router-link-ele{
    text-decoration: none;
    color: inherit;
    display: inline-block;
    width: 100%;
    padding-left: 10px;
  }
  li.el-menu-item{
    padding-left:0 !important;
    padding-right:0;
  }
</style>
