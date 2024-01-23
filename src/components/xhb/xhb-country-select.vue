<template>
  <div>
    <div class="xhb-country-select" ref="xhbCountrySelectDOM">
                <div :class=" multiple ? 'xhb-country-select-item-box multiple' : 'xhb-country-select-item-box' ">
                    <el-select v-model="selectCountry" :placeholder="select_country" filterable clearable
                        v-if="show_type === 1"
                        :multiple="multiple"
                        :collapse-tags="collapse_tags"                    
                        size="small"
                        :style="{width: '100%'}">
                            <el-option v-for="(item, index) in countryList1" :key="index" :label="item.txt" :value="item.id"
                            :disabled="item.disabled"></el-option>
                    </el-select>

                    <el-select v-model="selectCountry" :placeholder="select_country" filterable clearable
                        v-if="show_type === 2"
                        :multiple="multiple"
                        :collapse-tags="collapse_tags"                    
                        size="small"
                        :style="{width: '100%'}">
                            <el-option-group
                            v-for="group in oss_world_data"
                            :key="group.id"
                            :label="group.txt">
                                <el-option
                                    v-for="item in group.children"
                                    :key="item.pid + '-' + item.id"
                                    :label="item.txt"
                                    :value="item.id">
                                </el-option>
                            </el-option-group>
                    </el-select>

                    <el-cascader v-model="selectCountry" :options="oss_world_data" size="small"
                        v-if="show_type === 4"
                        :props="areaCountryProps" :style="{width: '100%'}" :placeholder="select_country" 
                        filterable 
                        clearable 
                        :collapse-tags="collapse_tags"        
                        :show-all-levels="false">
                        <span slot="empty">{{ no_data_text }}</span>
                    </el-cascader>
                </div>
                
                <div class="flex-flex-start" v-if="show_type === 3">
                    <div :class=" multiple ? 'xhb-country-select-item-box2 multiple' : 'xhb-country-select-item-box2' ">
                        <el-select v-model="selectArea" :placeholder="ksh_select_area" filterable clearable
                            :multiple="area_multiple"
                            :collapse-tags="collapse_tags"                    
                            size="small"
                            :style="{width: '100%'}">
                                <el-option v-for="(item, index) in oss_world_data" :key="index" :label="item.txt" :value="item.id"
                                :disabled="item.disabled"></el-option>
                        </el-select>
                    </div>
                    <div :class=" multiple ? 'xhb-country-select-item-box multiple' : 'xhb-country-select-item-box' ">
                        <el-select v-model="selectCountry" :placeholder="select_country" filterable clearable
                            :multiple="country_multiple"                            
                            :collapse-tags="collapse_tags"                    
                            size="small"
                            :style="{width: '100%'}">
                                <el-option v-if="country_multiple">
                                    <div class="flex-space-between xhb-country-select-all-checked-box">
                                        <span>{{select_all}}</span>
                                        <el-checkbox v-model="countryChecked3"></el-checkbox>
                                    </div>                                    
                                </el-option>
                                <el-option v-for="(item, index) in countryList1" :key="index" :label="item.txt" :value="item.id"
                                v-show="showCountryByArea(item)"
                                :disabled="!showCountryByArea(item)"></el-option>
                        </el-select>
                    </div>
                </div>

            </div>
  </div>
</template>

