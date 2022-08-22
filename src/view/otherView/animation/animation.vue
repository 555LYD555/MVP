<template>
  <div class="container">
    <div class="ball"></div>
    <div class="ball1"></div>
    <div class="ball2"></div>
    <div class="ball3"></div>
  </div>
</template>
<script>
export default ({
  name: 'animation',
  props: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {

  }

})
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
.ball {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: red;
  // position: relative;
  position: absolute;
  animation: animX 2s cubic-bezier(0.36, 0, 0.64, 1) -1s infinite alternate,
    animY 2s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
    scale 4s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;
  

  -webkit-animation: animX 2s cubic-bezier(0.36, 0, 0.64, 1) -1s infinite alternate,
    animY 2s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
    scale 4s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;
  
}
.ball1 {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: red;
  // position: relative;
  position: absolute;
  animation: animX 2s cubic-bezier(0.36, 0, 0.64, 1) -2s infinite alternate,
    animY 2s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
    scale 4s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;


  -webkit-animation: animX 2s cubic-bezier(0.36, 0, 0.64, 1) -2s infinite alternate,
    animY 2s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
    scale 4s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;

}
.ball2 {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: red;
  // position: relative;
  position: absolute;
  animation: animX 2s cubic-bezier(0.36, 0, 0.64, 1) -3s infinite alternate,
    animY 2s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
    scale 4s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;


  -webkit-animation: animX 2s cubic-bezier(0.36, 0, 0.64, 1) -3s infinite alternate,
    animY 2s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
    scale 4s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;

}
.ball3 {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: red;
  // position: relative;
  position: absolute;
  animation: animX 2s cubic-bezier(0.36, 0, 0.64, 1) -4s infinite alternate,
    animY 2s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
    scale 4s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;


  -webkit-animation: animX 2s cubic-bezier(0.36, 0, 0.64, 1) -4s infinite alternate,
    animY 2s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
    scale 4s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;

}

@keyframes animX {
  0% {
    left: 0px;
  }
  100% {
    left: 500px;
  }
}
@keyframes animY {
  0% {
    top: 0px;
  }
  100% {
    top: 300px;
  }
}
@keyframes scale {
  0% {
    transform: scale(0.2);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(0.2);
  }
}
@-webkit-keyframes animX /*Safari and Chrome*/ {
  0% {
    left: 0px;
  }
  100% {
    left: 500px;
  }
}
@-webkit-keyframes animY /*Safari and Chrome*/ {
  0% {
    top: 0px;
  }
  100% {
    top: 300px;
  }
}
@-webkit-keyframes scale /*Safari and Chrome*/ {
  0% {
    transform: scale(0.2);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(0.2);
  }
}

// .ball1 {
//   position: absolute;
//   margin-left: 25%;
//   margin-top: 0px;
//   animation-delay: 0s;
// }
// .ball2 {
//   position: absolute;
//   margin-left: 25%;
//   margin-top: 0px;
//   animation-delay: 0.5s;
// }
// .ball3 {
//   position: absolute;
//   margin-left: 25%;
//   margin-top: 0px;
//   animation-delay: 1s;
// }
// .ball4 {
//   position: absolute;
//   margin-left: 25%;
//   margin-top: 0px;
//   animation-delay: 1.5s;
// }
// .ball1{
//   position: absolute;
//   margin-left: 25%;
//   margin-top: 0px;
// }
// .ball2{
//   position: absolute;
//   margin-left: 0;
//   margin-top: 25%;
// }
// .ball3{
//   position: absolute;
//   margin-left: 50%;
//   margin-top: 25%;
// }
// .ball4{
//   position: absolute;
//   margin-left: 25%;
//   margin-top: 50%;
// }
</style>
