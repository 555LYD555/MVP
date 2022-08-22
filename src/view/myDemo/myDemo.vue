// 表格类型增删改查接口demo
<template>
    
    
</template>
<script>
export default {
    data() {
        return{
          //删除、保存按钮是否显示加载中
          delLoading:false,
          editLoading: false,

          // 是否可通过点击modal关闭Dialog
          closeOnClickModal:false,



          editDialogVisible:false,
            editDialogTitle:"新增对话框",
          editForm:{},
          editLoading:false,
          //true为addDialog，false为editDialog
          isAddOrEdit:false,
          // 表格数据
          tableData:[],
          // 分页查询条件
          queryParam:{
            pageSize:10,  //每页条数
            pageNum:1,  //当前页码
            namexxx:'',  //查询条件xxx
          },
          totalPage:0,



          
        }
    },
    watch: {
    },
    computed:{
        
    },
    mounted() {
        this.init()
    },
    methods: {
        // 初始化
        init() {
            let _this = this;
            _this.queryTableInfo();
        },
        //获取xx列表数据（条件查询）
        queryTableInfo(){
          this.$Get(this.khConfig.api.queryTableInfo,this.queryParam)
          .then(res=>{
            if(res.errCode === 0){
              this.tableData=res.data;
              this.totalPage=res.totalPage;
            }
          })
        },
        // 分页查询
        handleCurrentChange(val){
          this.queryParam.pageNum=val;
          this.queryTableInfo();
        },
        // 显示新增对话框
        handleAdd(){
          let _this=this;
          _this.isAddOrEdit=true;
          _this.editDialogVisible=true;
          _this. editDialogTitle="新增xxx";
          _this.eidtForm={};
        },
        // 显示编辑对话框
        handleEdit(row){
          let _this=this;
          _this.isAddOrEdit=false;
          _this.editDialogVisible=true;
          _this. editDialogTitle="编辑xxx";

          // 编辑表单解构赋值
          _this.editForm={
            id:row.id,
            xx:row.xx,
            yy:row.yy
          }
        },
        //保存新增/编辑对话框信息
        handleSubmit(){
          let _this=this;
          this.$refs.editForm.validate((valid)=>{
            if(valid){
              this.$confirm('确认保存吗？','提示',{}).then(()=>{
                let url;
                if(this.isAddOrEdit){ //新增记录，调新增接口
                  url=this.mvpConfig.api.addTableInfo;
                }else{  //修改记录，调修改接口
                  url=this.mvpConfig.api.updateTableInfo;
                }
                this.Get(url,this.convertFormArray(_this.editForm))
                .then(res=>{
                  this.editLoading=false;
                  this.editDialogVisible=false;
                  if(res.errCode === 0){
                    // 保存成功后重新获取数据，并提示保存成功
                    this.queryTableInfo();
                    this.$noticfy({
                      title:'成功',
                      message:'操作成功',
                      type:'success'
                    })
                  }
                })
              }).catch((e)=>{
                console.log(e)
              })
            }
          })
        },
        //editForm表单项数据校验，处理后成为paramArray
        convertFormArray(_form){
          let _this=this;
          let paramArray={};
          if(!_this.MVPUtils.isInvalidValue(_form.scopeName)){
              paramArray.scopeName=_form.scopeName;
          }
          if (!_this.KHUtils.isNull(_form.parentId)) {
              paramArray.parentId = _form.parentId;
          }
          // 编辑表单，paramArray需要添加参数id
          if(!_this.isAddOrEdit){
              paramArray.id=_form.id;
          }
          return paramArray;
        },


        //删除选中的多条记录
        handleDeleteMulti(){
          let _this=this;
          if(_this.multipleSelection === "" || _this.multipleSelection.length === 0){
            _this.$notify({
              title:'警告',
              message:'请选择要删除的记录',
              type:'warning'
            })
          }else{
            _this.batchDel(_this.multipleSelection)
          }
        },
        //批量删除
        batchDel(multipleSelection){
          this.$confirm('确认删除记录吗?','提示',{
            confirmButtonText:'确认',
            canceButtonText:'取消',
            type:'warning'
          }).then(()=>{
            let _this=this;
            _this.delLoading=true;
            let ids=[];
            // 提取选中数据项的id组成ids数组
            if(multipleSelection instanceof Array){
              for(let item of multipleSelection){
                ids += item.id+",";
              }
            }else{
              ids.push(multipleSelection.id);
            }
            let param={
              ids:ids
            }
            _this.$Get(_this.mvpConfig.api.deleteTableInfo,param).then(res=>{
              if(res.errCode === 0){
                _this.queryTableInfo();
                _this.$notify({
                  title:'成功',
                  message:'删除成功',
                  type:'success'
                })
              }
              _this.delLoading=false;
            }).catch(()=>{
              _this.delLoading=false;
            })
          })
        },


      // 1.为了较好的用户体验，用户在数据尚未请求获得时应该显示loading动画，给table，tree,等设置v-loading,给button设置loading时有必要的
      // 2.作用域问题，let _this=this可以视情况加
      //3. 命名规范：按钮点击事件统一命名为handleAdd(),handleDelete(),handleEdit(),handleQuery(),handleSubmit()
      //



    }
}
</script>
<style lang="scss" scoped>
  
</style>

