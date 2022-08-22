<template>
  <div class="songContainer">
    <el-button @click="GetSong">获取随机歌曲</el-button>
    <el-select v-model="playMode"
               placeholder="请选择"
               @change="changeMode">
      <el-option v-for="item in playOptions"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <el-switch v-model="isAutoPlay"
               active-color="#13ce66"
               inactive-color="#ff4949">
    </el-switch>
    <div v-if="imgUrl !== ''"
         style="width:250px;height:fit-content;">
      <div style="border:25px solid black;border-radius:100%;margin-top:15px">
      <div style="border:15px solid gray;border-radius:100%;">
      <div style="border:5px solid black;border-radius:100%;">
      <img :src="imgUrl"
           style="width:100%;height:70%;border-radius:100%;"
           class="rotateImg" />
      </div>
      </div>
      </div>

      <div style="display:flex;justify-content:center;color:gray;font-family:'MVP2FOnt';margin-bottom:10px">
        <span>{{songAuthour}}:&emsp;{{songName}}</span>
      </div>
      <audio :src="songUrl"
             autoplay="autoplay"
             muted
             controls
             loop
             style="width:100%;margin-top:10px;"></audio>
    </div>

  </div>
</template>
<script>
import axios from "axios";
export default ({
  name: 'songCD',
  props: {},
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
.songContainer{
  background:radial-gradient(#747473, black);
  padding:20px 40px;
  border-radius: 40px;
  box-shadow:10px 10px gray;
  
}
.rotateImg {
  width: 100%;
  height: 70%;
  // margin-top:15px;
  border:5px solid gray;
  box-sizing: border-box;
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
