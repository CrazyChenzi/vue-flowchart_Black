export default {
  ['SET_EVENTCHILD'](state, res) {
      state.eventChild = res;
  },
  ['SET_NODELIST'](state, res) {
      state.nodeList = res;
  },
  ['SET_CONTEXTMENU'](state, res) {
      state.contextmenu = res;
  },
  ['SET_ISSHOWEDIT'](state, res) {
      state.isShowEdit = res;
  },
  ['SET_EDITCLICKNUM'](state, res) {
      state.editClickNum = res;
  },
  ['SET_EDITNODEKEY'](state, res) {
      state.editNodeKey = res;
  },
  ['SET_LAYOUT_NODELIST'](state, res) {
    state.layout.layoutNodeList = res;
  },
  ['SET_LAYOUT_NODE_CHILDREN'](state, res) {
      state.layout.layoutNodeChildren = res;
  },
  ['SET_LAYOUT_PARENT_STYLE'](state, res) {
      state.layout.layoutParentStyle = res;
  },
  ['SET_MOUSERIGHTMENU'](state, res) {
      state.layout.mouseRightMenu = res;
  }
}
