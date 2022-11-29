<template>
  <div style="height:100%;width:100%;" :class="currentTheme">
    <el-header :style="{background: themeColor}">
      <div style="font-size: 18px;font-weight: 600;margin-right: auto;">
        <i class="el-icon-sunrise-1"
           style="margin-right:15px;font-size:32px;text-shadow:10px 10px 4px #ad792a"></i>
        <span style="font-family:'MVP2Font;font-size:24px;'">MVP</span>

      </div>
      <ThemeSwitch :themeColorMVP.sync="themeColor"></ThemeSwitch>
      <span style="margin-left:15px;">admin</span>
      <el-dropdown>
        <i class="el-icon-setting"
           style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="drawerVisible = true">个人中心</el-dropdown-item>
          <el-dropdown-item>菜单排列模式切换<i class="el-icon-refresh"></i></el-dropdown-item>
          <el-dropdown-item>更换主题</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
          <el-dropdown-item @click.native="handleClick">{{headerText}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container style="height: calc(100% - 60px); border: 1px solid #eee"
                  v-if="!isWelcomePageVisible">

      <!-- <el-aside  :width="isCollapse?'60px':'200px'"> -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <el-menu router
                 unique-opened
                 :collapse="isCollapse">
            <template v-for="(menuItem,index) in menuList">
              <el-menu-item :key="index" v-if="!menuItem.children" :index="menuItem.path" @click="clickMenu(menuItem)">
                <i v-if="menuItem.meta.icon" :class="menuItem.meta.icon"></i>
                {{menuItem.meta.title}}
              </el-menu-item>
              <el-submenu :key="index" v-else :index="menuItem.children[0].path">
                <template slot="title"><i v-if="menuItem.meta.icon" :class="menuItem.meta.icon"></i><span slot="title">{{menuItem.meta.title}}</span></template>
                <el-menu-item v-for="(menuItem2,index2) in menuItem.children" :key="index2" :index="menuItem2.path" @click="clickMenu(menuItem2)">
                  {{menuItem2.meta.title}}
                </el-menu-item>
              </el-submenu>
            </template>
        </el-menu>

        <!-- <el-menu router
                 unique-opened
                 :collapse="isCollapse">
          <el-menu-item index="/6"><i class="el-icon-s-home"></i><span slot="title">首页</span></el-menu-item>
          <el-submenu index="0">
            <template slot="title"><i class="el-icon-map-location"></i><span slot="title">地图</span></template>
      
              <el-menu-item index="/3">高德地图</el-menu-item>
              <el-menu-item index="/4">天地图</el-menu-item>
              <el-menu-item index="/220930">流程图插件</el-menu-item>
              <el-menu-item index="/221020">ECharts</el-menu-item>
   
          </el-submenu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i><span slot="title">特殊效果</span></template>

            <el-menu-item index="/5">边框特效</el-menu-item>
            <el-menu-item index="/7">登录页面</el-menu-item>
            <el-menu-item index="/8">视差滚动</el-menu-item>
            <el-menu-item index="/9">免费API</el-menu-item>
            <el-menu-item index="/10">视差滚动(QQ)</el-menu-item>
            <el-menu-item index="/11">CSS动画</el-menu-item>

            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              <el-menu-item index="1-4-2">选项4-2</el-menu-item>
              <el-menu-item index="1-4-3">选项4-3</el-menu-item>
              <el-menu-item index="1-4-4">选项4-4</el-menu-item>
            </el-submenu>
            <el-submenu index="1-5">
              <template slot="title">选项5</template>
              <el-menu-item index="1-5-1">选项5-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i><span slot="title">导航待定</span></template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>

        </el-menu> -->
      </el-aside>
      <div :style="{'width':isCollapse?'calc(100% - 64px)':'calc(100% - 200px)'}">
        <BreadCrumb :isCollapse.sync="isCollapse"></BreadCrumb>
        <CommonTab></CommonTab>
        <el-main>
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </el-main>
      </div>
      <!-- 抽屉：个人中心 -->
      <el-drawer 
                 :visible.sync="drawerVisible"
                 direction="rtl"
                 size="30%">
        <el-tabs v-model="activeName"
                 @tab-click="handleClickCenter">
          <el-tab-pane label="主题管理"
                       name="first">
            <ThemeCards :currentTheme.sync="currentTheme"></ThemeCards>
          </el-tab-pane>
          <el-tab-pane label="配置管理"
                       name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理"
                       name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿"
                       name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-drawer>
    </el-container>

    <el-container style="height: calc(100% - 60px); border: 1px solid #eee;z-index:999;box-sizing:border-box;background:url(https://img95.699pic.com/photo/50046/0542.jpg_wh300.jpg);"
                  v-if="isWelcomePageVisible">
      <parallax-scrolling></parallax-scrolling>
    </el-container>
  </div>
</template>
<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import CommonTab from '@/components/CommonTab.vue'
import ParallaxScrolling from '@/view/special/parallaxScrolling.vue';
import ThemeSwitch from '@/components/Theme.vue';
import ThemeCards from '@/view/otherView/myCenter/themeCard.vue';
// import menuList from '@/assets/static/menuList.js'
import { mapState,mapMutations} from 'vuex'
export default {
  components: { BreadCrumb,CommonTab, ParallaxScrolling, ThemeSwitch ,ThemeCards},
  name: 'Home',
  data () {
    return {
      // 是否展开折叠
      isCollapse: false,
      themeColor: '#B3C0D1',
      isWelcomePageVisible: false,
      headerText: '返回首页',
      colorArray: ["#9d9797", "#9fbdc3", "#c3b79f", "#ad99c9", "#99c9a9", "#c99999"],
      //抽屉是否可见
      drawerVisible: false,
      // 当前系统使用主题
      // currentTheme:'MVP-theme0',
      currentTheme:'',
      activeName:'first',
    }
  },
  computed:{
    ...mapState({
      menuList:state=>state.menu.menuList
    })
  },

  methods: {
    handleClick () {
      this.isWelcomePageVisible = !this.isWelcomePageVisible;
      if (this.isWelcomePageVisible) {
        this.headerText = "进入系统";
      } else {
        this.headerText = "返回首页";
      }

    },

    //点击个人中心
    handleClickCenter (tab, event) {
      console.log(tab, event);
    },
    // goTOLink(index){
    //   debugger
    //   if(index === 3){
    //     this.$router.push('/3');

    //   }else if(index === 4){
    //      this.$router.push('/4');
    //   }else if(index === 5){
    //      this.$router.push('/5');
    //   }

    // },
    // goToUrl(url){
    //   debugger
    //   this.$router.push(url);
    // },
    //获取子系统/快捷入口相关信息
    listSys () {
      let _this = this;
      _this.$Get(_this.khConfig.api.xxx).then(res => {
        if (res.errCode === 0) {
          _this.sysData = res.data;
        }
      })

    },

    //跳转路由 根据名称跳转
    clickMenu(item) {
      this.$store.commit('breadCrumb/selectMenu', item)
      this.$router.push({ path: item.path })
    }

  },
  watch: {
    themeColor (val, oldVal) {
      console.log("change")
    },
    currentTheme(val,oldVal){
      console.log(val)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @import "@/assets/style/elementui-global.scss";
// @import "@/assets/style/mvp-theme.scss";
.el-header {
  // background-color: #B3C0D1;
  display: flex;
  font-size: 12px;
  color: #333;
  line-height: 60px;
}

/deep/ .el-menu {
  border-right: 0px;
}
/deep/ .el-aside {
  color: #333;
  // min-width:210px;
  border-right: solid 1px #e6e6e6;
  // background-color: white;

}
.el-main {
  width:100%;
  height:calc(100% - 90px);
  padding:10px 15px;
}

.navCardItem {
  width: 25%;
  height: 20%;
  margin: 10px;
  // background:gray;
  color: white;
  backdrop-filter: blur(50px);
  // border-radius: 20px;
  // box-shadow: 5px 5px 10px gray;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 2px 8px 4px -6px hsla(0, 0%, 0%, 0.3);
  }
}

// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }
// 给侧边栏和文字的消失改变添加过渡时长，否则会导致伸缩卡顿
.el-aside {
  transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -moz-transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -o-transition: width 0.25s;
}
/*加快侧边栏文字消失的速度 否则会有伸缩停顿的bug*/
.el-menu {
  transition: all 10ms;
}

/deep/ .home {
  height: 100% !important;
  width: 100%;

}

/deep/ .mainText {
  font-family: "MVP2Font";
  font-size: 68px;
  display: block;
  margin-top: 30vh;
  text-align: center;
  color: blue;
  text-shadow: 5px 5px 5px gray;
  cursor: pointer;
  animation: myMove 3s 2, myMove2 5s infinite, myMove3 5s 1;
  animation-delay: -1s, -1s, -1s;
  -webkit-animation: myMove 3s 2, myMove2 5s infinite, myMove3 5s 1;
  -webkit-animation-delay: -1s, -1s, -1s;
}
@keyframes myMove {
  30% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes myMove2 {
  50% {
    text-shadow: 15px 15px 10px white;
  }
  100% {
    text-shadow: 15px 15px 10px gray;
  }
}
@keyframes myMove3 {
  40% {
    rotate: -90deg;
  }
  60% {
    rotate: 0deg;
  }
  70% {
    rotate: 45deg;
  }
  80% {
    rotate: 0deg;
  }
  85% {
    rotate: -20deg;
  }
  90% {
    rotate: 0deg;
  }
  95% {
    rotate: 10deg;
  }
  100% {
    rotate: 0deg;
  }
}

// /deep/ .el-drawer{
//   padding:15px;
// }
// /deep/ .el-aside{
//   background: black;
// }
/deep/ .el-drawer__header{
  padding:0;
  margin-bottom: 0;
}



</style>
