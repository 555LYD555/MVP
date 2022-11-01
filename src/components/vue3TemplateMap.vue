<template>
  <!-- 允许多个根元素 -->
  <el-row>
    <!-- 使用teleport组件包裹起来的dom元素，可以脱离文档流直接插入到指定位置 -->
    <Teleport to="body"> 
      <el-card></el-card>
    </Teleport>
  </el-row>
  <el-row></el-row>
  <el-row></el-row>
</template>
<script>
// 组合api，计算属性computed需要显式的引入
import {ref,reactive,computed,watch} from 'vue'
export default{
  name:'vue3TemplateMap',
  props:[],
  // 触发提交事件的定义
  emits:['my-event','submit'],
  //setup（prop,context）{}默认接收两个参数，后者表示上下文即捡漏之王attrts、solt插槽、$emit
  setup(){
    //非响应式数据num
    let num = 100;
    function changeNum(){
      num+=1;
    };
    // 响应式基本或引用类型数据numV2  推荐
    let numV2 = ref(100);
    // 响应式引用类型（对象类型）不推荐
    let obj = reactive({
      name:'',
      age:0,

    });
    let arr = reactive([0, 1, 2, 3, 4]);
    //使用toRef 让对象某个属性继承响应式
    const obj = ref({
      name:'ddd',
      age:22,
    })
    let name = toRef(obj,"name");
    let age = toRef(obj,"age");
    //使用toRefs 让对象全部属性继承响应式
    const obj = ref({
      name:'ddd',
      age:22,
    })
    let {obj1} = toRefs(obj);


    
    // 计算属性的定义
    let _numV2 = computed(()=>{
      return numV2.value*2;
    })
    //------------------------------watch监听----------------------------
    //接收三个参数（监听的对象，变化时的钩子函数，监听时读取的配置：是否立即监听）
    //设置基本类型的监听
    watch(numV2,(newVal,oldVal)=>{

    },{
      immidate:true
    })
    //设置引用类型的监听
    watch(()=>obj.name,(newVal,oldVal)=>{

    },{
      immidate:true
    })



    // 将创建好的data和methods暴露给外部使用（闭包写法，提升作用域）
    return{
      num,
      numV2,
      _numV2,
      changeNum,
    }
  },
}
</script>
