<template>
  <div>
    <div class="pd-10 box-bg">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公共查询类接口管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="pd-10 box-bg">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="接口名称">
          <el-input v-model="formInline.apiName" placeholder="请输入" size="small"></el-input>
        </el-form-item>
        <!-- <el-form-item label="请求类型">
          <el-select v-model="formInline.requestMethod" placeholder="请选择" filterable :style="{width: '100%'}">
            <el-option v-for="(item, index) in requestMethodOptions" :key="index" :label="item.label" :value="item.value"
              :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item> -->
        

        <el-form-item>
          <el-button type="primary" @click="query" size="small">{{ $t('query') }}</el-button>
          <el-button type="primary" size="small" plain @click="resetFormInline">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="pd-10 box-bg">
      <div class="flex-flex-end mb-5">
        <el-button type="primary" size="small" plain icon="el-icon-plus" @click="handleAdd">新建公共接口</el-button>
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
          prop="apiName"
          label="接口名称">
        </el-table-column>  
        
        <el-table-column
          prop="apiUrl"
          label="接口控制器和方法（路径）">
        </el-table-column>

        <el-table-column
          prop="requestMethod"
          label="请求方法">
        </el-table-column>

        <el-table-column
          prop="requestParam"
          label="请求参数">
        </el-table-column>

        <el-table-column
          prop="contentType"
          label="Content-Type">
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
          label="操作">
          <template slot-scope="scope">
            <div>
              <el-link class="el-icon-edit-outline mr-10" :underline="false" title="编辑接口" @click="handleEdit(scope.$index, scope.row)"></el-link>
              <el-link class="el-icon-delete" :underline="false" title="删除接口" @click="handleDelete(scope.$index, scope.row)" type="danger"></el-link>
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
				:title="optionMode === 1 ? '新建接口' : '编辑接口'"
				:visible.sync="addDialog"
				:modal="true"
				:append-to-body="true"
				:modal-append-to-body="true"
				:close-on-click-modal="false"
        @opened="openedAddDialog"
				width="45%">
        <el-form ref="addAPIFormDOM" :model="addAPIForm" :rules="rules" size="small" label-width="150px" :key="addAPIFormDOMKey">
          <el-form-item label="接口名称" prop="apiName">
            <el-input v-model="addAPIForm.apiName" placeholder="请输入" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="请求方式" prop="requestMethod">
            <el-select v-model="addAPIForm.requestMethod" placeholder="请选择" filterable
              :style="{width: '100%'}">
              <el-option v-for="(item, index) in requestMethodOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>            

          <el-form-item label="接口控制器和方法（路径）" prop="apiUrl">
            <el-input v-model="addAPIForm.apiUrl" placeholder="请输入" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>

          <el-form-item label="请求参数" prop="requestParam">
            <el-input v-model="addAPIForm.requestParam" type="textarea" placeholder="请输入" :maxlength="5000"
              :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>      
          
          <el-form-item label="Content-Type" prop="contentType">
            <el-select v-model="addAPIForm.contentType" placeholder="请选择" filterable
              :style="{width: '100%'}">
              <el-option v-for="(item, index) in contentTypeOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>       

          <el-form-item size="small" class="flex-flex-end">
            <el-button @click="addAPIResetForm">取消</el-button>
            <el-button type="primary" @click="addAPISubmitForm">确定</el-button>            
          </el-form-item>
        </el-form>

			</el-dialog>	
      <!-- 新建模板dialog eee -->

     

  </div>
</template>

