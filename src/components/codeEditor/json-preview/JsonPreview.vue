<!-- 1.71版本的vue-json-pretty ：部分展示功能缺乏-->
<template>
  <div>
    <vue-json-pretty :path="'res'" :deep="4" :showIcon="true" :showLineNumber="true" :showLength="true" :showLine="true"
      :showDoubleQuotes="true" :data="data" :editable="true" :highlightMouseoverNode="true"
      :showSelectController="true" />
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
export default {
  components: {
    VueJsonPretty,
  },
  props: ['data']
};
</script>