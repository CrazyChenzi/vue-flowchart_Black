<template>
  <Tree :data="treeData"></Tree>
</template>
<script>
export default {
  data() {
    return {
      treeData: [],
      data1: [{
        title: 'parent 1',
        expand: true,
        children: [{
            title: 'parent 1-1',
            expand: true,
            children: [{
                title: 'leaf 1-1-1'
              },
              {
                title: 'leaf 1-1-2'
              }
            ]
          },
          {
            title: '测试',
            expand: true,
            children: [{
                title: 'leaf 1-2-1'
              },
              {
                title: 'leaf 1-2-1'
              }
            ]
          }
        ]
      }]
    }
  },
  mounted() {
    this.setTreeData();
  },
  methods: {
    setTreeData() {
      this.treeData = this.data1
      this.treeData[0].children[1].selected = true;
    }
  }
}
</script>
