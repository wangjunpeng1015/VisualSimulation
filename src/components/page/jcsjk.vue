<template>
  <div class="jcsjk layout-row">
    <div class="qq flex-75 layout-row">
      <!-- 左 -->
      <div class=" flex-70 layout-column">
        <div class="flex-60 layout-column">
          <Tabs value="name1" @on-click="changeCharts">
            <TabPane label="标签一" name="name1"></TabPane>
            <TabPane label="标签二" name="name2"></TabPane>
            <TabPane label="标签三" name="name3"></TabPane>
          </Tabs>
          <div id="echart" class="flex"></div>
        </div>
        <div class="flex-40 layout-column">
          <Tabs value="name1" on-click="gridChange">
            <TabPane label="标签一" name="name1"></TabPane>
            <TabPane label="标签二" name="name2"></TabPane>
            <TabPane label="标签三" name="name3"></TabPane>
          </Tabs>
          <Table class="flex layout-column" :show-header='false' stripe :columns="gridCol" :data="gridData"></Table>
        </div>
      </div>
      <!-- 右 -->
      <div class=" flex-30"></div>
    </div>
    <!-- 菜单栏 -->
    <menulist :menus='menusList'></menulist>
  </div>
</template>

<script>
import menulist from '@/components/menu'
export default {
  components: {
    menulist
  },
  data () {
    return {
      //表格头
      gridCol:[
        {
            title: '',
            sortable: true,
            key: 'key'
        },
        {
            title: '',
            sortable: true,
            key: 'value'
        }
      ],
      gridData:[
        {
            key: '场景编号',
            value: 1,
        },
        {
            key: '场景名称',
            value: '航母群',
        },{
            key: '创建时间',
            value: '2018/01/05',
        },{
            key: '修改时间',
            value: '2018/01/05',
        }
      ],
      /*右下角菜单数据*/
      menusList:[
        {name:'主页',nm:'main'},
        {name:'用户管理',nm:'usermanage'},
        {name:'基础数据库',nm:'jcsjk'}
      ]
    }
  },
  mounted(){
   this.changeCharts();
  },
  methods:{
    //切换echarts图
    changeCharts(name){
       let myChart = this.$echarts.init(document.getElementById('echart'));
      let option = {
          title: {
              text: '堆叠区域图'
          },
          tooltip : {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
          },
          legend: {
              data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : ['周一','周二','周三','周四','周五','周六','周日']
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'邮件营销',
                  type:'line',
                  stack: '总量',
                  areaStyle: {normal: {}},
                  data:[120, 132, 101, 134, 90, 230, 210]
              },
              {
                  name:'联盟广告',
                  type:'line',
                  stack: '总量',
                  areaStyle: {normal: {}},
                  data:[220, 182, 191, 234, 290, 330, 310]
              },
              {
                  name:'视频广告',
                  type:'line',
                  stack: '总量',
                  areaStyle: {normal: {}},
                  data:[150, 232, 201, 154, 190, 330, 410]
              },
              {
                  name:'直接访问',
                  type:'line',
                  stack: '总量',
                  areaStyle: {normal: {}},
                  data:[320, 332, 301, 334, 390, 330, 320]
              },
              {
                  name:'搜索引擎',
                  type:'line',
                  stack: '总量',
                  label: {
                      normal: {
                          show: true,
                          position: 'top'
                      }
                  },
                  areaStyle: {normal: {}},
                  data:[820, 932, 901, 934, 1290, 1330, 1320]
              }
          ]
      };

       myChart.setOption(option,true);
    },
    //表格数据切换
    gridChange(name){

    }
  }
}
</script>
<!--
   '<<<' 一般为scoped深度作用或'/deep/'
   转化为：  .a[data-v-f3f3eg9] .b
-->
<style lang="scss" scoped>
  .jcsjk{
    justify-content:center;
    .qq{
      background-color:green;
    }
  }
</style>
