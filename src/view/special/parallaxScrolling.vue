<template>
    <div class="home" ref="scorllBox" @scroll="handleScroll">
        <div class="tim-content qqpc">
            <div class="title" v-bind:style="{'position':titlePositon,'background-color': titleColor,'border-bottom':titleBorder }">
                <ul>
                    <!-- <li class="logoLink">11</li> -->
                    <li class="item2">MVP</li>
                    <li class="item">首页</li>
                    <li class="item">下载</li>
                    <li class="item">动态</li>
                </ul>
                
                
            </div>
            <span class="mainText" >Start Journey of MVP......</span>
            <div class="circle"></div>
        </div>
        <!-- <div class="content-item">{{content1}}</div> -->
        <div class="activebg fisrtbg" id="pic1" v-bind:style="{'background-position-x':positionX,'background-position-y': positionY1+'px',transform:'scale('+zoom1+')'}">
          <div class="content-item">{{content1}}</div>
        </div>
        <div class="content-item">{{content2}}</div>
        <div class="activebgLeft secondbg" id="pic2" v-bind:style="{'background-position-x':positionX,'background-position-y': positionY2+'px',transform:'scale('+zoom1+')'}">
          <div class="content-item">{{content1}}</div>
        </div>
        <div class="content-item">{{content3}}</div>
        <div class="activebg thirdbg" id="pic3" v-bind:style="{'background-position-x':positionX,'background-position-y': positionY3+'px',transform:'scale('+zoom1+')'}"></div>
        <div class="content-item">{{content4}}</div>
        <div class="foot">Come&emsp;TO&emsp;MVP......</div>
    </div>
</template>

<script>
export default {
    name: "home",
    data() {
        return {
            content1:'mvp的全称为Model-View-Presenter，Model提供数据，View负责显示，Controller/Presenter负责逻辑的处理。MVP与MVC有着一个重大的区别：在MVP中View并不直接使用Model，它们之间的通信是通过Presenter (MVC中的Controller)来进行的，所有的交互都发生在Presenter内部，而在MVC中View会直接从Model中读取数据而不是通过 Controller。',
            content2:'1、模型与视图完全分离，我们可以修改视图而不影响模型',
            content3:'2、可以更高效地使用模型，因为所有的交互都发生在一个地方——Presenter内部',
            content4:'3、我们可以将一个Presenter用于多个视图，而不需要改变Presenter的逻辑。这个特性非常的有用，因为视图的变化总是比模型的变化频繁。',
            ratio: 0.06,
            positionX: "50%",
            positionY1: 30,
            positionY2: 100,
            positionY3: 150,
            // zoom1:1.1,
            // zoom2:1,
            // zoom3:1,
            Y1: 0,
            Y2: 0,
            Y3: 0,
            titlePositon: "static",
            titleColor: "transparent",
            titleBorder:"0",

        };
    },
    components: {
    },
    mounted() {
      //原先的监听方法：给整个页面添加监听；只适用于整个页面都会滚动的情况，而vue页面的局部滚动不会生效。
        // window.addEventListener("scroll", this.handleScroll);
        // debugger
        // this.box=this.$refs.scorllBox;
        // this.$refs.scorllBox.addEventListener("scroll",this.handleScroll);
        // window.onload = () => {
        //     let pic1 = document.getElementById("pic1");
        //     let pic2 = document.getElementById("pic2");
        //     let pic3 = document.getElementById("pic3");
        //     this.positionY1 = this.Y1 = pic1.offsetTop * this.ratio;
        //     this.positionY2 = this.Y2 = pic2.offsetTop * this.ratio;
        //     this.positionY3 = this.Y3 = pic3.offsetTop * this.ratio;
        // };
    },
    methods: {
        handleScroll() {
          debugger
            //原先写法，获得当前页面body的scrollTop
            // let scrollTop =
            //     window.pageYOffset ||
            //     document.documentElement.scrollTop ||
            //     document.body.scrollTop;
            //当前写法：获取当前dom元素的scrollTop
            console.log(this.$refs.scorllBox.scrollTop);
            debugger
            this.$refs.scorllBox
            let scrollTop = this.$refs.scorllBox.scrollTop;
            this.positionY1 = this.Y1 - scrollTop * this.ratio;
            this.positionY2 = this.Y2 - scrollTop * this.ratio;
            this.positionY3 = this.Y3 - scrollTop * this.ratio;
            // this.zoom1 = this.zoom1 + scrollTop *this.ratio;
            // this.zoom2 = this.zoom2 + scrollTop *this.ratio;
            // this.zoom3 = this.zoom3 + scrollTop *this.ratio;
            // 超过高度吸顶效果
            // if (scrollTop > 900) {
            //     this.titlePositon = "fixed";
            //     this.titleColor = "#fff";
            //     this.titleBorder = "1px solid #e5e5e5";
            // } else {
            //     this.titlePositon = "static";
            //     this.titleColor = "transparent";
            //     this.titleBorder = "0";
            // }
        }
    }
};
</script>

