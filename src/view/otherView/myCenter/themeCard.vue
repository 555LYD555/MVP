<template>
  <div class="contanier">
    <template v-for="(item,index) in themeCardList" >
      <el-card class="box-card" :key="index" :style="{ background:item.background }">
        <div slot="header"
             class="clearfix">
          <span>主题名称：{{item.name}}</span>
          <el-button style="float: right; padding: 3px 0"
                     type="text" @click="applyTheme(index)">应用主题</el-button>
        </div>
        <div>
          <el-image :src="item.url"
                    fit="fit">
          </el-image>
        </div>
      </el-card>
    </template>
  </div>
</template>
<script>
export default ({
  name: 'themeCard',
  props: ['currentTheme'],
  data () {
    return {
      themeCardList: [
        { name: '草原绿', url: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',background:'#87d184' },
        { name: '海洋蓝', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',background:'#92b3f0' },
        { name: '远山青', url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-090922%2Fcz0105hfypjcz0105hfypj.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664365847&t=0dce57af37f2bbcf56c4dab19a66fa07',background:'#ebb5e2' },
        { name: '天空蓝', url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F2007%2Fntk-2007-25584.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664366171&t=21dfddd614d78f7ee4346cea1ec5d59b',background:'#B8D2ED' },
      ],

    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    applyTheme(index){
      this.$emit("update:currentTheme",'MVP-theme'+index);
    }
  }

})
</script>
<style lang="scss" scoped>
// .text {
//   font-size: 14px;
// }

// .item {
//   margin-bottom: 18px;
// }

// .clearfix:before,
// .clearfix:after {
//   display: table;
//   content: "";
// }
// .clearfix:after {
//   clear: both;
// }
.contanier{
  height:750px;
  overflow: auto;

  /*滚动条里面小方块*/
  &::-webkit-scrollbar-thumb {
    // background-color: #EBEAEF;
    background-color: #2f96db;
    border-radius: 10px;
  }
  /*滚动条整体样式*/
  &::-webkit-scrollbar {
    width: 3px;
    height: 6px;
  }
  /*滚动条里面轨道*/
  &::-webkit-scrollbar-track {
    background: #ffffff;
    // background: #e96f6f;
    border-radius: 10px;
  }
}
.box-card {
  width: 90%;
  margin-top: 15px;
  border-radius: 15px;
  box-shadow: 10px 10px 10px rgb(172, 171, 171);
  // opacity: 0.5;
  // height: 350px;
  // background: rgb(206, 206, 235);
  // background: #ebb5e2;
}
</style>
