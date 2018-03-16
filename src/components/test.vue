<template>
  <div class="main">
  	<Cascader :data="data" v-model="value1"></Cascader>
<!-- 
    <div id='menu'>
    	<label for="qq" class="checkbox">
    		<input id='qq' type="radio" name='label' value='vector' checked='checked'>Vector Labels
    	</label>
    	<label for="ww" class="checkbox">
    		<input id='ww' type="radio" name='label' value='overlay'>overlay Labels
    	</label>
    </div>
    <div id='label' style="display:none"></div>
    <div id="marker" class='marker' title='marker'>123
    </div> -->

  </div>
</template>

<script>
import heade from '@/components/header'
export default {
	components: {
		heade
	},
	data () {
		return {
			value1: [],
			                data: [{
			                    value: 'beijing',
			                    label: '北京',
			                    children: [
			                        {
			                            value: 'gugong',
			                            label: '故宫'
			                        },
			                        {
			                            value: 'tiantan',
			                            label: '天坛'
			                        },
			                        {
			                            value: 'wangfujing',
			                            label: '王府井'
			                        }
			                    ]
			                }, {
			                    value: 'jiangsu',
			                    label: '江苏',
			                    children: [
			                        {
			                            value: 'nanjing',
			                            label: '南京',
			                            children: [
			                                {
			                                    value: 'fuzimiao',
			                                    label: '夫子庙',
			                                }
			                            ]
			                        },
			                        {
			                            value: 'suzhou',
			                            label: '苏州',
			                            children: [
			                                
			                            ]
			                        }
			                    ],
			                }]
			            }
	},
	computed:{
	   reverseMessage:function(){
	       return this.message.split('').reverse().join('');
	   }
	},
	mounted(){
		this.init();
		this.map();
	},
	methods:{
		init(){
			let beijing = ol.proj.fromLonLat([116.28,39.54]);
			let beijings = ol.proj.fromLonLat([106.28,38.54]);
			let wuhan = ol.proj.fromLonLat([114.21,30.37]);

			let createLabelStyle = feature=>{
				return new ol.style.Style({
					image:new ol.style.Icon(({
						anchor:[0.5,50],//偏离原来左边
						anchorOrigin:'top-right',
						anchorXUnits:'fraction',
						anchorYUnits:'pixels',
						offsetOrigin:'bottom-right',
						src:'static/image/map/tower.png'
					})),
					text:new ol.style.Text({
						textAlign:'center',
						textBaseline:'middle',
						text:feature.get('name')+'人数：'+feature.get('population'),
						fill:new ol.style.Fill({color:'#a30'}),//字体颜色
						stroke: new ol.style.Stroke({color:'#ffcc33',width:3})
					})
				})
			}

			let iconFeature = new ol.Feature({
				geometry:new ol.geom.Point(beijing),
				name:'北京市',
				population:2115
			});
			let iconFeatures = new ol.Feature({
				geometry:new ol.geom.Point(beijings),
				name:'北京市1',
				population:2115
			});
			iconFeature.setStyle(createLabelStyle(iconFeature));
			iconFeatures.setStyle(createLabelStyle(iconFeatures));
			let vectorSource = new ol.source.Vector({
				features:[iconFeature,iconFeatures]
			});
			let vectorLayer = new ol.layer.Vector({
				source:vectorSource
			});
			mainmap.map.addLayer(vectorLayer);

			let marker = new ol.Overlay({
				id:'111',
				position:wuhan,
				positioning:'center-center',
				element:document.getElementById('marker'),
				stopEvent:false
			});
			mainmap.map.addOverlay(marker);
		},
		map(){
			// mainmap.initMap(document.getElementById('map'));
		},
		initTimeLine(){
			let container = document.getElementById('timeline');

		  	// Create a DataSet (allows two way data-binding)
			let items = new vis.DataSet([
				{id: 1, content: 'item 1', start: '2013-04-20'},
				{id: 2, content: 'item 2', start: '2013-04-14'},
				{id: 3, content: 'item 3', start: '2013-04-18'},
				{id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
				{id: 5, content: 'item 5', start: '2013-04-25'},
				{id: 6, content: 'item 6', start: '2013-04-27'}
			]);

		  	// Configuration for the Timeline
			let options = {};

			// Create a Timeline
			let timeline = new vis.Timeline(container, items, options);
		},
		methodMessage:function () {
            return this.message.split('').reverse().join('');
        }
	}
}
</script>

<style lang="scss" scoped>
	.main{
		margin:10%;	
	}
	#menu{
		width:100%;
		height:20px;
	}
	.checkbox{
		margin:5px 15px;
	}
	.address{
		color:red;
	}
</style>
