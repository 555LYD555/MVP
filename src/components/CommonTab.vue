<template>
  <div class="tabs">
    <!--closable这里说明home是不能关闭的-->
    <el-tag
      :key="tag.name"
      size="medium"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'Home'"
      :disable-transitions="false"
      @close="handleClose(tag, index)"
      @click="changeMenu(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      class="tagItem"
    >
      {{ tag.meta.title }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
      //获取vuex的标签集合数据
    ...mapState({
      tags: state => state.breadCrumb.tabsList
    })
  },
  methods: {
    ...mapMutations({
      close: 'breadCrumb/closeTab',
      select:'breadCrumb/selectMenu'
    }),
    //关闭标签
    handleClose(tag, index) {
      let length = this.tags.length - 1
      //vuex调方法的另一种写法
      this.close(tag)
      // 如果关闭的标签不是当前路由的话，就不跳转
      if (tag.name !== this.$route.name) {
        return
      }
    //   // 关闭的标签是最右边的话，往左边跳转一个
    //   if (index === length) {
    //     this.$router.push({ name: this.tags[index - 1].name })
    //   } else {
    //     // 否则往右边跳转
    //     this.$router.push({ name: this.tags[index].name })
    //   }
      // 关闭的标签是最右边的话，往左边跳转一个
      if (index === length) {
        this.$router.push({ path: this.tags[index - 1].path })
      } else {
        // 否则往右边跳转
        this.$router.push({ path: this.tags[index].path })
      }
    },

    //选择标签跳转路由
    changeMenu(item) {
        this.$router.push({ path:item.path })
        //   this.$store.commit('breadCrumb/selectMenu', item)
        this.select(item)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs{
    height: 50px;
    padding:0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width:100%;
    overflow: auto;

    .tagItem{
        margin:0 5px;
        cursor: pointer;
    }
}

</style>