<script>
  

  export default {
    name: "regular",
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
      }, {            
        pattern:/^[\u4E00-\u9FA5a-zA-Z0-9_\.]{1,200}$/,
        message: '不能输入特殊字符(点和下划线除外),最多200个字符',
        trigger: 'blur'
      }];

      const inputRules2 = [{
          required: true,
          message: '请输入',
          trigger: 'blur'
      }];

      return {
        formInline: {
          apiName: '',      
          requestMethod:undefined
        },
        requestMethodOptions:[
          {label:'GET',value:'GET'},
          {label:'POST',value:'POST'},
        ],
        contentTypeOptions:[
          {label:'application/x-www-form-urlencoded',value:'application/x-www-form-urlencoded'},
          {label:'multipart/form-data',value:'multipart/form-data'},
          {label:'application/json',value:'application/json'},
        ],
        tableStyleConfig:{
          thead:{padding:'6px 0',backgroundColor:'#ebf7ff',borderColor:'#d5e7f2'},
          tbody:{border:'none'}
        },       
        tableList:[
          {apiName:"国家数据列表接口", requestMethod:"GET",contentType:'application/x-www-form-urlencoded',apiUrl:"/common/getAreaCountryName",requestParam:'',creator:"admin",createdDate:'2024-01-08',lastUpdatePeople:'admin',lastUpdateDate:'2024-01-09',id:1},
          {apiName:"查询城市接口", requestMethod:"POST",contentType:'application/x-www-form-urlencoded',apiUrl:"/common/searchCitys",requestParam:'{}',creator:"admin",createdDate:'2024-01-08',lastUpdatePeople:'admin',lastUpdateDate:'2024-01-09',id:2},
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
        addAPIForm: {
          apiName: undefined,
          requestMethod: "GET",
          contentType:'application/x-www-form-urlencoded',
          apiUrl:'',
          requestParam:"{}"
        },
        rules: {
          apiName: inputRules,
          apiUrl:inputRules2,
          requestParam:inputRules2,
          requestMethod: selectRules,
          contentType: selectRules,
        },
        addAPIFormDOMKey: +new Date(),
      }
    },
    created() {
      //请求规则列表
      this.getMainList()
    },
    mounted() {
      // console.log(this.$xhb.getItemByProp(this.requestMethodOptions,'value',1))
    },
    methods:{     
      query(){
        this.getMainList();
      },
      //重置查询条件
      resetFormInline(){
        this.formInline.apiName = '';
      },      
      //打开添加模板弹层动画结束
      openedAddDialog(){
        if(this.optionMode === 1){          
          this.$nextTick(()=>{
            this.addAPIResetForm();
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
        
          this.$data.addAPIForm.apiName = row.apiName;
          this.$data.addAPIForm.requestMethod = row.requestMethod;
          this.$data.addAPIForm.contentType = row.contentType;
          this.$data.addAPIForm.apiUrl = row.apiUrl;
          this.$data.addAPIForm.requestParam = row.requestParam;
        });
      },     
      handleDelete(index,row){
        this.$confirm('确定删除该接口?', '提示', {
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
      addAPISubmitForm() {
        this.$refs['addAPIFormDOM'].validate(valid => {
          if (!valid) return;
          // TODO 提交表单
          //清空选中item，并关闭弹层
          this.currEditItem = null;
          this.addDialog = false;
        })
      },
      async addAPIResetForm() {
        this.$data.addAPIForm.apiName = undefined;
        this.$data.addAPIForm.requestMethod = "GET";
        this.$data.addAPIForm.contentType = 'application/x-www-form-urlencoded';
        this.$data.addAPIForm.apiUrl = '';
        this.$data.addAPIForm.requestParam = "{}";
        this.$nextTick(()=>{
          this.$refs['addAPIFormDOM'].resetFields();
          this.addAPIFormDOMKey = +new Date();
        })
        
      },
      //请求规则列表
      getMainList(param={}){       
        let defaultData = {
          page:this.pageConfig.page,
          size:this.pageConfig.size
        };
        const requestData = { ...defaultData, ...param, ...this.formInline};
        console.log(requestData,"requestData")

        this.$requestLocal({
          data:this.$com.resetDataType(requestData),
          url: 'commonAPI/list.json',
          method:"get"
        }).then(res => {
            console.log(res,"res")
            if(res.result*1 === 0){
              this.tableList = res.obj.datas;
              this.pageConfig.total = res.obj.total;
            }
        }, err => {
          console.log(err)
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
