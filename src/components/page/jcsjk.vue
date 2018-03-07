<template>
  <div class="jcsjk layout-row">
    <div class="containbox-one flex-75">
      <div class="layout-row">
        <!-- 左 -->
        <div class="container line flex-65 layout-column">
          <div class="flex-60 layout-column">
            <Tabs value="name1"  @on-click="changeCharts">
              <TabPane label="标签一" name="name1"></TabPane>
              <TabPane label="标签二" name="name2"></TabPane>
              <TabPane label="标签三" name="name3"></TabPane>
            </Tabs>
            <div id="echart" class="flex"></div>
          </div>
          <div class="flex-40 layout-column"  style="overflow-y:auto">
            <Tabs value="name1" on-click="gridChange">
              <TabPane label="标签一" name="name1"></TabPane>
              <TabPane label="标签二" name="name2"></TabPane>
              <TabPane label="标签三" name="name3"></TabPane>
            </Tabs>
            <Table class="flex layout-column" :show-header='false' stripe :columns="gridCol" :data="gridData"></Table>
          </div>
        </div>
        <!-- 右 -->
        <div class="container flex-35 layout-column">
          <div class="sm-modal">
            <h3 class="title">信息数据导入</h3>
            <div class="containt">
              <div class="nr">
                <div class="layout-row nr-box">
                   <Select v-model="import1" style="width:200px">
                      <Option v-for="item in importList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
                <div class="layout-row nr-box">
                  <DatePicker type="date" placeholder="选择日期" style="width: 200px"></DatePicker>日期
                </div>
                <div class="layout-row nr-box">
                   <Upload :before-upload="upload">
                      <Button type="ghost" icon="ios-cloud-upload-outline">浏览</Button>
                  </Upload>
                  <div class="buttons">
                    <!-- <Button class="btn" @click="remove(gridSelected)">浏览</Button> -->
                    <Button class="btn" @click="remove(gridSelected)">导入</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      import1:'',
      importList:[{
        label:'场景1',
        value:'scen1'
      },{
        label:'场景2',
        value:'scen2'
      },{
        label:'场景2',
        value:'scen2'
      },{
        label:'场景2',
        value:'scen2'
      },{
        label:'场景2',
        value:'scen2'
      },{
        label:'场景2',
        value:'scen2'
      },{
        label:'场景2',
        value:'scen2'
      },{
        label:'场景2',
        value:'scen2'
      },{
        label:'场景2',
        value:'scen2'
      }],
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
          tooltip : {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
          },
          // legend: {
          //     data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
          // },
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
                  symbol:'circle',
                  areaStyle: {
                    normal: {
                       color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                           offset: 0,
                           color: 'rgba(40, 182, 252, 0.85)'
                       }, {
                           offset: 1,
                           color: 'rgba(28, 159, 255, 0.2)'
                       }])
                    }
                  },
                  data:[120, 132, 101, 134, 90, 230, 210]
              },
              {
                  name:'联盟广告',
                  symbol:'circle',
                  type:'line',
                  stack: '总量',
                  areaStyle: {normal: {}},
                  data:[220, 182, 191, 234, 290, 330, 310]
              },
              {
                  name:'视频广告',
                  symbol:'circle',
                  type:'line',
                  stack: '总量',
                  areaStyle: {normal: {}},
                  data:[150, 232, 201, 154, 190, 330, 410]
              },
              {
                  name:'直接访问',
                  symbol:'circle',
                  type:'line',
                  stack: '总量',
                  areaStyle: {normal: {}},
                  data:[320, 332, 301, 334, 390, 330, 320]
              },
              {
                  name:'搜索引擎',
                  symbol:'circle',
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

    },
    //上传文件
    upload(file){
      debugger
      return false;
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
    .containbox-one{

    }
    .sm-modal{
      margin:0 10%;
    }
  }
</style>
