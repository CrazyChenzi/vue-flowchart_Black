export default {
   nodeLists: ({ commit }, param) => {
      commit('SET_NODELIST', param)
   },
   contextmenu: ({ commit }, param) => {
      commit('SET_CONTEXTMENU', param)
   },
   isShowEdit: ({ commit }, param) => {
      commit('SET_ISSHOWEDIT', param)
   },
   editClickNum: ({ commit }, param) => {
      commit('SET_EDITCLICKNUM', param)
   },
}
