// import { defineStore } from 'pinia';
// import { getUserHttp } from '@/api/user';
// import {store} from '@/store'

// export const useUserStatus = defineStore({
//   id:'',
//   state:()=>{
//     userInfo:{}
//     name:''

//   },
//   action:{
//     setUserInfo(userInfo){
//       this.userInfo = userInfo
//     },
//     getUserInfo(){
//       getUserHttp().then((res)=>{
//         this.setUserInfo(res.user || {})
//       })
//     }
//   }

// })

// export function useUserStatusHook(){
//   return useUserStatus()
// }

import getOrgListHttp from '';

const state = {
  orgList:[]

}

// 使用getter计算属性进行基于state数据的计算
const getters = {
  orgListIdMap:(state)=>{
    return state.map(item=>item.orgId)
  }
}

const mutations = {
  setOrgList(state,orgList){
    state.orgList = orgList
  }
}

// actions请求获得orgList并且通过commit触发mutations方法去改变state的值
const actions = {
  getOrgList(){
    getOrgListHttp().then((res)=>{
      if(res.errCode === 0){
        let orgListTemp = res.datas
        commit(setOrgList,orgListTemp)
      }
    }).catch(error=>{
      console.error(error)
    })
  }
}

export default{
  state,
  getters,
  mutations,
  action,
}


// 页面中引入
// import { mapState,mapGetters,mapMutations,mapActions }from 'vuex'

// computed:{
//   mapState({
//     orgList:'orgList'
//   })
//   ...mapGetters([
//     'orgListIdMap'
//   ])
// }

// methods(){
//   ...mapMutations([
//     'setOrgList'
//   ])
//   ...mapActions{[
//     'getOrgList',
//   ]}
// }