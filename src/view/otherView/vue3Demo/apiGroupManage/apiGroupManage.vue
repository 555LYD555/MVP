<template>
<div>
  <div style="display:flex;margin-left:10px;" >
    <span class="header-title">API组管理</span>
  </div>
  <div style="display:flex;justify-content:sppace-around;">
    <el-button @click="handleAdd()">新建</el-button>
    <!-- <el-input v-model="keyWords" placeholder="请输入组名称/创建者/描述"></el-input> -->
    <el-input style="width: 220px;margin-right:20px;" placeholder="请输入组名称/创建者/描述" v-model="queryParam.keyWords"
      clearable @clear="listApiGroup()">
      <el-button slot="append" icon="el-icon-search" @click="listApiGroup()"></el-button>
    </el-input>
  </div>
  <div>
    <el-table
        :data="apiGroupTableData"
        border
        stripe
        style="width: 100%;"
        :header-cell-style="{background:'#eaf1f7',color:'#606266'}"
        v-loading="listLoading"
    >
        <el-table-column prop="groupName" label="组名称" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="path" label="路径" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="groupDesc" label="组描述" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="APINum" label="API数量" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createPeople" label="创建人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleEdit(scope.row)">修改</el-button>
                <el-button type="text" size="small" @click.stop="batchDel([scope.row])">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <p style="width: 96%;margin: 0 auto">
        <el-pagination
            layout="total, prev, pager, next, sizes"
            :current-page="queryParam.pageNum"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 7, 10, 15]"
            :page-size="queryParam.pageSize"
            :total="totalPage" style="float: right">
        </el-pagination>
    </p>
  </div>

  <!-- 新增编辑对话框 -->
  <el-dialog :title="editFormTitle" v-if="editFormVisible" :visible.sync="editFormVisible">
        <el-form :model="editForm" label-width="130px" :rules="editFormRules" ref="editForm">
            <el-row>
                <el-form-item label="组名称" prop="groupName">
                    <el-input v-model="editForm.groupName" placeholder="请输入组名称"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="路径" prop="path">
                    <el-input v-model="editForm.path" placeholder="请输入路径"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="组描述" prop="groupDesc">
                    <el-input v-model="editForm.groupDesc" type="textarea" placeholder="请输入组描述"></el-input>
                </el-form-item>
            </el-row>
            <div slot="footer">
                <el-button type="primary" @click="editSubmit" :loading="editLoading">保存
                </el-button>
            </div>
            <!-- <el-row>
                <el-col :span="12">
                    <el-form-item label="组名称" prop="administrativeAreaName">
                        <el-input v-model="editForm.administrativeAreaName" @focus="displayTree"
                                  clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="路径" prop="administrativeAreaName">
                        <el-input v-model="editForm.administrativeAreaName" @focus="displayTree"
                                  clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="组描述" prop="administrativeAreaName">
                        <el-input v-model="editForm.administrativeAreaName" @focus="displayTree"
                                  clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="API数量" prop="administrativeAreaName">
                        <el-input v-model="editForm.administrativeAreaName" @focus="displayTree"
                                  clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->
            <!-- <el-row>
                <el-col :span="12">
                    <el-form-item label="创建人" prop="administrativeAreaName">
                        <el-input v-model="editForm.administrativeAreaName" @focus="displayTree"
                                  clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="更新时间" prop="administrativeAreaName">
                        <el-input v-model="editForm.administrativeAreaName" @focus="displayTree"
                                  clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->
        </el-form>
  </el-dialog>
