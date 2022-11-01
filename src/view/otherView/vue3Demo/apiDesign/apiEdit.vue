// 编辑弹窗
<template>
  <div class="apiEditContainer">
    <!-- 头部操作栏 -->
    <div class="topContanier"></div>
    <div class="leftContainer">
      <!-- 选择表 -->
      <div class="itemTitle">选择表</div>
      <el-divider></el-divider>
      <el-form ref="apiForm" :model="apiForm" label-width="80px">
          <el-form-item label="数据源类型">
            <el-select v-model="apiForm.dataSourceType" placeholder="请选择数据源类型">
              <el-option label="MySQL" value="MySQL"></el-option>
              <el-option label="Oracle" value="Oracle"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据源名称">
            <el-select v-model="apiForm.dataSourceName" placeholder="请选择数据源名称">
              <el-option v-for="item in dataSourceList" :key="item.label" label="item.label" value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据表名称">
            <el-select v-model="apiForm.dataFormName" placeholder="请选择数据表名称">
              <el-option v-for="item in dataSourceList" :key="item.label" label="item.label" value="item.value"></el-option>
            </el-select>
          </el-form-item>
      </el-form>
      <!-- 选择参数 -->
      <div class="itemTitle">选择参数</div>
      <el-divider></el-divider>
      <el-input v-model="fieldName" placeholder="搜索字段名称" suffix-icon="el-icon-search" @blur="queryParames"></el-input>
      <el-table
          :data="apiParamConfig"
          highlight-current-row
          border
          stripe
          :header-cell-style="{background:'#eaf1f7',color:'#606266',fontSize:'13px',fontWeight:'600'}"
      >
          <el-table-column prop="isRequestParam" label="设为请求参数" width="120" >
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.xxxchecked"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="isReturnParam" label="设为返回参数" width="120" >
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.xxxchecked"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="fieldName" label="字段名"  width="120"  show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="fieldType" label="字段类型" width="120"  show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="fieldDesc" label="字段描述" width="280"  show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" @click.stop="handleShowAgentView(scope.row)">分配同步账号
                  </el-button>
              </template>
          </el-table-column> -->
      </el-table>
      <!-- 排序字段（仅向导模式的返回参数tab页可见） -->
      <div class="itemTitle">排序字段</div>
      <el-divider></el-divider>
      <!-- <el-table
          :data="apiParamConfig"
          highlight-current-row
          border
          stripe
          :header-cell-style="{background:'#eaf1f7',color:'#606266',fontSize:'13px',fontWeight:'600'}"
      >
          <el-table-column type="index" width="80" label="序号" >
          </el-table-column>
          <el-table-column prop="fieldName" label="字段名"  width="160"  show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="isRequestParam" label="排序方式" width="200" >
            <template slot-scope="scope">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleEdit(scope.row)">上移</el-button>
                  <el-button type="text" size="small" @click.stop="handleShowAgentView(scope.row)">下移</el-button>
                  <el-button type="text" size="small" @click.stop="handleShowAgentView(scope.row)">删除</el-button>
              </template>
          </el-table-column>
      </el-table> -->
    </div>
    <div class="rightTabs">

      <!-- 属性配置 -->
      
      <!-- 请求参数配置 -->
      <el-table
          :data="requestParamList"
          highlight-current-row
          border
          stripe
          :header-cell-style="{background:'#eaf1f7',color:'#606266',fontSize:'13px',fontWeight:'600'}"
      >
          <el-table-column prop="requestParamName" label="参数名称" width="120" >
            <template slot-scope="scope">
              <el-input v-model="scope.row.xxxrequestParamName"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="fieldName" label="绑定字段"  width="120"  show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="fieldName" label="参数类型" width="120" >
            <template slot-scope="scope">
              <el-select v-model="scope.row.xxx" placeholder="请选择参数类型">
                <el-option label="LONG" value="LONG"></el-option>
                <el-option label="STRING" value="STRING"></el-option>
                <el-option label="VARCHAR" value="VARCHAR"></el-option>
                <el-option label="INT" value="INT"></el-option>
                <el-option label="BIGINT" value="BIGINT"></el-option>
                <el-option label="DATETIME" value="DATETIME"></el-option>
                <el-option label="xxx" value="xxx"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="fieldName" label="参数位置" width="120" >
            <template slot-scope="scope">
              <el-select v-model="scope.row.xxx" placeholder="请选择参数位置">
                <el-option label="QUERY" value="QUERY"></el-option>
                <el-option label="xxx" value="xxx"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作符" width="120" >
            <template slot-scope="scope">
              <el-select v-model="scope.row.xxx" placeholder="请选择操作符">
                <el-option label="等于" value="="></el-option>
                <el-option label="大于" value=">"></el-option>
                <el-option label="小于" value="<"></el-option>
                <el-option label="不等于" value="!="></el-option>
                <el-option label="大于等于" value=">="></el-option>
                <el-option label="小于等于" value="<="></el-option>
                <el-option label="xxx" value="xxx"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="isNeed" label="是否必填" width="120" >
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.xxxchecked"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="requestParamName" label="示例值" width="120" >
            <template slot-scope="scope">
              <el-input v-model="scope.row.xxxrequestParamName"></el-input>
            </template>
          </el-table-column>
      </el-table>
      <!-- 返回参数配置 -->
      <el-table
          :data="requestParamList"
          highlight-current-row
          border
          stripe
          :header-cell-style="{background:'#eaf1f7',color:'#606266',fontSize:'13px',fontWeight:'600'}"
      >
          <el-table-column prop="requestParamName" label="参数名称" width="120" >
            <template slot-scope="scope">
              <el-input v-model="scope.row.xxxrequestParamName"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="fieldName" label="绑定字段"  width="120"  show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="fieldName" label="参数类型" width="120" >
            <template slot-scope="scope">
              <el-select v-model="scope.row.xxx" placeholder="请选择参数类型">
                <el-option label="LONG" value="LONG"></el-option>
                <el-option label="STRING" value="STRING"></el-option>
                <el-option label="VARCHAR" value="VARCHAR"></el-option>
                <el-option label="INT" value="INT"></el-option>
                <el-option label="BIGINT" value="BIGINT"></el-option>
                <el-option label="DATETIME" value="DATETIME"></el-option>
                <el-option label="xxx" value="xxx"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="requestParamName" label="示例值" width="120" >
            <template slot-scope="scope">
              <el-input v-model="scope.row.xxxrequestParamName"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="requestParamName" label="描述" width="120" >
            <template slot-scope="scope">
              <el-input v-model="scope.row.xxxrequestParamName"></el-input>
            </template>
          </el-table-column>
      </el-table>
      <!-- 版本管理 -->


    </div>
  </div>
