<template>
  <div>
    <div>
        <diyHeader></diyHeader>
    </div>
    
    <el-row>
      <el-col :sm="3" :md="3" :lg="3" :xs="24">
        <diyNav></diyNav>
      </el-col>    
      <el-col :sm="21" :md="21" :lg="21" :xs="24" class="main-app-container">        
        <transition>
          <router-view />
        </transition>
      </el-col>  
    </el-row>
  </div>
</template>

<script>
import language from '@/components/language.vue'
import diyHeader from '@/components/diyHeader.vue'
import diyNav from '@/components/diyNav.vue'

export default {
  name: "indexPage",
  components: {
    language,
    diyHeader,
    diyNav
  },
  created(){
    
  },
  mounted() {
    // // 取消开始的loading动画
    // const preLoader = document.querySelector('#pre-loader')
    // preLoader.style.display = 'none'

    // // fix: firefox 下 拖拽 会新打卡一个选项卡
    // // https://github.com/JakHuang/form-generator/issues/15
    // document.body.ondrop = event => {
    //   event.preventDefault()
    //   event.stopPropagation()
    // }

  }
}
</script>

<style scoped>

.main-app-container{
  background-color: rgba(221 ,221 ,221,0.3)
}
</style>