</div>
</template>
<script>
import {getCurrentInstance,ref,computed,watch} from 'vue'
export default{
  name:'vue3TemplateMap',
  props:[],
  emits:[],
  setup(){
    //   获取Composition API 上下文对象，以便我们调用“this”相关方法对象
    const { ctx } = getCurrentInstance();

    // api组相关数据
    let apiGroupTableData = ref([]);
    let listLoading = ref();
    // 分页相关
    let totalPage = ref(0);
    let queryParam = ref({
      pageNum:1, //当前页码
      pageSize:10, //每页条数
      keyWords:''
    })


    // 关键字搜索
    function listApiGroup(){
      ctx.$Get(ctx.khConfig.api.listApiGroup, queryParam.value).then(res => {
        totalPage.value = res.totalCount;
        apiGroupTableData.value = res.list;
        listLoading.value = false;
      });
    }
    // 分页查询
    function handleCurrentChange(val) {
        queryParam.value.pageNum = val;
        listApiGroup();
    }

    let editFormVisible = ref(false);
    let editFormTitle = ref("");
    let isAddorEdit = ref(true);
    let editForm = ref({});
    let editLoading = ref(false);
    // 显示新增页面
    function handleAdd(){
      isAddorEdit.value = true;
      editFormVisible.value = true;
      editFormTitle.value = "新增API分组";
      editForm.value = {};
    }
    // 显示编辑页面
    function handleEdit(row){
      isAddorEdit.value = false;
      editFormVisible.value = true;
      editFormTitle.value = "编辑API分组";
      editForm.value = Object.assign({},row);
    }
    // 提交新增信息或编辑信息
    function editSubmit(){
       ctx.$refs.editForm.validate((valid) => {
          if (valid) {
              ctx.$confirm('确认保存吗？', '提示', {}).then(() => {
                  editLoading.value = true;
                  let url;
                  if (isAddOrEdit.value) {
                      url = ctx.khConfig.api.addMenu;
                  } else {
                      url = ctx.khConfig.api.updateMenu;
                  }
                  ctx.$Post(url, editForm.value)
                      .then(res => {
                          editLoading.value = false;
                          editFormVisible.value = false;
                          if (res.errCode === 0) {
                              // this.currentNodeData.menuName = this.editForm.parentMenuName;
                              // this.currentNodeData.id = this.editForm.parentId;
                              // this.init();
                              ctx.$notify({
                                  title: '成功',
                                  message: '保存成功',
                                  type: 'success'
                              });
                          }
                      })
              }).catch((e) => {
                  console.log(e)
              });
          }
      });
    }

    //单个删除
    function handleDeleteApiGroup(row){
      ctx.$confirm('确认删除该菜单域吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        listLoading.value = true;
        let url=ctx.khConfig.api.deleteApiGroup+"/"+row.id;
        ctx.$Get(url).then(res => {
          if (res.errCode === 0) {
              listApiGroup();
              ctx.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success'
              });
          }
          listLoading.value = false;
        }).catch(()=>{
          listLoading.value = false;
        })
      })
    }




    return{
      apiGroupTableData,
      listLoading,
      totalPage,
      queryParam,
      listApiGroup,
      handleCurrentChange,
      editFormVisible,
      editFormTitle,
      isAddorEdit,
      editForm,
      editLoading,
      handleAdd,
      handleEdit,
      editSubmit,
      handleDeleteApiGroup,

    }

    
  }
}
</script>
<style lang="scss" scoped>
 .header-title {
    font-weight: bolder;
    color: #3a3b3f;
    position: relative;
    margin-right: auto;
    margin-top: 5px;

    &::before {
      content: "";
      display: block;
      height: 17px;
      border-right: 3px solid #3581fb;
      position: absolute;
      left: -10px;
    }
  }
</style>
















