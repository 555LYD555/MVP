<template>
  <div class="navCardList" >
            <el-card class="navCardItem" v-for="(item,index) in sysData" :key="index" :style="{backgroundColor:colorArray[index%6]}"  @click.native="goToUrl(item.sysUrl)">
                <i class="el-icon-s-help"></i>
                <span style="margin-left:10px;">{{item.sysName}}</span>
            </el-card>
  </div>
</template>
<script>
export default({
  name:'Home',
  data(){
    return{
      sysData:[],
      colorArray:["#9d9797","#9fbdc3","#c3b79f","#ad99c9","#99c9a9","#c99999"],
    }

  },
  mounted(){
    this.listSys();

  },
  methods:{
    goToUrl(url){
      //同页面跳转
      // window.location.href=url;
      //新建页面跳转
      window.open(url);
    },
    //获取子系统/快捷入口相关信息
    listSys(){
      let _this=this;
      _this.$Get(_this.khConfig.api.listSys).then(res=>{
        if(res.errCode === 0){
          debugger
          _this.sysData=res.list;
        }
      })
    },
  },
})
</script>
<style lang="scss" scoped>
.navCardList{
  height: calc(100vh - 60px); 
  width:100%;
  // border: 1px solid #eee;
  box-sizing:border-box;
  padding-top:15vh;
  display:flex;
  flex-flow:wrap;
  justify-content:space-around;
  background:radial-gradient(#00368d,#3c9bfe);

}
.navCardItem{
    width:25%;
    height:20%;
    margin:10px;
    // background:gray;
    font-size:22px;
    font-weight: 600;
    color:white;
    // border-radius: 20px;
    // box-shadow: 5px 5px 10px gray;
    border: solid 7px #969696;
    box-shadow: 20px 38px 34px -26px hsla(0,0%,0%,.2) ;
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;

    display: flex;
    justify-content: center;
    align-items:center;

    &:hover{
         box-shadow:2px 8px 4px -6px hsla(0,0%,0%,.3);
      } 
  }

  >>> .el-card.is-always-shadow{
      box-shadow: 20px 38px 34px -26px hsla(0,0%,0%,.2) ;
    }
</style>