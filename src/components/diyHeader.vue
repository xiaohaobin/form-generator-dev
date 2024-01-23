<template>
  <div class="diy-header flex-space-between">    
    <div class="flex-flex-start">
      <div class="ml-15 mr-15">
        <img src="../assets/image/main-logo1.png" alt="" class="mt-10">
      </div>
      <div class="ml-15 mr-15">
        <b>换机申请表单配置化模板管理系统</b>
      </div>
    </div>

    <div class="flex-flex-end">
      <div class="ml-15 mr-15"><b>admin</b></div>
      <language></language>
      <div class="ml-15 mr-15">
        <el-button type="primary" icon="el-icon-refresh-left" title="点击返回OSS系统" size="small">Back OSS</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import language from '@/components/language.vue'

  export default {
    name: 'diyHeader',
    data() {
      return {
       
      }
    },
    components: {
      language
    },
    created() {
      
    },
    mounted() {
      
    },
    methods:{
      
    }
  }
</script>

<style scoped>
.diy-header{
  width: 100%;
  height: 54px;
  line-height: 54px;
  box-shadow: 2px 3px 5px #ddd;
}
</style>
