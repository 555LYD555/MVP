// 视觉差滚动页面
<template>
  <div style="height:100%;width:100%;">
      <parallax>
        <img src="https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg">
      </parallax>
      <div class="mvp-img img1"
           id="bgTest"
           :style="{'background-position-y':positionY1+'px'}">

        <span>&emsp;&emsp;{{text1}}</span>
      </div>
      <!-- <div class="mvp-text">&emsp;&emsp;{{text1}}</div> -->
      <div class="mvp-img img2"
           id="bgTest">
        <span>&emsp;&emsp;{{text1}}</span>
      </div>
      <!-- <div class="mvp-text">&emsp;&emsp;{{text1}}</div> -->
      <div class="mvp-img img3">
        <span>&emsp;&emsp;{{text1}}</span>
      </div>
      <!-- <div class="mvp-text">&emsp;&emsp;{{text1}}</div> -->
      <div class="mvp-img img4">
        <span>&emsp;&emsp;{{text1}}</span>
      </div>
      <!-- <div class="mvp-text">&emsp;&emsp;{{text1}}</div> -->
      <div class="mvp-img img5">
        <span>&emsp;&emsp;{{text1}}</span>
      </div>
  </div>
    
</template>
<script>
import Parallax from 'vue-parallaxy'
export default ({
  name: 'parallaxScrolling',
  props: {},
  components: {
    Parallax
  },
  data () {
    return {
      text1: "实现“五个一+N”的智慧平台，即通过“一张物联网、一个大数据中心、一张图、一个风险防控及应急平台、N个专项应用”，结合物联网、大数据、地理信息、应急指挥调度等技术，为安全风险管控、事故预防、应急事件应对提供强有力支撑，为城市安全保驾护航。",
      text2: "实现“五个一+N”的智慧平台，即通过“一张物联网、一个大数据中心、一张图、一个风险防控及应急平台、N个专项应用”，结合物联网、大数据、地理信息、应急指挥调度等技术，为安全风险管控、事故预防、应急事件应对提供强有力支撑，为城市安全保驾护航。",
      imageWrappers: [],

      positionY1: 0, //背景Y轴偏移量
      Y1: 0,
      ratio: 0.5 //视差偏移率

    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {
    // debugger
    window.addEventListener("scroll", this.handleScroll); //创建滚动监听，页面滚动回调handleScroll方法
    let bgTest = document.getElementById("bgTest");
    this.Y1 = bgTest.offsetTop * this.ratio



  },
  methods: {
    // js实现监听滚动，背景图片滚动速度调整
    parallaxScrolling () {
      window.addEventListener("scroll", this.handleScroll); //创建滚动监听，页面滚动回调handleScroll方法
      let bgTest = document.getElementById("bgTest");
      this.Y1 = bgTest.offsetTop * this.ratio
    },

    handleScroll () {
      debugger
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.positionY1 = this.Y1 - scrollTop * this.ratio; //原始高度-滚动距离*视差系数

    }

  }

})
</script>
<style lang="scss" scoped>
.mvp-img {
  // background:url();
  width: 100%;
  height: 800px;
  background-attachment: fixed;
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;

  display: flex;
  justify-content: end;
  align-items: center;

  font-size: 22px;
  letter-spacing: 2px;
  // :nth-child(1){
  //     background:url('https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg');
  // }
  // :nth-child(2){
  //     background:url("https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg");
  // }
  // :nth-child(3){
  //     background:url("https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg");
  // }
  > span {
    width: 20%;

    justify-self: end;
    color: white;
  }
}
.img1 {
  background: url("https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg")
    no-repeat center fixed;

  background-size: 100% 100%;
}
.img2 {
  background: url("https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg")
    no-repeat center fixed;

  background-size: 100% 100%;
}
.img3 {
  background: url("https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg")
    no-repeat center fixed;

  background-size: 100% 100%;
}
.img4 {
  background: url("https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg")
    no-repeat center fixed;

  background-size: 100% 100%;
}
.img5 {
  background: url("https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg")
    no-repeat center fixed;

  background-size: 100% 100%;
}
.mvp-text {
  width: 100%;
  height: 50vh;

  font-size: 24px;
  font-weight: 600;
  text-align: center;
}
</style>
