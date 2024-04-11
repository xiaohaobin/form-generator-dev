<template>
  <div class="test-form">

    <h2>在home页面创建的模板</h2>
    <parser :key="key3" :form-conf="formConf3" @submit="sumbitForm3" />

  </div>
</template>

<script>
import Parser from '../Parser'
import { setMethodsByConfigTag , getAPINameByFormType} from '@/utils/fromConfigUtils'

let testFormConf = localStorage.getItem("drawingItems");
testFormConf = JSON.parse(testFormConf) || [];
// 若parser是通过安装npm方式集成到项目中的，使用此行引入
// import Parser from 'form-gen-parser'
console.log(testFormConf,"testFormConf");

//配置组件交互事件
// const formItemEventList = [
//   {
//     tag: 'el-input',
//     on: {
//       blur : 'inputChangeEvent'//设置input事件以及触发事件的函数，formConf3.__methods__下面要配置好事件触发钩子
//     }
//   }
// ] 

// const fieldsList = setMethodsByConfigTag(testFormConf, formItemEventList)


export default {
  components: {
    Parser
  },
  props: {},
  data() {
    return {
      scoreData:localStorage.getItem("drawingItems"),
      key3: +new Date(),
      formConf3: {
        fields: [],
        // fields: fieldsList,
        __methods__: {
          clickTestButton1() {
            console.log(
              `%c【测试按钮3】点击事件里可以访问当前表单：
                1) formModel='formData', 所以this.formData可以拿到当前表单的model
                2) formRef='elForm', 所以this.$refs.elForm可以拿到当前表单的ref(vue组件)
              `,
              'color:#409EFF;font-size: 15px'
            )
            console.log('表单的Model：', this.formData)
            console.log('表单的ref：', this.$refs.elForm)
          }
        },
        formRef: 'elForm',
        formModel: 'formData',
        size: 'small',
        labelPosition: 'top',
        labelWidth: 100,
        formRules: 'rules',
        gutter: 15,
        disabled: false,
        span: 24,
        formBtns: true,
        unFocusedComponentBorder: false
      }
    }
  },
  computed: {},
  watch: {
    'formConf3.fields':function(n,o){
      console.log("配置变化",n,o)
      this.$nextTick(()=>{
        this.key3 = +new Date()
      })
    }
  },
  created() {
    
  },
  mounted() {
    this.formConf3.fields = testFormConf;
    console.log('c')
  },
  methods: { 
    sumbitForm3(data) {
      console.log('sumbitForm3提交数据：', data);
      console.log('提交接口',getAPINameByFormType(2));
    }
  }
}
</script>

<style lang="scss" scoped>
.test-form {
  margin: 15px auto;
  width: 800px;
  padding: 15px;
}
</style>
