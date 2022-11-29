//面包屑导航
<template>
  <div class="mvp-breadcrumb">
    <!-- <el-radio-group v-model="isCollapse">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <i class="el-icon-s-fold menu-isCollapse" @click="isCollapse=!isCollapse" v-if="isCollapse" ></i>
    <i class="el-icon-s-unfold menu-isCollapse" @click="isCollapse=!isCollapse" v-if="!isCollapse" ></i>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in list" :key="item.path" :to="{path: item.path}">
        {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin:0 40px 0 auto;">
      <mvpTime></mvpTime>
    </div>
      
  </div>
</template>
<script>
import mvpTime from '@/components/public/time.vue';
export default ({
  name: 'BreadCrumb',
  components:{
    mvpTime,
  },
  props: {
    isCollapse:{
      type:Boolean,
    }
  },
  data () {
    return {

    }
  },
  computed: {
    list(){
      // debugger
      // this.$route.matched
      return this.$route.matched;
    }
  },
  watch: {
    isCollapse(newVal,oldVal){
      this.$emit('update:isCollapse',newVal);
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }

})
</script>
<style lang="scss" scoped>
.mvp-breadcrumb{
  // width:100%;
  height:40px;
  display: flex;
  align-items: center;
  font-size: 12px;
  border-bottom: 1px #e6e6e6 solid;
  padding-left: 15px;
}
/deep/ .el-breadcrumb{
  margin-left:15px;
}
.menu-isCollapse{
  font-size:32px;
}
</style>
