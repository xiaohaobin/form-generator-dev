<template>
  <div>
    <div class="pd-10 box-bg">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>校验规则管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="pd-10 box-bg">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="规则名称">
          <el-input v-model="formInline.regularName" placeholder="请输入" size="small"></el-input>
        </el-form-item>
        <el-form-item label="校验类型">
          <el-select v-model="formInline.checkType" placeholder="请选择" filterable :style="{width: '100%'}">
            <el-option v-for="(item, index) in checkTypeOptions" :key="index" :label="item.label" :value="item.value"
              :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="正则表达式/方法路劲">          
          <el-input v-model="formInline.regularOrFunction" placeholder="请输入" size="small"></el-input>
        </el-form-item>
        

        <el-form-item>
          <el-button type="primary" @click="query" size="small">{{ $t('query') }}</el-button>
          <el-button type="primary" size="small" plain @click="resetFormInline">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="pd-10 box-bg">
      <div class="flex-flex-end mb-5">
        <el-button type="primary" size="small" plain icon="el-icon-plus" @click="handleAdd">新建规则</el-button>
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
          prop="regularName"
          label="规则名称"
          width="150">
        </el-table-column>                

        <el-table-column
          label="正则表达式/方法路劲">
          <template slot-scope="scope">
            <span>{{ scope.row.checkType === 1 ? scope.row.webRegular : scope.row.serverFunction }}</span>
          </template>
        </el-table-column>        

        <el-table-column
          label="校验类型">
          <template slot-scope="scope">
            <span>{{ $xhb.getItemByProp(checkTypeOptions,'value',scope.row.checkType).label }}</span>
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

        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div>
              <el-link class="el-icon-edit-outline mr-10" :underline="false" title="编辑规则" @click="handleEdit(scope.$index, scope.row)"></el-link>
              <el-link class="el-icon-delete" :underline="false" title="删除规则" @click="handleDelete(scope.$index, scope.row)" type="danger"></el-link>
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
				:title="optionMode === 1 ? '新建规则' : '编辑规则'"
				:visible.sync="addDialog"
				:modal="true"
				:append-to-body="true"
				:modal-append-to-body="true"
				:close-on-click-modal="false"
        @opened="openedAddDialog"
				width="45%">
        <el-form ref="addRegularFormDOM" :model="addRegularForm" :rules="rules" size="small" label-width="150px" :key="addRegularFormDOMKey">
          <el-form-item label="规则名称" prop="regularName">
            <el-input v-model="addRegularForm.regularName" placeholder="请输入" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>

          <el-form-item label="校验类型" prop="checkType">
            <el-select v-model="addRegularForm.checkType" placeholder="请选择" filterable
              :style="{width: '100%'}">
              <el-option v-for="(item, index) in checkTypeOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="正则表达式" prop="webRegular" v-if="addRegularForm.checkType === 1">            
            <span slot="label">
              <span class="mr-5">表达</span>
              <el-tooltip content="Right Center 提示文字" placement="right">
                  <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </span>

            <el-input v-model="addRegularForm.webRegular" type="textarea" placeholder="请输入" :maxlength="5000"
              :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
          
          <el-form-item label="后端方法路径" prop="serverFunction" v-if="addRegularForm.checkType === 2">
            <el-input v-model="addRegularForm.serverFunction" type="textarea" placeholder="请输入" :maxlength="5000"
              :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addRegularForm.remark" type="textarea" placeholder="请输入" :maxlength="5000"
              :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>

          <el-form-item size="small" class="flex-flex-end">
            <el-button @click="addRegularResetForm">取消</el-button>
            <el-button type="primary" @click="addRegularSubmitForm">确定</el-button>            
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
      }];

      return {
        formInline: {
          regularName: '',          
          regularOrFunction: '',
          checkType:undefined
        },
        checkTypeOptions:[
          {label:'输入校验',value:1},
          {label:'数据校验',value:2},
        ],
        tableStyleConfig:{
          thead:{padding:'6px 0',backgroundColor:'#ebf7ff',borderColor:'#d5e7f2'},
          tbody:{border:'none'}
        },       
        tableList:[
          {regularName:"一般输入框", checkType:1,webRegular:"/^[a-zA-Z0-9_\.]{1,200}$/",serverFunction:"serverFunction",creator:"admin",createdDate:'2024-01-08',lastUpdatePeople:'admin',lastUpdateDate:'2024-01-09',remark:'不能输入特殊字符(点和下划线除外),最多200个字符',id:1},
          {regularName:"工单申请规则1", checkType:2,webRegular:"/^[a-zA-Z0-9_\.]{1,200}$/",serverFunction:"serverFunction",creator:"admin",createdDate:'2024-01-08',lastUpdatePeople:'admin',lastUpdateDate:'2024-01-09',remark:'不能输入特殊字符(点和下划线除外),最多200个字符',id:2},
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
        addRegularForm: {
          regularName: undefined,
          checkType: 1,
          webRegular: undefined,
          serverFunction: undefined,
          remark: undefined,
        },
        rules: {
          regularName: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
          }, {            
            pattern:/^[\u4E00-\u9FA5a-zA-Z0-9_\.]{1,200}$/,
						message: '不能输入特殊字符(点和下划线除外),最多200个字符',
            trigger: 'blur'
          }],
          checkType: selectRules,
          webRegular: inputRules,
          serverFunction: inputRules,
          remark: [],
        },
        addRegularFormDOMKey: +new Date(),
      }
    },
    created() {
      //请求规则列表
      this.getMainList()
    },
    mounted() {
      // console.log(this.$xhb.getItemByProp(this.checkTypeOptions,'value',1))
    },
    methods:{     
      query(){
        this.getMainList();
      },
      //重置查询条件
      resetFormInline(){
        this.formInline.regularOrFunction = '';
        this.formInline.regularName = '';
        this.formInline.checkType = undefined;
      },      
      //打开添加模板弹层动画结束
      openedAddDialog(){
        if(this.optionMode === 1){          
          this.$nextTick(()=>{
            this.addRegularResetForm();
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
          this.$data.addRegularForm.regularName = row.regularName;
          this.$data.addRegularForm.checkType = row.checkType;
          this.$data.addRegularForm.remark = row.remark;
          this.$data.addRegularForm.webRegular = row.webRegular;
          this.$data.addRegularForm.serverFunction = row.serverFunction;
        });
      },     
      handleDelete(index,row){
        this.$confirm('确定删除该规则?', '提示', {
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
      addRegularSubmitForm() {
        this.$refs['addRegularFormDOM'].validate(valid => {
          if (!valid) return;
          // TODO 提交表单
          //清空选中item，并关闭弹层
          this.currEditItem = null;
          this.addDialog = false;
        })
      },
      async addRegularResetForm() {        
        this.$data.addRegularForm.regularName = undefined;
        this.$data.addRegularForm.checkType = 1;
        this.$data.addRegularForm.webRegular = undefined;
        this.$data.addRegularForm.serverFunction = undefined;
        this.$data.addRegularForm.remark = undefined;
        this.$nextTick(()=>{
          this.$refs['addRegularFormDOM'].resetFields();
          this.addRegularFormDOMKey = +new Date();
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
          url: 'regular/list.json',
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
