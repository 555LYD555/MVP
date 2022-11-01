<template>
  <div class="container">

  </div>
</template>
<script>

export default{
  name:'FourCornerBorder',
  props:[],
  data(){
    return{

    }
  },
  watch(){

  },
  computed:{

  },
  created(){

  },
  mounted(){

  },
  methods:{

  }
}
</script>
<style lang="scss" scoped>
.container{
  position: relative;
  width: 200px;
  height:150px;
  background:#ededed;
  &::before{
    content: '';
    position: abosolute;
    left:0;
    top:0;
    width: 200px;
    height:150px;
    background-image:linear-gradient(blue, blue) left top,
        linear-gradient(blue, blue) left top,
        linear-gradient(blue, blue) left bottom,
        linear-gradient(blue, blue) left bottom,
        linear-gradient(blue, blue) right top,
        linear-gradient(blue, blue) right top,
        linear-gradient(blue, blue) right bottom,
        linear-gradient(blue, blue) right bottom;
    background-repeat: no-repeat;
    background-size:25px 2px,2px 25px;
    // background-clip: 1cm;
  }

}
</style>
