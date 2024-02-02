<template>
  <div>
    <el-select v-model="$i18n.locale" class="w-percent-100" @change="selectChange">
      <el-option v-for="(val, key) in i18nMessages" :key="key" :label="val._lang" :value="key" ></el-option>
    </el-select>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import { messages } from '@/i18n'

  export default {
    name: 'language',
    data () {
      return {
        i18nMessages: messages,
        // languageConfig:[
        //   {key:'zh-CN',code:0},
        //   {key:'zh-TW',code:1},
        //   {key:'en-US',code:2},
        // ]
        languageConfig: this.$store.getters.getLanguageConfig()
      }
    },
    created() {
      //获取语言环境
      // this.getLanguage();

      // this.$request({
      //     data:this.$com.resetDataType({}),
      //     url:'/json/channel_device.json',
      //     method:"get"
      //   }).then(res => {
            
      //   }, err => {
      //     console.log(err)
      //   });
    },
    props:{

    },
   watch:{
     // "$i18n.locale": function () {
     //     console.log("切换语言了...")
     //      this.$refs['ruleForm'].fields.forEach(item => {

     //          if(item.validateState === 'error'){
     //              this.$refs['ruleForm'].validateField(item.prop)
     //          }
     //      })
     // }
   },
    mounted() {

    },
    methods:{
      pageSwitchEven(a,b){
        // console.log(a,b)
        this.diyCurrPage = a;
        this.$emit('getDiyCurrPage',this.diyCurrPage);
      },
      selectChange(){
        Cookies.set('language',this.$i18n.locale);

        //修改全局缓存
        this.$store.dispatch('setLang',this.$i18n.locale);//异步操作
        //同步操作
        // this.$store.commit(
        //   'setLangOption',
        //   this.$i18n.locale
        // );

       

        //设置语言环境
        this.setLanguage();
        // if(this.$route.name != "login"){
        //   this.$route.name != Cookies.get('subNavName') && this.$router.replace({ name: Cookies.get('subNavName')})
        // }

        //清除el-form表单中对应的错误提示el-form-item__error



      },
      //获取语言环境
      getLanguage(){
        this.$request({
          data:this.$com.resetDataType({}),
          url: 'system_language.json',
          // url:'/json/channel_device.json',
          method:"get"
        }).then(res => {
            if(res.result === 0){
                let item = this.getObjByLangConfig(res.language);
                this.$i18n.locale = item.key;
                Cookies.set('language',this.$i18n.locale);
            }

        }, err => {
          console.log(err)
        });
      },
      //设置语言环境
      setLanguage(){
        this.$request({
          // data:this.$com.resetDataType({language:this.getObjByLangConfig(this.$i18n.locale).code}),
          data:this.$com.resetDataType( {} ),
          url: 'system_language.cgi',
          method:"post"
        }).then(res => {

        }, err => {
          console.log(err)
        });
      },
      //根据语言环境key或者code返回对应
      getObjByLangConfig(str){
        let prop = typeof str == "string" ? 'key' : 'code';
        let item = null;
        for(let i=0; i<this.languageConfig.length; i++){
          if(this.languageConfig[i][prop] == str){
            item = this.languageConfig[i]
          }
        }
        return item;
      },
    }
  }
</script>

<style scoped>
</style>
