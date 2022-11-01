-------------（1）map()数组重构：-------------------------
getNewData(){
  let newData = data.map((item)=>{
    let obj = {
      label:item.name;
      key:item.id;
    };
    return obj;
  })
}
使用obj是为了不改变原数组，虽说map方法不改变原数组，但如果数组元素是引用类型，还是会被改变。


------------（2）filter()过滤：----------------------------
filterNode(){
  let filterData = data.filter((item)=>{
    return item.status === 1;
  })
}
广泛用于数组，对象数组、树形结构数据的过滤筛选，过滤后生成新数组。（不改变原数组）

----------（3）forEach键值对遍历重构数组：----------------------
getNewData(){
  let newData = [];
  if(data.hasOwnProperty('children')){
    data.children.forEach((key)=>{
      let obj = {
        id:key,
        name:data.children[key]
      }
      newData.push(obj);
    })
  }
}
为了避免forEach() is not a function 的报错，应该加入属性是否存在的判断。

--------------(4)map构建键值对，以键取值。---------------
computed:{
  getNewMap:{
    let map = new Map();
    this.opts.forEach((item)=>{
      map.set(item.value,item.name);
    })
    return map;
  }
}
需要取用键值对时，以键取值
{{getNewMap.get(xxxscope.row.type)}}

--------------(5)定时器轮询任务---------------------
//定时器
setTimerSyncTask(){
  this.syncTimer = setInterval(this.syncTask,2000);
}
//定时任务
syncTask(){
  let url =;
  this.$Post(url).then(res=>{
    if(res.errCode === 0){
      if(res.data.status === "finished"){
        clearInterval(this.syncTimer);
      }else if(res.data.status === "continue"){

      }else{
        clearInterval(this.syncTimer);
      }
    }
  })
}

-----------//(6)树结构遍历()--------------------------
//          树形数据  深度   下标（一维）
deepVisited(treeData,deepth,index){
  treedata.forEach((item)=>{
    if(item.id == )
    if(item.children && item.children.length>0){
      deepVisited(item.children,deepth+1,index);
    }
  })
}


treeData=[
  {
    id:1,name:"aaa",status:0,
    children:[
      {id:12,name:"bbb",status:0,},
      {id:13,name:"ccc",status:0,},
    ]
  },
  {
    id:2,name:"xxx",status:0,
    children:[
      {id:22,name:"yyy",status:0,},
      {id:23,name:"zzz",status:0,},
    ]
  },
]

||局部更新

treeData2=[
  {
    id:1,name:"aaa",status:0,
    children:[
      {id:12,name:"bbb",status:0,},
      {id:13,name:"ccc",status:0,},
    ]
  },
  {
    id:2,name:"xxx",status:0,
    children:[
      {id:22,name:"yyy",status:1,},
      {id:23,name:"zzz",status:0,},
    ]
  },
]


//算法更新原treeData
treeUpdateNodes(treeData,deepth){
  treeData.forEach((item,index)=>{
    if（item.status !== ){
      item.status = ;
    }
    if(item.children){
      this.treeUpdateNodes(item.children,deepth+1)
    }
  })
}

js实现两个树形结构之间对比差异并更新节点（实现树形数据的局部更新）


