<template>
  <div>
    <el-row>
      <el-col :span="12"><songCD></songCD></el-col>
      <el-col :span="12"></el-col>
    </el-row>
    <el-row>
      <el-col :span="12" ><translateLanguage></translateLanguage></el-col>
      <el-col :span="12"></el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
import songCD from "./songCD.vue";
import translateLanguage from './tranlateLanguage.vue';
export default ({
  name: 'vueTemplateMap',
  props: {},
  components:{
    songCD,
    translateLanguage,
    },
  data () {
    return {
      imgUrl: '',
      songUrl: '',
      songName: '',
      songAuthour: '',

      playOptions: [{
        value: '1',
        label: '单曲循环'
      }, {
        value: '2',
        label: '随机播放'
      }],
      playMode: '',

      loop: '',

      isAutoPlay: false,

    }
  },
  computed: {},
  watch: {},
  created () {


  },
  mounted () {

  },
  methods: {
    GetSong () {
      axios.get('https://api.uomg.com/api/rand.music?sort=热歌榜&format=json')
        .then((res) => {//请求成功的回调，.then返回一个新的promise  注：res是response的缩写
          this.imgUrl = res.data.data.picurl;
          this.songUrl = res.data.data.url;
          this.songAuthour = res.data.data.artistsname;
          this.songName = res.data.data.name;
        })
        .catch((error) => {//请求失败的回调;
          console.log("请求失败数据", error);
        })

    },

    changeMode () {
      if (this.playMode === '1') {  //单曲循环
        this.loop = 'loop';
      } else {  //随机播放
        this.GetSong();
      }

    }

  }

})
</script>
<style lang="scss" scoped>
.rotateImg {
  width: 100%;
  height: 70%;
  border-radius: 100%;
  animation: rotateCD 8s infinite;
  animation-timing-function: linear;

  -webkit-animation: rotateCD 8s infinite ;
  -webkit-animation-timing-function: linear;


  @keyframes rotateCD{
    from{
      transform:rotate(0deg);
    }to{
      transform:rotate(-360deg) ;
    }
  }
  @-webkit-keyframes rotateCD{
    from{
      transform:rotate(0deg);
    }to{
      transform:rotate(-360deg);
    }

  }
}
</style>
