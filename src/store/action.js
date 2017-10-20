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
  editNodeKey: ({ commit }, param) => {
    commit('SET_EDITNODEKEY', param)
  },
  layoutNodeList: ({ commit }, param) => {
    commit('SET_LAYOUT_NODELIST', param)
  },
  layoutNodeChildren: ({ commit }, param) => {
    commit('SET_LAYOUT_NODE_CHILDREN', param)
  },
  layoutParentStyle: ({ commit }, param) => {
    commit('SET_LAYOUT_PARENT_STYLE', param)
  },
  mouseRightMenu: ({ commit }, param) => {
    commit('SET_MOUSERIGHTMENU', param)
  },
  parentParams: ({ commit }, param) => {
    commit('SET_PARENTPARAMS', param)
  },
  nodeListStorage: ({ commit }, param) => {
    commit('SET_NODELIST_STORAGE', param)
  },
  hoverPopper: ({ commit }, param) => {
    commit('SET_HOVERPOPPER', param)
  }
}
