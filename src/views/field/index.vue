<template>
  <div>
    <div class="pd-10 box-bg">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>字段管理后台</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="pd-10 box-bg">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">        
        <el-form-item label="表名">
          <el-select v-model="formInline.tableName" placeholder="请选择" filterable :style="{width: '100%'}">
            <el-option v-for="(item, index) in tableNameOptions" :key="index" :label="item.label" :value="item.value"
              :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表对应字段">
          <el-input v-model="formInline.tableField" placeholder="请输入" size="small"></el-input>
        </el-form-item>
        <el-form-item label="字段别名">          
          <el-input v-model="formInline.fieldAlias" placeholder="请输入" size="small"></el-input>
        </el-form-item>
        

        <el-form-item>
          <el-button type="primary" @click="query" size="small">{{ $t('query') }}</el-button>
          <el-button type="primary" size="small" plain @click="resetFormInline">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="pd-10 box-bg">
      <div class="flex-flex-end mb-5">
        <el-button type="primary" size="small" plain icon="el-icon-plus" @click="handleAdd">新建字段</el-button>
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
          prop="id"
          label="ID"
          width="50">
        </el-table-column>

        <el-table-column
          prop="tableName"
          label="表名"
          >
        </el-table-column>                

        <el-table-column
          prop="tableField"
          label="表对应字段">         
        </el-table-column>        

        <el-table-column
          prop="fieldAlias"
          label="字段别名">         
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

        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div>
              <el-link class="el-icon-edit-outline mr-10" :underline="false" title="编辑字段" @click="handleEdit(scope.$index, scope.row)"></el-link>
              <el-link class="el-icon-delete" :underline="false" title="删除字段" @click="handleDelete(scope.$index, scope.row)" type="danger"></el-link>
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
				:title="optionMode === 1 ? '新建字段' : '编辑字段'"
				:visible.sync="addDialog"
				:modal="true"
				:append-to-body="true"
				:modal-append-to-body="true"
				:close-on-click-modal="false"
        @opened="openedAddDialog"
				width="45%">
        <el-form ref="addFieldFormDOM" :model="addFieldForm" :rules="rules" size="small" label-width="150px" :key="addFieldFormDOMKey">          
          <el-form-item label="表名" prop="tableName">
            <el-select v-model="addFieldForm.tableName" placeholder="请选择" filterable
              :style="{width: '100%'}" @change="tableNameChange">
              <el-option v-for="(item, index) in tableNameOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="表对应字段" prop="tableField">
            <el-select v-model="addFieldForm.tableField" placeholder="请选择" filterable
              :style="{width: '100%'}">
              <el-option v-for="(item, index) in tableFieldOptions" :key="index" :label="item" :value="item" ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="字段别名" prop="fieldAlias">
            <el-input v-model="addFieldForm.fieldAlias" placeholder="请输入" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
         
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addFieldForm.remark" type="textarea" placeholder="请输入" :maxlength="5000"
              :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>

          <el-form-item size="small" class="flex-flex-end">
            <el-button @click="addFieldResetForm">取消</el-button>
            <el-button type="primary" @click="addFieldSubmitForm">确定</el-button>            
          </el-form-item>
        </el-form>

			</el-dialog>	
      <!-- 新建模板dialog eee -->

     

  </div>
</template>

