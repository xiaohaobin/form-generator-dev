<template>
  <div>
    <div class="pd-10 box-bg">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>换机申请模板管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="pd-10 box-bg">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="适用产品">
          <el-input v-model="formInline.product" placeholder="请输入" size="small"></el-input>
        </el-form-item>
        <el-form-item label="模板名称">          
          <el-input v-model="formInline.tempName" placeholder="请输入" size="small"></el-input>
        </el-form-item>

        <el-form-item label="适用国家">  
          <xhb-country-select :oss_world_data="oss_world_data" :show_type="2" 
							ref="xhbCountrySelectDom" 
							:multiple="true"
							:area_multiple="true"
							:country_multiple="true"></xhb-country-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="query" size="small">{{ $t('query') }}</el-button>
          <el-button type="primary" size="small" plain @click="resetFormInline">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="pd-10 box-bg">
      <div class="flex-flex-end mb-5">
        <el-button type="primary" size="small" plain icon="el-icon-plus" @click="handleAdd">新建模板</el-button>
      </div>
     
      <el-table
        :data="tableList"
        stripe
        border
        :header-cell-style="tableStyleConfig.thead"
        :cell-style="tableStyleConfig.tbody"
        size="small"
        header-row-class-name="diy-table-header-row"
        style="width: 100%">
        <el-table-column
          prop="tempName"
          label="模板名称"
          width="150">
        </el-table-column>
        <el-table-column
          label="适用国家"
          >
          <template slot-scope="scope">
            <span>{{ getCountryTxtById(scope.row.country) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="适用产品">
          <template slot-scope="scope">
            <span>{{ $xhb.getItemByProp(productTypeOptions,'value',scope.row.productType).label }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="creator"
          label="创建者">
        </el-table-column>

        <el-table-column
          prop="createdDate"
          label="创建时间">
        </el-table-column>

        <el-table-column
          prop="lastUpdatePeople"
          label="最近修改人">
        </el-table-column>

        <el-table-column
          prop="lastUpdateDate"
          label="最近修改时间">
        </el-table-column>

        <!-- <el-table-column
          prop="remark"
          label="备注">
        </el-table-column> -->

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div>
              <el-link class="el-icon-edit-outline mr-10" :underline="false" title="编辑模板" @click="handleEdit(scope.$index, scope.row)"></el-link>
              <el-link class="el-icon-document-copy mr-10" :underline="false" title="复制模板" @click="handleCopy(scope.$index, scope.row)"></el-link>
              <el-link class="el-icon-user mr-10" :underline="false" title="审核模板" @click="handleCheck(scope.$index, scope.row)"></el-link>
              <el-link class="el-icon-delete" :underline="false" title="删除模板" @click="handleDelete(scope.$index, scope.row)" type="danger"></el-link>
            </div>            
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-10 flex-flex-end">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="currentChange"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageConfig.size"
          :current-page="pageConfig.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageConfig.total">
        </el-pagination>
      </div>		
    </div>

    <!-- 新建模板dialog sss -->
    <el-dialog
				:title="getTitleByOptionMode()"
				:visible.sync="addDialog"
				:modal="true"
				:append-to-body="true"
				:modal-append-to-body="true"
				:close-on-click-modal="false"
        @opened="openedAddDialog"
				width="45%">
        <el-form ref="addTempFormDOM" :model="addTempForm" :rules="rules" size="small" label-width="150px">
          <!-- <el-form-item label="场景选择" prop="scene" v-if="optionMode !== 3">
            <el-select v-model="addTempForm.scene" placeholder="请选择" filterable :style="{width: '100%'}">
              <el-option v-for="(item, index) in sceneOptions" :key="index" :label="item.label" :value="item.value"
                :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="选择国家" prop="country">
            <el-select v-model="addTempForm.country" placeholder="请选择" filterable clearable :style="{width: '100%'}" :multiple="true" :collapse-tags="true">                
                <el-option-group v-for="(group,i) in oss_world_data" :key="i" :label="group.txt">
                  <el-option
                      v-for="(item,sort) in group.children" :key="sort"
                      :label="item.txt"
                      :value="item.id">
                  </el-option>
                </el-option-group>
          </el-select>
          </el-form-item>
          <el-form-item label="模板名称" prop="tempName">
            <el-input v-model="addTempForm.tempName" placeholder="请输入" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="选择产品类型" prop="productType">
            <el-select v-model="addTempForm.productType" placeholder="请选择" filterable
              :style="{width: '100%'}">
              <el-option v-for="(item, index) in productTypeOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" class="flex-flex-end">
            <el-button @click="addTempResetForm">取消</el-button>
            <el-button type="primary" @click="addTempSubmitForm">确定</el-button>            
          </el-form-item>
        </el-form>

			</el-dialog>	
      <!-- 新建模板dialog eee -->

      <!-- 编辑模板 dialog sss -->
      <el-dialog
				:title="'选择模板类型'"
				:visible.sync="editDialog"
				:modal="true"
				:append-to-body="true"
				:modal-append-to-body="true"
				:close-on-click-modal="false"
				width="45%">
        <el-form ref="editTempFormDOM" size="small" label-width="150px">
          <el-form-item label="选择模板类型">
            <el-select v-model="tempType" placeholder="请选择" filterable
              :style="{width: '100%'}">
              <el-option v-for="(item, index) in tempTypeOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" class="flex-flex-end">
            <el-button @click="editDialog=false">取消</el-button>
            <el-button type="primary" @click="editTempSubmitForm">确定</el-button>            
          </el-form-item>

        </el-form>
    </el-dialog>
    <!-- 编辑模板 dialog eee -->

    <!-- 审核模板 dialog sss -->
    <el-dialog
				:title="'审核方式'"
				:visible.sync="checkDialog"
				:modal="true"
				:append-to-body="true"
				:modal-append-to-body="true"
				:close-on-click-modal="false"
				width="45%">
        <el-form ref="checkTempFormDOM" size="small" label-width="150px">
          <el-form-item >
            <el-radio v-model="checkType" label="1">内部员工</el-radio>
            <el-radio v-model="checkType" label="2">分/安销商</el-radio>
          </el-form-item>
          <el-form-item size="small" class="flex-flex-end">
            <el-button @click="checkDialog=false">取消</el-button>
            <el-button type="primary" @click="checkTempSubmitForm">确定</el-button>            
          </el-form-item>

        </el-form>
    </el-dialog>
    <!-- 审核模板 dialog eee -->

  </div>
</template>

<script>
  import OSSWorldData from '@/utils/OSSWorldData.js'  
  import xhbCountrySelect from '@/components/xhb/xhb-country-select.vue'
  import {getTemplateListApiByPage, delTemplate, addTemplate, updateTemplate} from '@/utils/api.js'

  console.log(OSSWorldData,"OSSWorldData")

  export default {
    name: "template",
    components:{
      xhbCountrySelect
    },
    data() {
      const selectRules = [{
        required: true,
        message: '请选择',
        trigger: 'change'
      }];

      return {
        formInline: {
          tempName: '',          
          product: ''
        },
        tableStyleConfig:{
          thead:{padding:'6px 0',backgroundColor:'#ebf7ff',borderColor:'#d5e7f2'},
          tbody:{border:'none'}
        },
        oss_world_data:OSSWorldData,        
        tableList:[],
        pageConfig:{
          total:0,
          page:1,
          size:10
        },
        //新增，编辑，审核模板变量===========================
        addDialog:false,
        editDialog:false,
        checkDialog:false,
        currEditItem:null,//当前编辑模板
        optionMode:1,//1,2,3分别代表，新建、编辑、复制模式
        addTempForm: {
          scene: undefined,
          tempName: undefined,
          productType: undefined,
          country: undefined,
        },
        rules: {
          scene: selectRules,
          country: selectRules,
          tempName: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
          }, {
            pattern: /^[a-zA-Z0-9_\.]{1,200}$/,
            message: '只能输入1~200的字符由字母、数字、点和下划线组成',
            trigger: 'blur'
          }],
          productType: selectRules,
        },
        sceneOptions: [{
          "label": "选项一",
          "value": 1
        }, {
          "label": "选项二",
          "value": 2
        }],
        productTypeOptions: [{
          "label": "逆变器",
          "value": 1
        }, {
          "label": "采集器",
          "value": 2
        }],
        tempType:1,
        tempTypeOptions:[///发送配件模板/客诉链接模板/工单补录模板/工单转换机模板/Call Log模板
          {value:1, label:"换机申请模板"},
          {value:2, label:"发送配件模板"},
          {value:3, label:"客诉链接模板"},
          {value:4, label:"工单补录模板"},
          {value:5, label:"工单转换机模板"},
          {value:6, label:"Call Log模板"},
        ],
        checkType:'1'
      }
    },
    created() {
      //请求规则列表
      this.getMainList({country:''})
    },
    mounted() {
      // console.log(this.$xhb.getItemByProp(this.productTypeOptions,'value',1))
    },
    methods:{
      //获取标题，根据操作模式
      getTitleByOptionMode(){       
        const titleList = ["新建模板","编辑模板","复制模板"];
        return titleList[this.optionMode - 1]
      },
      query(){
        console.log('获取数据',this.$refs.xhbCountrySelectDom.getSelectedData());
        //请求规则列表
        this.getMainList();
      },
      //重置查询条件
      resetFormInline(){
        this.formInline.tempName = '';
        this.formInline.product = '';
        this.$refs.xhbCountrySelectDom.selectArea = undefined;
        this.$refs.xhbCountrySelectDom.selectCountry = undefined;
      },
      //打开添加模板弹层动画结束
      openedAddDialog(){
        if([1,3].includes(this.optionMode)){
          this.$nextTick(()=>{
            this.addTempResetForm();
          });
        }
      },
      handleAdd(){           
        this.optionMode = 1;    
        this.addDialog = true;        
      },
      handleEdit(index,row){
        this.editDialog = true;
        this.currEditItem = row;
        this.$nextTick(()=>{
           // this.optionMode = 2;   
          // this.addDialog = true;
          // this.addTempForm.tempName = row.tempName;
          // this.addTempForm.country = row.country.split(',');
        })       
      },
      handleCopy(index,row){
        this.optionMode = 3;   
        this.addDialog = true;
        this.currEditItem = row;
      },
      handleDelete(index,row){
        this.$confirm('确定删除该模板?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleCheck(index,row){
        this.checkDialog = true;
        this.currEditItem = row;
      },
      //根据国家id和ids字符转化，获取对应国家文案
      getCountryTxtById(id){
        id = id.split(',');
        let txtList = [];
        this.oss_world_data.forEach((item)=>{
          item.children.forEach((child)=>{
            if(id.includes(child.id)){
              txtList.push(child.txt);
            }
          });
        });
        return txtList.join('/')
      },
       //每一页数目大小变化
       handleSizeChange(size){
        console.log('每一页数目大小变化',size)
        this.pageConfig.page = 1;
        this.pageConfig.size = size;
        this.getMainList();
      },
      //页码变化
      currentChange(page){
        console.log('页码变化',page)  
        this.pageConfig.page = page;    
        this.getMainList();
      },
      //添加复制模板
      addTempSubmitForm() {
        this.$refs['addTempFormDOM'].validate(valid => {
          if (!valid) return;
          // TODO 提交表单
          //清空选中item，并关闭弹层
          this.currEditItem = null;
          this.addDialog = false;
        })
      },
      addTempResetForm() {
        this.$refs['addTempFormDOM'].resetFields()
      },
      //编辑、选择模板类型
      editTempSubmitForm(){
        let params = {tempType: this.tempType, ...this.currEditItem};
        params.tempTypeName = this.tempTypeOptions.filter((item)=>{return item.value === this.tempType})[0].label;

        this.$store.commit(
          'setCurrTempInfo',
          params
        );
        // this.$com.localStorage.setItem('currTempInfo',JSON.stringify(this.currEditItem));
        this.$router.push(
            {name:"home",params }//指定跳转到某个嵌套子页面
        )
      },
      //审核模板
      checkTempSubmitForm(){
        console.log(this.checkType,'选中的审核类型');
        //清空选中item，并关闭弹层
        this.currEditItem = null;
        this.checkDialog = false;
      },
       //请求规则列表
      getMainList(param={}){       
        let defaultData = {
          page:this.pageConfig.page,
          size:this.pageConfig.size
        };

        let countryObj = {country: ''};

        if(param.country !== ''){
          let aCountry = this.$refs.xhbCountrySelectDom.getSelectedData();
          if(aCountry.length){
            let countryIdList = [];
            aCountry.forEach((item)=>{
              countryIdList.push(item[1]);
            });
            countryObj.country = countryIdList.join();
          }
        }
                
        const requestData = { ...defaultData, ...param, ...this.formInline, ...countryObj};
        console.log(requestData,"requestData")

        getTemplateListApiByPage( this.$com.resetDataType(requestData) ).then(res => {
            console.log(res,"res")
            if(res.result*1 === 0){
              this.tableList = res.obj.datas;
              this.pageConfig.total = res.obj.total;
            }
        }, err => {
          console.log(err)
        });

        // this.$requestLocal({
        //   data:this.$com.resetDataType(requestData),
        //   url: 'template/list.json',
        //   method:"get"
        // }).then(res => {
        //     console.log(res,"res")
        //     if(res.result*1 === 0){
        //       this.tableList = res.obj.datas;
        //       this.pageConfig.total = res.obj.total;
        //     }
        // }, err => {
        //   console.log(err)
        // });
      },
    }
  }
</script>

<style scoped>
.box-bg{
  background-color: #fff;
  margin-top: 5px;
  margin-bottom: 5px;
}
.diy-table-header-row{
  background-color: rgba(221 ,221 ,221,0.7) !important;
}
</style>
