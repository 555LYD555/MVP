<template>
    <div class="container">
    <!-- 特效按钮1 -->
      <div class="box" v-if="isShow1" :style="getStyle(color)">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div class="content">
              <!-- <h2>My animated Border </h2> -->
              <p><a>{{content}}</a></p>
            </div>
        </div>
    <!-- 特效按钮2 -->
    <div class="svg-wrapper" v-if="isShow2" :style="getStyle(color)">
      <svg height="60" width="320" >
        <rect class="shape" height="60" width="320" />
        <div class="text">{{content}}</div>
      </svg>
    </div>
    <!-- 特效按钮3 -->
    <div v-if="isShow3"  >
      <div class="gradient-border" :style="getStyle(color)" id="box3">{{content}}</div>
    </div>
  
    <!-- 特效按钮4：毛玻璃 -->
    <div v-if="isShow4"  >
      <div class="glass-border" :style="getStyle(color)" id="box4">{{content}}</div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'YdButton',
  props: {
    //边框特效:box1、box2、box3三种选择
    type:{
        type:String,    //coolone:流动变形效果  cooltwo：
        default:"normal",
    },
    //边框内容文本
    content:{
      type:String,
      default:"Home",

    },

    //尺寸大小
    size:{
        type:String,
        default:"medium"
    },
    //边框颜色
    color:{
        type:String,
        default:"black"
    },
    //是否禁用
    // disabled:{
    //     type:Boolean,
    //     default:true
    // }

  },
  data () {
    return {
      isShow1:false,
      isShow2:false,
      isShow3:false,


    }
  },
  computed: {


  },
  watch: {
    type(newVal,OldVal){
      if(newVal === "box1"){
        this.isShow1=true;
        this.isShow2=false;
        this.isShow3=false;
        this.isShow4=false;
      }else if(newVal === "box2"){
        this.isShow2=true;
        this.isShow1=false;
        this.isShow3=false;
        this.isShow4=false;
      }else if(newVal === "box3"){
        this.isShow3=true;
        this.isShow1=false;
        this.isShow2=false;
        this.isShow4=false;
      }else if(newVal === "box4"){
        this.isShow4=true;
        this.isShow1=false;
        this.isShow2=false;
        this.isShow3=false;
      }

    }


  },
  created () {
    debugger
    console.log(this.type)
    console.log(this.content)
    console.log(this.isShow1)
    if(this.type === "box1"){
        this.isShow1=true;
        this.isShow2=false;
        this.isShow3=false;
        this.isShow4=false;
      }else if(this.type === "box2"){
        this.isShow2=true;
        this.isShow1=false;
        this.isShow3=false;
        this.isShow4=false;
      }else if(this.type === "box3"){
        this.isShow3=true;
        this.isShow1=false;
        this.isShow2=false;
        this.isShow4=false;
      }else if(this.type === "box4"){
        this.isShow4=true;
        this.isShow1=false;
        this.isShow2=false;
        this.isShow3=false;
      }


  },
  mounted () {

  },
  methods: {
    getStyle(color){
      return {
        color:color
      }

    }

  }

}
</script>
<style lang="scss" scoped>

// 特效按钮1:边框阴影、边框内凸出，边框流光
.container{
    width:100%;
    height:25vh;
    // background:#a8a8ab;
    display: flex;
    align-items: center;
    justify-content: center;


}
.box{
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // width: 300px;
  // height: 300px;
  width:130px;
  height:130px;
  position: relative;
  background: #111845a6;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 20px 50px black;
  border: 2px solid gray;
  color: white;
  // padding: 20px;
}

.box:before{
  content: '';
  position:absolute;
  top:0;
  left:-100%;
  width:100%;
  height:100%;
  background: rgba(255,255,255,0.1);
  transition:0.5s;
  pointer-events: none;
}

.box:hover:before{
  left:-50%;
  transform: skewX(-5deg);
}


.box .content{
  position:absolute;
  left: 50%;
  top:50%;
  transform:translate(-50%,-50%);
  width:70%;
  height:70%;
  // top:15px;
  // left:15px;
  // right:15px;
  // bottom:15px;
  border:14px solid #b36652;
  border-style: outset;
  // padding:20px;
  padding:2px;
  // text-align:center;
  box-shadow: 0 5px 10px gray;
  
}

.box span{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  
}

.box span:nth-child(1)
{
  transform:rotate(0deg);
}

.box span:nth-child(2)
{
  transform:rotate(90deg);
}

.box span:nth-child(3)
{
  transform:rotate(180deg);
}

.box span:nth-child(4)
{
  transform:rotate(270deg);
}

.box span:before
{
  content: '';
  position: absolute;
  width:100%;
  height: 2px;
  background: #50dfdb;
  animation: animate 4s linear infinite;
}

@keyframes animate {
  0% {
  transform:scaleX(0);
  transform-origin: left;
  }
  50%
  {
    transform:scaleX(1);
  transform-origin: left;
  }
  50.1%
  {
    transform:scaleX(1);
  transform-origin: right;
    
  }
  
  100%
  {
    transform:scaleX(0);
  transform-origin: right;
    
  }
  
  
} 




// 特效按钮2:SVG矢量图形
.svg-wrapper {
/*   position: relative;
  top: 50%; */
/*   transform: translateY(-50%); */
	margin: 0 auto;
  width: 320px;  
}
.shape {
  stroke-dasharray: 140 540;
  stroke-dashoffset: -474;
  stroke-width: 8px;
  fill: transparent;
  stroke: #19f6e8;
  border-bottom: 5px solid black;
  transition: stroke-width 1s, stroke-dashoffset 1s, stroke-dasharray 1s;
}
.text {
  // font-family: 'Roboto Condensed';
  font-size: 22px;
  line-height: 32px;
  letter-spacing: 8px;
  color: black;
  top: -48px;
  position: relative;
  z-index: 999;
}
.svg-wrapper:hover .shape {
  stroke-width: 2px;
  stroke-dashoffset: 0;
  stroke-dasharray: 760;
}


// 特效按钮三：边框渐变
#box3 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 200px;
  color: white;
  font-family: 'Raleway';
  font-size: 2.5rem;
}
.gradient-border {
  --borderWidth: 3px;
  background: #1D1F20;
  position: relative;
  border-radius: var(--borderWidth);
}
.gradient-border:after {
  content: '';
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
}


@keyframes animatedgradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

// 特效按钮四 ：毛玻璃
.glass-border{
  width:120px;
  height:80px;
  border: 1px solid black;
  background:rgba(128, 128, 128, 0.671);
  // filter: blur(2px);
  backdrop-filter: blur(4px);
}


</style>
