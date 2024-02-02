import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '@/i18n'
import com from '@/utils/common.js'
import {
  requestLocal, requestSelf, requestRoot,request3
  } from '@/utils/request.js';

//i18n.messages,i18n.locale
Vue.use(Vuex);
const store = new Vuex.Store({
    // 1. state
    state:{
        city:'',
        count:0,
        timer:null,
        timer2:null,
        i18nLocal:i18n.locale,//默认中文
        i18nOption:i18n.messages[i18n.locale],
        languageConfig:[
          {key:'zh-CN',code:0},
          {key:'zh-TW',code:1},
          {key:'en-US',code:2},

          {key:'it',code:3},
          {key:'pl',code:4},
          {key:'pt',code:5},
          {key:'de',code:6},
          {key:'cs-CZ',code:7},
        ],
        deviceStatusList:[
          {txt:i18n.messages[i18n.locale].utils.online,status:1,color:'#0EC439'},
          {txt:i18n.messages[i18n.locale].utils.offline,status:0,color:'#888888'},
          {txt:i18n.messages[i18n.locale].utils.fault,status:2,color:'#e43e43'},
        ],
        modeList:[
          {txt:i18n.messages[i18n.locale].systemSetting.DI_ygtj,id:"2"},
          {txt:i18n.messages[i18n.locale].systemSetting.energyManagement,id:"3"},
          // {txt:this.$store.state.i18nOption.systemSetting.DI_ygtj, id:"2"},
          // {txt:this.$store.state.i18nOption.systemSetting.energyManagement, id:"3"},
        ],
        //设备设置相关
        setDeviceStatusList:[//
          {txt: i18n.messages[i18n.locale].deviceManage.PowerOn,id:1},//开机
          {txt: i18n.messages[i18n.locale].deviceManage.ShutDown,id:0},//关机
        ],
        //升级固件错误字段列表和对应状态码
        upgradeErrTxtList:[
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_129, code:129 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_130, code:130 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_131, code:131 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_132, code:132 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_133, code:133 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_134, code:134 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_135, code:135 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_136, code:136 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_137, code:137 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_201, code:201 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_202, code:202 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_203, code:203 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_204, code:204 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_205, code:205 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_206, code:206 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_207, code:207 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_208, code:208 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_209, code:209 },
          { txt: i18n.messages[i18n.locale].deviceManage.upgradeErrTxt_210, code:210 },
        ],
        //ipv4输入正则
        ipReg:[{
          required: true,
          message: i18n.messages[i18n.locale].systemSetting.canonicalIPNotice,//
          trigger: 'blur'
        }, {
          // pattern: /( ((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]) )/,
          pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
          message: i18n.messages[i18n.locale].systemSetting.canonicalIPNotice,//
          trigger: 'blur'
        }],
        //选中模板的信息
        currTempInfo:{},
        //web正则表
        regList: [
          // {pattern: "/^1(3|4|5|7|8|9)\\d{9}$/",message: "手机号格式错误",regularName:'验证手机输入是否有误',id:1}
        ],
        //字段表
        fieldList:[
          // {label:'用户名称',value:'userName', disabled:false},
        ],
        countryList:[],//国家列表
        cityList:[],//城市列表
    },

    // // 2. getters
    getters:{
        /**
         * @param {String} key 国际化标识 key
        */
        getLanguageConfig:(state) => (key) =>{
          const LanguageConfig = state.languageConfig;
          if(key){
            let languageItem = 0;
            LanguageConfig.forEach((item,i)=>{
              if(item.key == key) languageItem = item;
            });
            return languageItem;
          }
          return LanguageConfig                    
        },
        //还可以传参写
        getCountOther:(state) => (num) =>{
          return state.count * num - 10;
        },
        getLangOption(state){
          return state.i18nOption;
        },
        getIpReg(state){
          return state.ipReg;
        },
        //判断设备状态
        getDevStatusHtml:(state) => (n) =>{
          if(typeof n == "number"){
            let html = "";
            for(let i=0; i<state.deviceStatusList.length; i++){
              if(state.deviceStatusList[i].status === n){
                html = "<span style='color:"+ state.deviceStatusList[i].color +"'>"+ state.deviceStatusList[i].txt +"</span>";
              }
            }
            return html;
          }
          
          return n;
        },
        //获取设备设置开关机数据
        getSetDeviceStatusList(state){
          return state.setDeviceStatusList;
        },
        //获取升级错误状态码字段
        getUpgradeErrTxtList:(state) => (n) =>{
          let res = '';
          state.upgradeErrTxtList.forEach((item,i)=>{
            if(item.code == n) res = item.txt;
          });
          return res;
        },
        //获取语言code
        getLanguageCode(state){
          const LanguageConfig = state.languageConfig;
          let language = 0;
          LanguageConfig.forEach((item,i)=>{
            if(item.key == i18n.locale) language = item.code;
          });
          return language;
        },
        getCurrTempInfo(state){
          return state.currTempInfo
        },
        getRegList(state){
          return state.regList
        },
        getFieldList(state){
          return state.fieldList
        },
        //返回国家列表
        getCountryList(state){
          return state.countryList
        },
        //返回城市列表
        getCityList(state){
          return state.cityList
        },
    },
    // 3. actions
    // 通常跟api接口打交道
    actions:{
       /**
        *  // 异步设置语言环境
        // 参数列表：{commit, state}
        // state指的是state数据
        // commit调用mutations的方法
        // key就是调用此方法时要传的参数
        */
        setLang({commit,state}, key){

            // 调用mutaions里面的方法
            commit("setLangOption", key);
        },
        actionA({ commit }){//使用promise异步，调用：store.dispatch('actionA').then(function(r){})
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                commit('setCity')
                resolve()
              }, 1000)
            })
        },
        addCountName({commit,state}, num){
            // 跟后台打交道
            // 调用mutaions里面的方法
            // commit("addCount", num);

            return new Promise((resolve, reject) => {
              setTimeout(() => {
                commit("addCount", num);
                resolve(num)
              }, 100)
            })
        },

    },
    // 4. mutations
    mutations:{
        // state指的是state的数据
        // name传递过来的数据
        setCity(state, name){
            state.city = name;//将传参设置给state的city
        },
        //递增
        addCount(state,num){
          state.count += num*1;
        },
        //设置语言，以及修改其他带有国际化字段的变量
        setLangOption(state, key){
          //更新全局变量
          state.i18nOption = i18n.messages[key];
          state.i18nLocal = key;
          state.deviceStatusList = [
            {txt:i18n.messages[key].utils.online,status:1,color:'#0EC439'},
            {txt:i18n.messages[key].utils.offline,status:0,color:'#888888'},
            {txt:i18n.messages[key].utils.fault,status:2,color:'#e43e43'},
          ];
          state.setDeviceStatusList = [//
            {txt: i18n.messages[key].deviceManage.PowerOn,id:1},//开机
            {txt: i18n.messages[key].deviceManage.ShutDown,id:-1},//关机
          ];
          state.modeList = [
            {txt:i18n.messages[key].systemSetting.DI_ygtj,id:"2"},
            {txt:i18n.messages[key].systemSetting.energyManagement,id:"3"},
            // {txt:this.$store.state.i18nOption.systemSetting.DI_ygtj, id:"2"},
            // {txt:this.$store.state.i18nOption.systemSetting.energyManagement, id:"3"},
          ];

           //升级固件错误字段列表和对应状态码
           state.upgradeErrTxtList = [
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_129, code:129 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_130, code:130 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_131, code:131 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_132, code:132 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_133, code:133 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_134, code:134 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_135, code:135 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_136, code:136 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_137, code:137 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_201, code:201 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_202, code:202 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_203, code:203 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_204, code:204 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_205, code:205 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_206, code:206 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_207, code:207 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_208, code:208 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_209, code:209 },
              { txt: i18n.messages[key].deviceManage.upgradeErrTxt_210, code:210 },
            ]
        },
        //设置当前选中模板信息
        setCurrTempInfo(state,currTempInfo){
          state.currTempInfo = currTempInfo;
        },
        /**
         * 更新正则表
         * @param {Object} state 
         * @param {Object} serverData 服务器正则数据列表 []
         * 
        */
        updateRegList(state, serverData){          
          serverData.forEach((item)=>{
            item.pattern = item.webRegular;
            item.message = item.remark;
          })
          state.regList = serverData;
        },
        /**
         * 更新字段表
         * @param {Object} state 
         * @param {Object} serverData 服务器字段数据列表 []
         * 
        */
        updateFieldList(state, serverData){ 
          //{label:'用户名称',value:'userName', disabled:false},         
          serverData.forEach((item)=>{
            item.label = item.fieldAlias;
            item.value = item.tableField;
            item.disabled = false
          })
          state.fieldList = serverData;
        },
        /**
         * 更新国家列表表
         * @param {Object} state 
         * @param {Object} serverData 服务器字段数据列表 []
         * 
        */
        updateCountryList(state, serverData){ 
          state.countryList = serverData;
        },
        /**
         * 更新城市列表表
         * @param {Object} state 
         * @param {Object} serverData 服务器字段数据列表 []
         * 
        */
        updateCityList(state, serverData){ 
          state.cityList = serverData;
        },
    },

});

export default store;
