<template>
  <div class="container">
      <el-row class="rowClass">
          <el-select v-model="formLang">
            <el-option v-for="(item,index) in langOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <i class="el-icon-d-arrow-right" style="margin:0 20px;"></i>
          <el-select v-model="toLang">
            <el-option v-for="(item,index) in langOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button @click="clearFromText()" type="warning" style="margin-left:auto;" >清空</el-button>
          <el-button @click="translateBegin()" type="primary" style="margin-left:10px;" >翻译</el-button>
      </el-row>
      <el-row class="rowClass">
          <el-input v-model="fromText" type="textarea" placeholder="请输入文字、文档、网址 即可翻译" :autosize="{minRows:8,maxRows:10}" clearable>
          </el-input>
          <el-input v-model="toText" type="textarea" placeholder="" :autosize="{minRows:8,maxRows:10}" class="translatedText">
          </el-input>
      </el-row>
      <el-row>
          <el-col :span="12" style="background:#f1f1f1;padding:20px;height:200px;border-radius:5px;color:gray;">
            <el-row  style="display:flex;align-items:center;margin:0 0 15px 0;">
              <i class="el-icon-time" :style="{'fontSize':'18px'}"></i>
              <span style="margin:0 auto 0 5px;">历史记录</span>
              <span style="cursor:pointer;" @click="clearHistory()">清空</span>&emsp;|&emsp;<span style="cursor:pointer;" @click="switchClosable">编辑</span>
            </el-row>
            <el-row style="display:flex;flex-flow:wrap;height:130px;overflow:auto;">
              <template v-for="(item,index) in historyData">
                <!-- <el-button :key="index" class="historyButton">{{item}}</el-button> -->
                <el-tag :key="index" :closable="isClosable" @click="handleClick(index)" @close="handleClose(index)" type="info" effect="plain" class="historyTag">{{item}}</el-tag>
              </template>
            </el-row>
          </el-col>
      </el-row>
  </div>
</template>
<script>
import axios from "axios";
export default ({
  name: 'tranlateLanguage',
  props: {},
  data () {
    return {
      // 语言下拉选项
      langOptions:[
        {label:"中文(简体)",value:"zh"},
        {label:"English",value:"en"},
      ],
      // 原语言
      formLang:"",
      // 翻译语言
      toLang:"",
      // 原文本
      fromText:"",
      //翻译文本
      toText:"",
      // 历史搜索记录
      historyData:[],
      // 是否开启tag标签可编辑状态
      isClosable:false,

      //防抖定时器
      timer:'',

    }
  },
  computed: {},
  watch: {
    //fromText内容变化时，触发防抖函数，调用接口请求翻译
    fromText(val,oldVal){
      this.debounce(this.translateBegin,1200);
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 点击清空历史记录按钮
    clearHistory(){
      this.historyData=[];
    },
    //点击历史记录标签
    handleClick(index){
      this.fromText = this.historyData[index];
    },
    //关闭历史记录标签
    handleClose(index){
      this.historyData.splice(index,1);
    },
    // 点击编辑按钮
    switchClosable(){
      this.isClosable=!this.isClosable;
    },
    // 点击清空按钮
    clearFromText(){
      this.fromText = "";
    },
    //点击翻译按钮
    translateBegin(){
      if(this.fromText !== ""){
        this.historyData.push(this.fromText);
      }
      this.translateStart();
    },
    //开始翻译
    translateStart(){
      axios.get('https://api.66mz8.com/api/translation.php',{params:{info:this.fromText}})
        .then((res) => {//请求成功的回调，.then返回一个新的promise  注：res是response的缩写
        debugger
          this.toText = res.data.fanyi;
        })
        .catch((error) => {//请求失败的回调;
          console.log("请求失败数据", error);
        })
      // axios.get('https://v2.alapi.cn/api/fanyi',{params:{
      //     token:"fanyi",
      //     q:this.fromText,
      //     from:this.formLang,
      //     to:this.toLang,}})
      //   .then((res) => {//请求成功的回调，.then返回一个新的promise  注：res是response的缩写
      //     this.toText = res.data.trans_result.dst;
      //   })
      //   .catch((error) => {//请求失败的回调;
      //     console.log("请求失败数据", error);
      //   })
    },
    //防抖函数
    debounce(fn,delay){
      if(this.timer !== ''){
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(fn,delay);
    }

  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
})
</script>
<style lang="scss" scoped>
.container{
  padding: 30px 20px;
  /deep/ .el-select{
    width: 200px;
  }
  
}
.translatedText{
  /deep/ .el-textarea__inner{
    background-color: rgb(207, 205, 205);
  }
}
.historyTag{
  margin:5px 5px;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}
.rowClass{
    display:flex;
    align-items:center;
    margin:40px 0;
  }
  
</style>
