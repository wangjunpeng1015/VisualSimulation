<template>
  <div class="scene layout-row">
    <!-- 左 -->
    <div class="containbox flex-20">
      <div>
        <div class="contain-head layout-row" style="align-items:center;justify-content: space-between;">
          <h3>场景模型列表</h3>
          <Select v-model="scene" filterable style="width:150px">
            <Option v-for="item in scenes" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </div>
      </div>
      <div class="flex container layout-column">
        <div class="flex">
          <Tree :data="sceneTree" show-checkbox></Tree>
        </div>
        <div>
          <Table class="flex layout-column" :show-header='false' stripe :columns="sceneCol" :data="sceneData"></Table>
        </div>
      </div>
    </div>
    <!-- 中 -->
    <div class="middle containbox flex">
      <div>
        <div class="contain-head">
          <h3>场景搭载</h3>
        </div>
      </div>
      <div class="flex container">
        <div>
          <div class="title">群、搭载关系</div>
        </div>
        <div>
          <Table class="flex layout-column" :show-header='false' stripe :columns="sceneCol" :data="sceneData"></Table>
        </div>
      </div>
    </div>
    <!-- 右 -->
    <div class="containbox flex-20">
      <div class="contain-head">
        <h3>模型库</h3>
      </div>
      <div class="flex container">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      /*场景信息*/
      sceneCol:[
        {
            title: '',
            sortable: true,
            key: 'name'
        },
        {
            title: '',
            sortable: true,
            key: 'age'
        }
      ],
      sceneData:[
        {
            name: '场景编号',
            age: 1,
        },
        {
            name: '场景名称',
            age: '航母群',
        },{
            name: '创建时间',
            age: '2018/01/05',
        },
      ],
      /*场景*/
      scene:'',
      scenes:[{
        label:'场景1',
        value:'scen1'
      },{
        label:'场景2',
        value:'scen2'
      }],
      /*场景树*/
      sceneTree: [
      {
          title: 'parent 1',
          expand: true,
          render: (h, { root, node, data }) => {
              return h('span', {
                  style: {
                      display: 'inline-block',
                      width: '100%'
                  }
              }, [
                  h('span', [
                      h('Icon', {
                          props: {
                              type: 'ios-folder-outline'
                          },
                          style: {
                              marginRight: '8px'
                          }
                      }),
                      h('span', data.title)
                  ]),
                  h('span', {
                      style: {
                          display: 'inline-block',
                          float: 'right',
                          marginRight: '32px'
                      }
                  }, [
                      h('Button', {
                          props: Object.assign({}, this.buttonProps, {
                              icon: 'ios-plus-empty',
                              type: 'primary'
                          }),
                          style: {
                              width: '52px'
                          },
                          on: {
                              click: () => { this.append(data) }
                          }
                      })
                  ])
              ]);
          },
          children: [
              {
                  title: 'child 1-1',
                  expand: true,
                  children: [
                      {
                          title: 'leaf 1-1-1',
                          expand: true
                      },
                      {
                          title: 'leaf 1-1-2',
                          expand: true
                      }
                  ]
              },
              {
                  title: 'child 1-2',
                  expand: true,
                  children: [
                      {
                          title: 'leaf 1-2-1',
                          expand: true
                      },
                      {
                          title: 'leaf 1-2-1',
                          expand: true
                      }
                  ]
              }
          ]
      }],
      buttonProps: {
        type: 'ghost',
        size: 'small',
      }
    }
  },
  mounted(){
    
  },
  methods:{
   
  }
}
</script>
<style lang="scss" scoped>
  .scene{
    .middle{
      margin:0 25px;
    }
  }
</style>