<template>
  <el-card>
      <div class="gva-search-box">
          <div class="header-title">API组管理</div>
          <el-form ref="searchForm" :inline="true" :model="searchInfo">
              <el-form-item >
                  <el-input v-model="searchInfo.name" placeholder="请输入组名称/创建者/描述" />
              </el-form-item>
              
              <el-form-item>
                  <el-button size="small" type="primary" icon="search" @click="onSubmit">查询</el-button>
                  <el-button size="small" icon="refresh" @click="onReset">重置</el-button>
              </el-form-item>
          </el-form>
      </div>
      <div class="gva-table-box">
          <div class="gva-btn-list">
              <el-button size="small" type="primary" icon="plus" @click="openDialog('addApi')">新增</el-button>
              <el-popover v-model="deleteVisible" placement="top" width="160">
                  <p>确定要删除吗？</p>
                  <div style="text-align: right; margin-top: 8px;">
                      <el-button size="small" type="primary" link @click="deleteVisible = false">取消</el-button>
                      <el-button size="small" type="primary" @click="onDelete">确定</el-button>
                  </div>
                  <template #reference>
                      <el-button icon="delete" size="small" :disabled="!apis.length" style="margin-left: 10px;"
                          @click="deleteVisible = true">删除</el-button>
                  </template>
              </el-popover>
          </div>
          <el-table :data="tableData" @sort-change="sortChange" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" />
              <el-table-column align="left" label="组名称" min-width="150" prop="group_name" sortable="custom" />
              <el-table-column align="left" label="路径" min-width="150" prop="path" sortable="custom" />
              <el-table-column align="left" label="组描述" min-width="150" prop="describe" sortable="custom" />
              <el-table-column align="left" label="API数量" min-width="90" prop="api_name" sortable="custom" />
              <el-table-column align="left" label="创建人" min-width="120" prop="user_name" sortable="custom" />
              <el-table-column align="left" label="更新时间" min-width="150" prop="last_update_time" sortable="custom" />
              <el-table-column align="center" fixed="right" label="操作" width="180">
                  <template #default="scope">
                      <el-button icon="edit" size="small" type="primary" link @click="editApiFunc(scope.row)">修改
                      </el-button>
                      <el-button icon="delete" size="small" type="primary" link @click="deleteApiFunc(scope.row)">删除
                      </el-button>
                  </template>
              </el-table-column>
          </el-table>
          <div class="gva-pagination">
              <el-pagination :current-page="page" :page-size="pageSize" :page-sizes="[10, 30, 50, 100]" :total="total"
                  layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
                  @size-change="handleSizeChange" />
          </div>

      </div>

      <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" :title="dialogTitle">
          <el-form ref="apiForm" :model="form" :rules="rules" label-width="80px">
              <el-form-item label="组名称" prop="group_name">
                  <el-input v-model="form.group_name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="路径" prop="path">
                  <el-input v-model="form.path" autocomplete="off" />
              </el-form-item>
              <el-form-item label="组描述" prop="describe">
                <el-input v-model="form.describe" type="textarea" placeholder="请输入组描述"></el-input>
                  
              </el-form-item>
          </el-form>
          <template #footer>
              <div class="dialog-footer">
                  <el-button size="small" @click="closeDialog">取 消</el-button>
                  <el-button size="small" type="primary" @click="enterDialog">确 定</el-button>
              </div>
          </template>
      </el-dialog>
  </el-card>
</template>

<script setup>
// import {
//   getApiById,
//   getApiList,
//   createApi,
//   updateApi,
//   deleteApi,
//   deleteApisByIds
// } from '@/api/api'
// import { toSQLLine } from '/@/utils/stringFun'
import { ref } from 'vue'

const methodFilter = (value) => {
  const target = methodOptions.value.filter(item => item.value === value)[0]
  return target && `${target.label}`
}

const apis = ref([])
const form = ref({
  path: '',
  apiGroup: '',
  method: '',
  description: ''
})
const methodOptions = ref([
  {
      value: 'POST',
      label: '创建',
      type: 'success'
  },
  {
      value: 'GET',
      label: '查看',
      type: ''
  },
  {
      value: 'PUT',
      label: '更新',
      type: 'warning'
  },
  {
      value: 'DELETE',
      label: '删除',
      type: 'danger'
  }
])

const type = ref('')
const rules = ref({
  group_name: [{ required: true, message: '请输入组名称', trigger: 'blur' }],
  path: [
      { required: true, message: '请输入组路径', trigger: 'blur' }
  ],
  describe: [
      { required: true, message: '请选择组描述', trigger: 'blur' }
  ],
})

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([
  {group_name:"封闭园区API组", path:"xxxxx/xxxxx/xxxx", describe:"sdjflsjlfanfnf", api_name:21, user_name:"admin", last_update_time:"2022-1-1 20:19:08"},
  {group_name:"封闭园区API组", path:"xxxxx/xxxxx/xxxx", describe:"sdjflsjlfanfnf", api_name:21, user_name:"admin", last_update_time:"2022-1-1 20:19:08"}
])
const searchInfo = ref({})

const onReset = () => {
  searchInfo.value = {}
}
// 搜索

const onSubmit = () => {
  page.value = 1
  pageSize.value = 10
  getTableData()
}

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 排序
const sortChange = ({ prop, order }) => {
  if (prop) {
      if (prop === 'ID') {
          prop = 'id'
      }
      searchInfo.value.orderKey = prop
      searchInfo.value.desc = order === 'descending'
  }
  getTableData()
}

