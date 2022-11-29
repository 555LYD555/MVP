const state = {
    currentMenu: null,
    tabsList: [
        {
            path:'/6',
            name:'Home',
            meta:{
                title:"首页",
                icon:"el-icon-s-home"
            },
        },
    ]
}
const getters = {

}
const mutations = {
    //选择标签 选择面包屑
    selectMenu(state, val) {
        if (val.name === 'Home') {
            state.currentMenu = null
        } else {
            state.currentMenu = val
            //如果等于-1说明tabsList不存在那么插入，否则什么都不做
            let result = state.tabsList.findIndex(item => item.name === val.name)
            result === -1 ? state.tabsList.push(val) : ''

        }
        // val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
    },
    //关闭标签
    closeTab(state, val) {
        let result = state.tabsList.findIndex(item => item.name === val.name)
        state.tabsList.splice(result, 1)
    },

}
const action = {

}

export default{
  namespaced: true,
  state,
  getters,
  mutations,
  action
}
