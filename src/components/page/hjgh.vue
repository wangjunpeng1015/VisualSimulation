<template>
  <div class="hjgh layout-column">
    <div class="layout-row flex">
      <div class="flex-20 containbox">
        <div class="contain-head">
          <h3>场景模型列表</h3>
        </div>
        <div class="flex container layout-column">
          <div class="flex">
            <Tree @on-select-change="cjmxChange" :data="cjmxTree"></Tree>
          </div>
        </div>
      </div>
      <div class="flex-20 containbox">
        <div class="contain-head">
          <h3>任务规则库</h3>
        </div>
        <div class="flex container layout-column">
          <div class="flex">
            <Tree @on-select-change="rwgzkChange" :data="rwgzkTree"></Tree>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="flex-20 containbox">
        <div class="contain-head layout-row" style="justify-content: space-between;">
          <h3>时间-轨迹-任务剖面</h3>
          <div class="layout-row" style="align-items: center;">
            <div v-for="(item,index) in phase" class="phase">
              <div :class="'phase'+index"></div>
              <p>{{item}}</p>
            </div>
          </div>
        </div>
        <div class="flex container layout-column">
          <div class="flex">
            <!-- 时间轴 -->
            <div id="timeline"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      //场景树
      cjmxTree:[{
        title: 'parent 1',
        expand: true,
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
            }
        ]
      }],
      //任务规则树
      rwgzkTree:[{
        title: 'parent 1',
        expand: true,
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
            }
        ]
      }],
      //任务阶段
      phase:['阶段一','阶段二','阶段三']
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      this.initTimeLine();
    },
    /*时间轴初始化*/
    initTimeLine(){
      let data = [
        {id: 1,group:'航母', content: 'item 1', start: '2018-04-20'},
        {id: 2,group:'预警机', content: 'item 2', start: '2018-04-14'},
        {id: 3,group:'y8侦察机', content: 'item 3', start: '2018-04-18'},
        {id: 4,group:'y8侦察机', content: 'item 4', start: '2018-04-16', end: '2018-04-19'},
        {id: 5,group:'预警机', content: 'item 5', start: '2018-04-25'},
        {id: 6,group:'航母', content: 'item 6', start: '2018-04-27'}
      ]
      // let stages = [
      //   {id: 'A', content: '', start: '2018-03-14', end: '2018-05-22', type: 'background',className:'stage1'},
      //   {id: 'B', content: '', start: '2018-04-14', end: '2018-05-22', type: 'background',className:'stage2'}
      //   {id: 'C', content: '', start: '2018-05-14', end: '2018-05-22', type: 'background',className:'stage3'}
      // ]
      
      // 获取分组
      let groups = new vis.DataSet();
      let group = _.groupBy(data,'group');

      let names = Object.keys(group);
      names.forEach(item=>{
        groups.add({
          id: item, 
          content: item
        });
      })
      // 创建timeline数据
      let timeData = new vis.DataSet();
      data.forEach((item,index)=>{
         timeData.add({
          id:index,
          group: item.group,
          content: `${item.content}<span style="color:black;"></span>`,
          start: item.start,
          type: item.type || 'point'
        });
      })
      //添加任务阶段
      // _.forEach(group,(value,key)=>{
      //   timeData.add({
      //     id: key, 
      //     group:key,
      //     content: '', 
      //     start: start, 
      //     end: end, 
      //     type: 'background',
      //     className:((data)=>{
      //       console.log(value,key)
      //       debugger
      //       return 'nativa';
      //     })()
      //   })
      // })
      /*添加数据任务阶段--*/
      _.forEach(group,(value,key)=>{
        let start = _.minBy(value,'start').start;
        let end = _.maxBy(value,'start').start;
        timeData.add({
          id: key, 
          group:key,
          content: '', 
          start: start, 
          end: end, 
          type: 'background',
          className:((data)=>{
            console.log(value,key)
            debugger
            return 'nativa';
          })()
        })
      })
      
      // create visualization
      let container = document.getElementById('timeline');
      let options = {
        groupOrder: 'content',  // groupOrder can be a property name or a sorting function
        locale: moment.locale('zh-cn')//中文化
      };
      let timeline = new vis.Timeline(container);
      timeline.setOptions(options);
      timeline.setGroups(groups);
      timeline.setItems(timeData);
      setTimeout(()=>{
        timeline.moveTo(moment());//移动到当前时间
      })
    },
    /*场景模型树*/
    cjmxChange(data){

    },
    /*任务规则库*/
    rwgzkChange(data){

    }
  }
}
</script>
<!--
   '<<<' 一般为scoped深度作用或'/deep/'
   转化为：  .a[data-v-f3f3eg9] .b
-->
<style lang="scss" scoped>
  .hjgh{
    >:first-child{
      justify-content: space-between;
    }
    #timeline{
      width: 100%;
    }
    .phase{
      margin:0 10px;
      text-align:center;
      [class^="phase"]{
        display: inline-block;
        width:12px;
        height:12px;
      }
      .phase0{
        background-color:#0078ae;
      }
      .phase1{
        background-color:#b8871e;
      }
      .phase2{
        background-color:#8d3b33;
      }
    }
  }
</style>