// 查询
const getTableData = async () => {
  // const table = await getApiList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  // if (table.code === 0) {
  //   tableData.value = table.data.list
  //   total.value = table.data.total
  //   page.value = table.data.page
  //   pageSize.value = table.data.pageSize
  // }
}

getTableData()

// 批量操作
const handleSelectionChange = (val) => {
  apis.value = val
}

const deleteVisible = ref(false)
const onDelete = async () => {
  const ids = apis.value.map(item => item.ID)
  // const res = await deleteApisByIds({ ids })
  // if (res.code === 0) {
  //   ElMessage({
  //     type: 'success',
  //     message: res.msg
  //   })
  //   if (tableData.value.length === ids.length && page.value > 1) {
  //     page.value--
  //   }
  //   deleteVisible.value = false
  //   getTableData()
  // }
}

// 弹窗相关
const apiForm = ref(null)
const initForm = () => {
  apiForm.value.resetFields()
  form.value = {
      path: '',
      apiGroup: '',
      method: '',
      description: ''
  }
}

const dialogTitle = ref('新增Api组')
const dialogFormVisible = ref(false)
const openDialog = (key) => {
  switch (key) {
      case 'addApi':
          dialogTitle.value = '新增Api组'
          break
      case 'edit':
          dialogTitle.value = '编辑Api组'
          break
      default:
          break
  }
  type.value = key
  dialogFormVisible.value = true
}
const closeDialog = () => {
  initForm()
  dialogFormVisible.value = false
}

const editApiFunc = async (row) => {
  // const res = await getApiById({ id: row.ID })
  // form.value = res.data.api
  // openDialog('edit')
  form.value = Object.assign({},row);
  openDialog('edit')
}

const enterDialog = async () => {
  apiForm.value.validate(async valid => {
      if (valid) {
          switch (type.value) {
              case 'addApi':
                  {
                      // const res = await createApi(form.value)
                      // if (res.code === 0) {
                      //   ElMessage({
                      //     type: 'success',
                      //     message: '添加成功',
                      //     showClose: true
                      //   })
                      // }
                      // getTableData()
                      // closeDialog()
                  }

                  break
              case 'edit':
                  {
                      // const res = await updateApi(form.value)
                      // if (res.code === 0) {
                      //   ElMessage({
                      //     type: 'success',
                      //     message: '编辑成功',
                      //     showClose: true
                      //   })
                      // }
                      // getTableData()
                      // closeDialog()
                  }
                  break
              default:
                  // eslint-disable-next-line no-lone-blocks
                  {
                      ElMessage({
                          type: 'error',
                          message: '未知操作',
                          showClose: true
                      })
                  }
                  break
          }
      }
  })
}

const deleteApiFunc = async (row) => {
  ElMessageBox.confirm('此操作将永久删除所有角色下该api, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
  })
      .then(async () => {
          // const res = await deleteApi(row)
          // if (res.code === 0) {
          //   ElMessage({
          //     type: 'success',
          //     message: '删除成功!'
          //   })
          //   if (tableData.value.length === 1 && page.value > 1) {
          //     page.value--
          //   }
          //   getTableData()
          // }
      })
}

</script>

<style lang="scss" scoped>
.header-title {
    font-weight: bolder;
    color: #3a3b3f;
    position: relative;
    // margin-right: auto;
    // margin-top: 5px;
    margin-left:10px;
    padding:0 0 25px 0;
    font-size: 16px;

    &::before {
      content: "";
      display: block;
      height: 20px;
      border-right: 3px solid #3581fb;
      position: absolute;
      left: -10px;
    }
  }
</style>





















