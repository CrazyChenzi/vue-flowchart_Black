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
}