<script>
  import {getFieldListApiByPage, delField, addField, updateField, getDatabaseTableList} from '@/utils/api.js'

  export default {
    name: "field",
    data() {
      const selectRules = [{
        required: true,
        message: '请选择',
        trigger: 'change'
      }];

      const inputRules = [{
        required: true,
        message: '请输入',
        trigger: 'blur'
      }];

      return {
        formInline: {
          tableField: '',          
          fieldAlias: '',
          tableName:undefined
        },
        tableNameOptions:[
          // {label:'用户表',value:'user_tbl'},
          // {label:'设备表',value:'device_tbl'},
        ],
        tableFieldOptions:[],
        tableStyleConfig:{
          thead:{padding:'6px 0',backgroundColor:'#ebf7ff',borderColor:'#d5e7f2'},
          tbody:{border:'none'}
        },       
        tableList:[
          {tableField:"userName", fieldAlias:"用户名称", tableName:"server_function",creator:"admin",createdDate:'2024-01-08',lastUpdatePeople:'admin',lastUpdateDate:'2024-01-09',remark:'用户表下的用户名',id:1},          
        ],
        pageConfig:{
          total:0,
          page:1,
          size:10
        },
        //新增，编辑，审核模板变量===========================
        addDialog:false,
        currEditItem:null,//当前编辑模板
        optionMode:1,//1,2,3分别代表，新建、编辑、复制模式
        addFieldForm: {
          tableField: undefined,//表字段
          tableName: undefined,//表名
          fieldAlias:'',//字段别名
          remark: undefined,
        },
        rules: {
          fieldAlias: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
          }, {            
            pattern:/^[\u4E00-\u9FA5a-zA-Z0-9_\.]{1,200}$/,
						message: '不能输入特殊字符(点和下划线除外),最多200个字符',
            trigger: 'blur'
          }],
          tableName: selectRules,
          tableField: selectRules,
          remark: [],
        },
        addFieldFormDOMKey: +new Date(),
      }
    },
    created() {
      //请求规则列表
      this.getMainList();

      //请求所有数据库表列表数据
      this.getDataBaseTableList();
    },
    mounted() {
      // console.log(this.$xhb.getItemByProp(this.tableNameOptions,'value',1))
    },
    methods:{     
      query(){
        this.getMainList();
      },
      //重置查询条件
      resetFormInline(){
        this.formInline.fieldAlias = '';
        this.formInline.tableField = undefined;
        this.formInline.tableName = undefined;
      },      
      //打开添加模板弹层动画结束
      openedAddDialog(){
        if(this.optionMode === 1){          
          this.$nextTick(()=>{
            this.addFieldResetForm();
          });
        }
      },
      handleAdd(){           
        this.optionMode = 1;    
        this.addDialog = true;        
      },
      handleEdit(index,row){
        this.currEditItem = row;

        this.optionMode = 2;   
        this.addDialog = true;

        this.$nextTick(()=>{
          this.$data.addFieldForm.tableName = row.tableName;
          this.$data.addFieldForm.tableField = row.tableField;
          this.$data.addFieldForm.fieldAlias = row.fieldAlias;
          this.$data.addFieldForm.remark = row.remark;
          //重新设置字段options数据集
          this.resetTableFieldOptions();
        });
      },     
      handleDelete(index,row){
        this.$confirm('确定删除该字段?', '提示', {
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
      addFieldSubmitForm() {
        this.$refs['addFieldFormDOM'].validate(valid => {
          if (!valid) return;
          // TODO 提交表单
          //清空选中item，并关闭弹层
          this.currEditItem = null;
          this.addDialog = false;
        })
      },
      async addFieldResetForm() {        
        this.$data.addFieldForm.tableField = undefined;
        this.$data.addFieldForm.tableName = undefined;
        this.$data.addFieldForm.fieldAlias = '';
        this.$data.addFieldForm.remark = '';
        this.$nextTick(()=>{
          this.$refs['addFieldFormDOM'].resetFields();
          this.addFieldFormDOMKey = +new Date();
        })
        
      },
      //请求字段列表
      getMainList(param={}){       
        let defaultData = {
          page:this.pageConfig.page,
          size:this.pageConfig.size
        };
        const requestData = { ...defaultData, ...param, ...this.formInline};
        console.log(requestData,"requestData")

        getFieldListApiByPage( this.$com.resetDataType(requestData) ).then(res => {
            console.log(res,"res")
            if(res.code*1 === 200){
              this.tableList = res.data;
              this.pageConfig.total = res.totalCount;
            }
        }, err => {
          console.log(err)
        });

        // this.$requestLocal({
        //   data:this.$com.resetDataType(requestData),
        //   url: 'field/list.json',
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
      //请求所有数据库表列表数据
      getDataBaseTableList(){
        getDatabaseTableList( this.$com.resetDataType({}) ).then(res => {
            console.log(res,"res")
            if(res.code*1 === 200){
              res.data.forEach((item)=>{
                item.value = item.name;
              });
              this.tableNameOptions = res.data;
            }
        }, err => {
          console.log(err)
        });

        // this.$requestLocal({
        //   data:this.$com.resetDataType({}),
        //   url: 'field/databaseTableList.json',
        //   method:"get"
        // }).then(res => {
        //     console.log(res,"res")
        //     if(res.result*1 === 0){
        //       res.obj.forEach((item)=>{
        //         item.value = item.name;
        //       });
        //       this.tableNameOptions = res.obj;
        //     }
        // }, err => {
        //   console.log(err)
        // });
      },
      tableNameChange(){
        this.addFieldForm.tableField = undefined;
        //重新设置字段options数据集
        this.resetTableFieldOptions();
      },
      //重新设置字段options数据集
      resetTableFieldOptions(){
        this.tableNameOptions.forEach((item)=>{
          if(item.name === this.addFieldForm.tableName){
            this.tableFieldOptions = item.children;
          }
        });
      }
      
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