<template>
  <el-card>
      <div class="gva-search-box">
          <div class="header-title">应用管理</div>
          <el-form ref="searchForm" :inline="true" :model="searchInfo">
              <el-form-item >
                  <el-input v-model="searchInfo.name" placeholder="请输入组名称/创建者/描述" />
              </el-form-item>
              
              <el-form-item>
                  <el-button size="small" type="primary" icon="search" @click="onSubmit">查询</el-button>
                  <el-button size="small" icon="refresh" @click="onReset">重置</el-button>
              </el-form-item>
          </el-form>
      </div>
      <div class="gva-table-box">
          <div class="gva-btn-list">
              <el-button size="small" type="primary" icon="plus" @click="openDialog('addApi')">新增</el-button>
              <el-popover v-model="deleteVisible" placement="top" width="160">
                  <p>确定要删除吗？</p>
                  <div style="text-align: right; margin-top: 8px;">
                      <el-button size="small" type="primary" link @click="deleteVisible = false">取消</el-button>
                      <el-button size="small" type="primary" @click="onDelete">确定</el-button>
                  </div>
                  <template #reference>
                      <el-button icon="delete" size="small" :disabled="!apis.length" style="margin-left: 10px;"
                          @click="deleteVisible = true">删除</el-button>
                  </template>
              </el-popover>
          </div>
          <el-table :data="tableData" @sort-change="sortChange" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" />
              <el-table-column align="left" label="应用名称" min-width="150" prop="app_name" sortable="custom" />
              <el-table-column align="left" label="路径" min-width="150" prop="path" sortable="custom" />
              <el-table-column align="left" label="应用描述" min-width="150" prop="describe" sortable="custom" />
              <el-table-column align="left" label="API数量" min-width="90" prop="api_name" sortable="custom" />
              <el-table-column align="left" label="创建人" min-width="120" prop="user_name" sortable="custom" />
              <el-table-column align="left" label="更新时间" min-width="150" prop="last_update_time" sortable="custom" />
              <el-table-column align="center" fixed="right" label="操作" width="180">
                  <template #default="scope">
                      <el-button icon="edit" size="small" type="primary" link @click="editApiFunc(scope.row)">修改
                      </el-button>
                      <el-button icon="delete" size="small" type="primary" link @click="deleteApiFunc(scope.row)">删除
                      </el-button>
                  </template>
              </el-table-column>
          </el-table>
          <div class="gva-pagination">
              <el-pagination :current-page="page" :page-size="pageSize" :page-sizes="[10, 30, 50, 100]" :total="total"
                  layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
                  @size-change="handleSizeChange" />
          </div>

      </div>

      <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" :title="dialogTitle">
          <el-form ref="apiForm" :model="form" :rules="rules" label-width="80px">
              <el-form-item label="应用名称" prop="app_name">
                  <el-input v-model="form.app_name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="路径" prop="path">
                  <el-input v-model="form.path" autocomplete="off" />
              </el-form-item>
              <el-form-item label="应用描述" prop="describe">
                <el-input v-model="form.describe" type="textarea" placeholder="请输入应用描述"></el-input>
                  
              </el-form-item>
          </el-form>
          <template #footer>
              <div class="dialog-footer">
                  <el-button size="small" @click="closeDialog">取 消</el-button>
                  <el-button size="small" type="primary" @click="enterDialog">确 定</el-button>
              </div>
          </template>
      </el-dialog>
  </el-card>
</template>

<script setup>
// import {
//   getApiById,
//   getApiList,
//   createApi,
//   updateApi,
//   deleteApi,
//   deleteApisByIds
// } from '@/api/api'
// import { toSQLLine } from '/@/utils/stringFun'
import { ref } from 'vue'

const methodFilter = (value) => {
  const target = methodOptions.value.filter(item => item.value === value)[0]
  return target && `${target.label}`
}

const apis = ref([])
const form = ref({
  path: '',
  apiGroup: '',
  method: '',
  description: ''
})
const methodOptions = ref([
  {
      value: 'POST',
      label: '创建',
      type: 'success'
  },
  {
      value: 'GET',
      label: '查看',
      type: ''
  },
  {
      value: 'PUT',
      label: '更新',
      type: 'warning'
  },
  {
      value: 'DELETE',
      label: '删除',
      type: 'danger'
  }
])

const type = ref('')
const rules = ref({
  app_name: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
  path: [
      { required: true, message: '请输入应用路径', trigger: 'blur' }
  ],
  describe: [
      { required: true, message: '请选择应用描述', trigger: 'blur' }
  ],
})

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([
  {app_name:"封闭园区API组", path:"xxxxx/xxxxx/xxxx", describe:"sdjflsjlfanfnf", api_name:21, user_name:"admin", last_update_time:"2022-1-1 20:19:08"},
  {app_name:"封闭园区API组", path:"xxxxx/xxxxx/xxxx", describe:"sdjflsjlfanfnf", api_name:21, user_name:"admin", last_update_time:"2022-1-1 20:19:08"}
])
const searchInfo = ref({})