<script>
  export default {
    name: 'xhbCountrySelect',
    data() {
        return {
            OSSWorldData:[],//OSS全世界区域国家数据[id: '1', txt: '亚洲', curr: false, children:[{pid: '1', id: '1', txt: '中国'}...]]
            countryList1:[],
            areaList:[],
            countryList3:[],
            selectCountry:undefined,
            selectArea:undefined,
            areaCountryProps: {
                multiple: false,
                label: "txt",
                value: "id",
                children: "children",
                checkStrictly: false//props.checkStrictly = true 来设置父子节点取消选中关联，从而达到选择任意一级选项的目的。
            },
            countryChecked3:false,//类型3组件 全选国家标识
            areaChecked3:false,//类型3组件 全选区域标识
            select_country: '选择国家',//选择国家
            ksh_select_area: '选择区域',//选择区域
            select_all:'全选',//全选
        }
    },
    watch:{
        selectArea(n,o){
            this.selectCountry = undefined;
            this.countryChecked3 = false;
        },
        //类型3 全选国家值变化
        countryChecked3(n,o){
            if(!this.country_multiple) return;
            if(!n){//非全选
                this.selectCountry = [];
                return;
            }
            this.$nextTick(()=>{
                let countryIdList = [];
                this.countryList1.forEach((item)=>{
                    if(this.area_multiple){//区域是全选
                        if(this.selectArea && this.selectArea.length){
                            if( this.selectArea.includes(item.pid) ) countryIdList.push(item.id);
                        }
                    }else if(this.selectArea == item.pid) countryIdList.push(item.id);
                });
                this.selectCountry = countryIdList;
            });

        },
        //监听国家值变化
        selectCountry(n,o){
            if(this.show_type === 3 && this.country_multiple){//类型3 全选组件处理
                if(n === undefined || (n && n.length === 0)) this.countryChecked3 = false;
            }
        }
    },
    async created() {
        this.areaCountryProps.multiple = this.multiple;
        //获取国家数据渲染组件
        this.getMainDataAndRender();
    },
    props:{
        oss_world_data:{//OSS全世界区域国家数据[id: '1', txt: '亚洲', curr: false, children:[{pid: '1', id: '1', txt: '中国'}...]]
            type: Array,
            default(){
              return []
            }
        },
        show_type:{
            type: Number,
            default: 2,//1、单个国家下拉框，所有区域国家数据都在一起；2、分组带单个select国家下拉框；3、两个select区域国家下拉框；4、区域国家级联下拉框
        },
        multiple:{
            type: Boolean,//是否多选
            default: false
        },
        area_multiple:{
            type: Boolean,//区域是否多选;show_type为3,有效
            default: false
        },
        country_multiple:{
            type: Boolean,//区域是否多选;show_type为3,有效
            default: false
        },
        collapse_tags:{
            type: Boolean,//多选是否合并文字
            default: true
        },
        no_data_text:{//无数据文案
            type: String,
            default: "暂无数据" //"暂无数据"
        },
        no_match_text:{
            type: String,
            default: "无数据匹配" //"无数据匹配"
        },

    },
    mounted() {

    },
    methods:{
        /**
         * 获取所有国家列表，转成平级数组
         * @param {Array} worldData 世界区域国家数据：[id:'1',txt:'亚洲',children:[{pid: '1', id: '1', txt: '中国'}...]]
         * @returns {Array} [{pid: '1', id: '1', txt: '中国'}...]
         */
        getCountryListByWorldData(worldData){
            let list = [];
            worldData.forEach((item,index)=>{
                list = list.concat( item.children );
            });
            return list;
        },
        //获取国家数据渲染组件
        getMainDataAndRender(){
            this.countryList1 = this.getCountryListByWorldData( this.oss_world_data );
            // if(this.show_type === 1 || this.show_type === 3){
            //     this.countryList1 = this.getCountryListByWorldData( this.oss_world_data );
            // }
            // else if(this.show_type === 2){
            //     this.countryList1 = JSON.parse(JSON.stringify(this.oss_world_data));
            // }

        },
        resetCountry(){

        },
        /**
         * 获取已选数据,
         * @returns {Array || Object} 返回数组形式的是  返回数组形式;数组第一个元素是区域的id；第二个是国家id；一维数组标识单选["1","11"],二维数组标识多选[["1","11"],["1","10"]];对象形式是{area,country}
         *
         */
        getSelectedData(){
            const _this = this;
            if(_this.show_type === 3){
                return {
                    area: _this.selectArea,
                    country: _this.selectCountry
                }

            }
            function getItemArrId(array,val){
                if(val === undefined) return false;

                let list = [];
                for (let index = 0; index < array.length; index++) {
                    const element = array[index];
                    if(typeof val === "object"){
                        if( val.includes( element.id ) ){
                            list.push( [element.pid, element.id] );
                        }
                    }else if(element.id === val){
                        list = [element.pid, element.id];
                        break;
                    }
                }
                return list;
            }
            if(this.show_type === 1 || this.show_type === 2 || this.show_type === 3){
                return getItemArrId(this.countryList1, this.selectCountry);
            }
            if(this.show_type === 4){
                //select，数组为多选，number，string为单选
                return this.selectCountry;
            }

        },
        //根据区域id筛选对应国家显示
        showCountryByArea(item){
            if(this.selectArea === undefined || this.selectArea == ''){
                return true;
            }
            if(typeof this.selectArea === "object"){
                if(this.selectArea.length) return this.selectArea.includes( item.pid );
                return true;
            }
            return this.selectArea === item.pid;
                
            
        },

    }
  }
</script>

<style scoped>
</style>