<style scoped>
.home {
    /* height: 100%; */
    height: 700px;
    overflow: auto;
}
.title {
    width: 100%;
    height: 75px;
    position: static;
    background-color: transparent;
    z-index: 10;
    top: 0px;
    left: 0px;
    font-size: 0;
}
.title ul,li{
    float: left;
    list-style: none;
}
.title .item {
    height: 75px;
    line-height: 75px;
    width: 75px;
    text-align: center;
    font-size: 20px;
}
.title .item2 {
    height: 75px;
    line-height: 75px;
    width: 175px;
    text-align: center;
    font-size: 40px;
    font-family: 'MVPFont';
}
.title .logoLink {
    width: 106px;
    height: 75px;
    overflow: hidden;
    font-size: 0;
    background: transparent
        url(//sqimg.qq.com/qq_product_operations/im/qqlogo/imlogo_b.png)
        no-repeat left 15px;
    margin-left: 300px;
}
.title .item:hover{
    background-color: #12b7f5;
}
.circle {
    position: absolute;
    width: 100%;
    height: 52px;
    margin-top: -52px;
    background: transparent url(https://sqimg.qq.com/qq_product_operations/im/2018/linearbot.png) repeat-x left top;
    text-align: center;
    z-index: 5;
    bottom: 0;
}
.content-item {
    /* background-color: #fff; */
    display: flex;

    justify-content: center;
    align-items: center;
    width: 40%;
    /* line-height: 200px; */
    /* text-align: center; */
    font-size: 30px;
    font-weight: bold;
    font-family: 'ygFont';
    
}
.tim-content {
    position: relative;
    width: 100%;
    max-width: 1900px;
    min-width: 960px;
    margin: 0 auto;
    height: 100%;
    overflow: hidden;
}
.qqpc {
    background: url(https://sqimg.qq.com/qq_product_operations/im/imbanner/20180201/pcqq_bg.jpg)
        no-repeat center center;
    background-size: cover;
}
.activebg {
    position: relative;
    width: 100%;
    /* height: 600px; */
    height: 100%;
    background: #fff;
    background-attachment: fixed;
    background-position: center 0;
    background-repeat: no-repeat;

     display: flex;
    justify-content: end;
    align-items: center;
    box-shadow: 30px 30px 60px gray;
}
.activebgLeft {
    position: relative;
    width: 100%;
    /* height: 600px; */
    height: 100%;
    background: #fff;
    background-attachment: fixed;
    background-position: center 0;
    background-repeat: no-repeat;

     display: flex;
    justify-content: start;
    align-items: center;
}
.fisrtbg {
    background-image: url(https://sqimg.qq.com/qq_product_operations/im/2015/fisrtbg.jpg);
}
.secondbg {
    background-image: url(https://sqimg.qq.com/qq_product_operations/im/2015/update/avd.jpg);
}
.thirdbg {
    background-image: url(https://sqimg.qq.com/qq_product_operations/im/2015/blog.jpg);
}
.foot {
    background-color: black;
    line-height: 500px;
    color: #fff;
    text-align: center;
    width: 100%;
    font-size: 38px;
    font-weight: bold;
    font-family: "MVP2Font";
}




.mainText {
  font-family: "MVP2Font";
  font-size: 68px;
  display: block;
  margin-top: 30vh;
  text-align: center;
  color:blue;
  text-shadow:15px 15px 15px gray;
  cursor:pointer;
}
</style>