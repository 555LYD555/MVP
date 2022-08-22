<template>
  <div style="display:block;justify-content:center;height:100%;width:100%;background:#f2edf3;">
    <div style="display:flex;font-size:22px;padding:5vh 0 15px 0;font-weight:600;width:100%;">
      <div style="width:26px;height:26px;margin:0 1% 0 calc(11% + 40px);background:linear-gradient(#bae6e0,#1b87fa)"></div>
      <span>欢迎来到支撑平台</span>
    </div>
    <!-- 卡片轮播区域 -->
    <div>
      <el-carousel trigger="click"
                   height="84vh"
                   :autoplay="false"
                   :loop="false"
                   @change="handleChange"
                   ref="sysMenu"
                   :indicator-position="isShowIndicator"
                   >
        <el-carousel-item v-for="(item,index) in dealSysData"
                          :key="index"
                          style="display:flex;justify-content:center;height:100%;width:100%;">
          <div class="navCardList">
            <template v-for="(item2,index2) in item">
              <el-card class="navCardItem"
                       v-if="index2%4==0"
                       style="background:linear-gradient(90deg,#ffb996,#fe8196)"
                       @click.native="goToUrl(item2.sysUrl)"
                       :key="index2">
                <i class="el-icon-s-help"></i>
                <span style="margin-left:10px;">{{item2.sysName}}</span>
                <span class="sysDescText">&emsp;&emsp;{{item2.sysDesc}}</span>
              </el-card>
              <el-card class="navCardItem"
                       v-if="index2%4==1"
                       style="background:linear-gradient(90deg,#88c6f7, #228ee5)"
                       @click.native="goToUrl(item2.sysUrl)"
                       :key="index2">
                <i class="el-icon-s-help"></i>
                <span style="margin-left:10px;">{{item2.sysName}}</span>
                <span class="sysDescText">&emsp;&emsp;{{item2.sysDesc}}</span>
              </el-card>
              <el-card class="navCardItem"
                       v-if="index2%4==2"
                       style="background:linear-gradient(90deg,#7bd8d0, #23d0b6)"
                       @click.native="goToUrl(item2.sysUrl)"
                       :key="index2">
                <i class="el-icon-s-help"></i>
                <span style="margin-left:10px;">{{item2.sysName}}</span>
                <span class="sysDescText">&emsp;&emsp;{{item2.sysDesc}}</span>
              </el-card>
              <el-card class="navCardItem"
                       v-if="index2%4==3"
                       style="background:linear-gradient(90deg,#7bd8a8, #23d06e)"
                       @click.native="goToUrl(item2.sysUrl)"
                       :key="index2">
                <i class="el-icon-s-help"></i>
                <span style="margin-left:10px;">{{item2.sysName}}</span>
                <span class="sysDescText">&emsp;&emsp;{{item2.sysDesc}}</span>
              </el-card>

              <!-- <el-card class="navCardItem"  v-if="(index%3==0)?(isThemeOne=true):((index%3==1)?(isThemeOne=false,isThemeTwo=true):(isThemeOne=false,isThemeTwo=false,isThemeThree=true))" :class="(isThemeOne)?(themeOne):(isThemeTwo?themeTwo:themeThree)" @click.native="goToUrl(item.sysUrl)" :key="index">
                    <i class="el-icon-s-help"></i>
                    <span style="margin-left:10px;">{{item.sysName}}</span>
                </el-card> -->
            </template>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

  </div>
</template>
<script>
export default ({
  name: 'Home',
  data () {
    return {
      // isThemeOne:false,
      // isThemeTwo:false,
      // isThemeThree:false,
      // themeOne:'themeOne',
      // themeTwo:'themeTwo',
      // themeThree:'themeThree',
      // 所有的子系统数据
      sysData: [],
      //当前幻灯片索引下标
      activeIndex: 0,
      //经过处理的子系统数据
      dealSysData: [],

      // 是否显示轮播图的指示器
      isShowIndicator:"none",
    }
  },
  mounted () {
    this.listSys();
  },
  methods: {
    goToUrl (url) {
      //同页面跳转
      window.location.href = url;
      //新建页面跳转
      // window.open(url);
    },
    //获取子系统/快捷入口相关信息
    listSys () {
      let _this = this;
      _this.$Get(_this.khConfig.api.listSys).then(res => {
        if (res.errCode === 0) {
           _this.sysData=res.list;
          _this.sysData = res.list.concat(res.list);
          _this.sysData = _this.sysData.concat(res.list);
          _this.sysData = _this.sysData.concat(res.list);
          //处理子系统数据:将子系统列表每12分为一个数组，构建成的数组集合重新组成数据对象dealSysData
          for (var i = 0, len = _this.sysData.length; i < len; i += 12) {
            _this.dealSysData.push(_this.sysData.slice(i, i + 12));
          }
          //如果导航幻灯片数量不止一张，则显示幻灯片指示器(初始为none不显示，置为空则显示)
          if(Math.ceil(_this.sysData.length/12)>1){
            this.isShowIndicator="";
          }
        }
      })
    },
    // 幻灯片切换触发
    handleChange () {
      let _this = this;
      _this.activeIndex = _this.$refs.sysMenu.activeIndex;
    }
  },
})
</script>
<style lang="scss" scoped>
.navCardList {
  height: fit-content;
  width: 80%;
  box-sizing: border-box;
  padding: 30px 40px;
  display: flex;
  flex-flow: wrap;
  background: #f2edf3;
}
.navCardItem {
  width: 23%;
  height: 150px;
  margin: 1%;

  font-size: 22px;
  font-weight: 600;
  color: white;
  display: flex;
  cursor: pointer;

  // &:hover{
  //      box-shadow:2px 8px 4px -6px hsla(0,0%,0%,.3);
  //   }
}
// .themeOne{
//   background:linear-gradient(90deg,#ffb996,#fe8196);
// }
// .themeTwo{
//   background:linear-gradient(90deg,#88c6f7, #228ee5);
// }
// .themeThree{
//   background:linear-gradient(90deg,#7bd8d0, #23d0b6);
// }
.sysDescText {
  margin-top: 10px;
  font-size: 13px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
::v-deep .el-carousel__arrow {
  font-size: 32px;
  height: 52px;
  width: 52px;
  top: 35%; 
}
::v-deep .el-carousel__button {
  background: #aaa5a5;
  width: 50px;
  height: 6px;
  border-radius: 10px;
}
::v-deep .el-carousel__indicators--horizontal{
  bottom:12%;
}
</style>