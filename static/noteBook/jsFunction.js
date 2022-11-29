// ------------------对象方法-----------------------------
// 1.for..in (该方法遍历原型链和对象上的属性，当然如果没有在object.create()时给原型上加属性，可以正常使用)
let map = new Map()
for(let key  in obj){
    map.set(key,obj[key])
}
// 2.Object.keys(obj)该方法获取对象上的属性(不包含原型链上的可枚举和symbol属性)
//   Objcet.values(obj)返回对象上所有的值组成的数组
let map2 = new Map()
Object.keys(obj).forEach((key)=>{
    map2.set(key,obj[key])
})
// --------------------数组方法-----------------------------
//1.concat数组拼接（不改变原数组）
let arr1
let arr2
let arr3 = arr1.concat(arr2)
//2.push数组拼接或者增加元素（改变原数组）
let arr1= []
let arr2 = []
let arr1.push(...arr2)
//3.


//设计思想方便度：data配置修改》逻辑代码修改》html样式改动