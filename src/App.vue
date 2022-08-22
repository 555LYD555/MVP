<template>
  <div id="app">
    <!-- <router-view/> -->
    <home></home>
  </div>
</template>

<script>
import home from "./components/Home.vue";
export default {
  name: 'App',
  components:{home},
}
</script>

<style lang="scss">
  html,body,#app{
     box-sizing:border-box;
     width:100%;
     height:100%;
  }

</style>
