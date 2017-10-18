<template>
  <div>
    <Modal v-model="dblChildrenModel">
      <p slot="header">
        <span>编辑子集</span>
      </p>
      <div>
        <Icon type="ios-help-outline"></Icon>
        <p>面板中有内容尚未保存，确定继续？</p>
        <p>确定后将为你自动保存！！</p>
      </div>
      <div slot="footer">
        <Button type="text" @click="dblMClick('exit')">取消</Button>
        <Button type="ghost" @click="dblMClick('return')">返回父级</Button>
        <Button type="primary" @click="dblMClick('ok')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    props: {
      dblChildrenModel: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      dblMClick: function (name) {
        this.$emit('dblReturn', name)
      }
    }
  }
</script>