const onReset = () => {
  searchInfo.value = {}
}
// 搜索

const onSubmit = () => {
  page.value = 1
  pageSize.value = 10
  getTableData()
}

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 排序
const sortChange = ({ prop, order }) => {
  if (prop) {
      if (prop === 'ID') {
          prop = 'id'
      }
      searchInfo.value.orderKey = prop
      searchInfo.value.desc = order === 'descending'
  }
  getTableData()
}

// 查询
const getTableData = async () => {
  // const table = await getApiList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  // if (table.code === 0) {
  //   tableData.value = table.data.list
  //   total.value = table.data.total
  //   page.value = table.data.page
  //   pageSize.value = table.data.pageSize
  // }
}

getTableData()

// 批量操作
const handleSelectionChange = (val) => {
  apis.value = val
}

const deleteVisible = ref(false)
const onDelete = async () => {
  const ids = apis.value.map(item => item.ID)
  // const res = await deleteApisByIds({ ids })
  // if (res.code === 0) {
  //   ElMessage({
  //     type: 'success',
  //     message: res.msg
  //   })
  //   if (tableData.value.length === ids.length && page.value > 1) {
  //     page.value--
  //   }
  //   deleteVisible.value = false
  //   getTableData()
  // }
}

// 弹窗相关
const apiForm = ref(null)
const initForm = () => {
  apiForm.value.resetFields()
  form.value = {
      path: '',
      apiGroup: '',
      method: '',
      description: ''
  }
}

const dialogTitle = ref('新增Api组')
const dialogFormVisible = ref(false)
const openDialog = (key) => {
  switch (key) {
      case 'addApi':
          dialogTitle.value = '新增Api组'
          break
      case 'edit':
          dialogTitle.value = '编辑Api组'
          break
      default:
          break
  }
  type.value = key
  dialogFormVisible.value = true
}
const closeDialog = () => {
  initForm()
  dialogFormVisible.value = false
}

const editApiFunc = async (row) => {
  // const res = await getApiById({ id: row.ID })
  // form.value = res.data.api
  // openDialog('edit')
  form.value = Object.assign({},row);
  openDialog('edit')
}

const enterDialog = async () => {
  apiForm.value.validate(async valid => {
      if (valid) {
          switch (type.value) {
              case 'addApi':
                  {
                      // const res = await createApi(form.value)
                      // if (res.code === 0) {
                      //   ElMessage({
                      //     type: 'success',
                      //     message: '添加成功',
                      //     showClose: true
                      //   })
                      // }
                      // getTableData()
                      // closeDialog()
                  }

                  break
              case 'edit':
                  {
                      // const res = await updateApi(form.value)
                      // if (res.code === 0) {
                      //   ElMessage({
                      //     type: 'success',
                      //     message: '编辑成功',
                      //     showClose: true
                      //   })
                      // }
                      // getTableData()
                      // closeDialog()
                  }
                  break
              default:
                  // eslint-disable-next-line no-lone-blocks
                  {
                      ElMessage({
                          type: 'error',
                          message: '未知操作',
                          showClose: true
                      })
                  }
                  break
          }
      }
  })
}

const deleteApiFunc = async (row) => {
  ElMessageBox.confirm('此操作将永久删除所有角色下该api, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
  })
      .then(async () => {
          // const res = await deleteApi(row)
          // if (res.code === 0) {
          //   ElMessage({
          //     type: 'success',
          //     message: '删除成功!'
          //   })
          //   if (tableData.value.length === 1 && page.value > 1) {
          //     page.value--
          //   }
          //   getTableData()
          // }
      })
}

</script>

<style lang="scss" scoped>
.header-title {
    font-weight: bolder;
    color: #3a3b3f;
    position: relative;
    // margin-right: auto;
    // margin-top: 5px;
    margin-left:10px;
    padding:0 0 25px 0;
    font-size: 16px;

    &::before {
      content: "";
      display: block;
      height: 20px;
      border-right: 3px solid #3581fb;
      position: absolute;
      left: -10px;
    }
  }
</style>