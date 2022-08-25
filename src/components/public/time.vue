<template>
  <div>
    <span class="timeClass">{{year}}年{{month}}月{{day}}日{{hour}}时{{minute}}分{{second}}秒&emsp;{{workTime}}</span>
  </div>
</template>
<script>
export default ({
  name: 'time',
  props: {},
  data () {
    return {
      dates: '',
      year: '',
      month: '',
      day: '',
      hour:'',
      minute:'',
      second:'',
      workTime: '',

    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {
    this.init();
  },
  methods: {
    init(){
      setInterval(this.getDate,50);
    },
    getDate () {
      var date = new Date();
      //年 getFullYear()：四位数字返回年份
      this.year = date.getFullYear(); //getFullYear()代替getYear()
      //月 getMonth()：0 ~ 11
      this.month = date.getMonth() + 1;
      //日 getDate()：(1 ~ 31)
      this.day = date.getDate();
      //时 getHours()：(0 ~ 23)
      this.hour = date.getHours();
      //分 getMinutes()： (0 ~ 59)
      this.minute = date.getMinutes();
      //秒 getSeconds()：(0 ~ 59)
      this.second = date.getSeconds();

      var workDay = date.getDay();
      var arr = [ "星期日","星期一","星期二","星期三","星期四","星期五","星期六",];
      this.workTime = arr[workDay]
    }

  }

})
</script>
<style lang="scss" scoped>
.timeClass{
  font-family: 'ygFont';
  font-size: 18px;
}
</style>