</template>
<script>
// 组合api，计算属性computed需要显式的引入
import {ref,reactive,computed,watch} from 'vue'
export default{
  name:'vue3TemplateMap',
  props:[],
  // 触发提交事件的定义
  emits:['my-event','submit'],
  //setup（prop,context）{}默认接收两个参数，后者表示上下文即捡漏之王attrts、solt插槽、$emit
  setup(){
    //------------------------------“选择表”相关数据和方法--------------------------
    // 当前api选择的数据库表
    let apiForm = reactive({
      dataSourceType:'',
      dataSourceName:'',
      dataFormName:'',
    })

    //数据源列表
    let dataSourceList = ref([]);
    function getDataSourceList(){
     
    }
    //数据表列表
    let dataFormList = ref([]);
    function getdataFormList(){

    }
    OnMounted(
      getDataSourceList,
    )
    //----------------------------------------“选择参数”相关数据和方法---------------------
    //搜索字段名称
    let fieldName = ref("")
    //请求搜索符合字段名称的字段
    function queryfieldName(){
      if(fieldName!=="" || fieldName!==null){
        let params={
          fieldName:fieldName
        }
      }
    }
    //API参数列表
    let apiParamConfig = reactive([]);
    function getApiParamsConfig(){
    }
    //---------------------------------------“排序字段”相关数据方法-------------------------
    //---------------------------------------“属性”相关数据方法-------------------------
    //---------------------------------------“请求参数”相关数据方法-------------------------
    let requestParamList = ref([]);

    //---------------------------------------“返回参数”相关数据方法-------------------------
    //---------------------------------------“版本”相关数据方法-------------------------



    



    // 将创建好的data和methods暴露给外部使用（闭包写法，提升作用域）
    return{
      apiForm,
      dataSourceList,
      dataFormList,

     
    }
  },
}
</script>
<style lang="scss" scoped>
.apiEditContainer{
  display: flex;
  height: 100%;
  width: 100%;

  .leftContainer{
    flex:3;

  }
  .rightTabs{
    flex:2;

  }

}

.itemTitle{
  border-bottom: 2px solid rgb(100, 202, 228);
  color: blue;
  padding: 15px;
}


</style>