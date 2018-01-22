module.exports =  {
  initMap :(id)=>{
    // 初始化地图参数
     new ol.Map({
        target: 'map',// DOM中地图容器的id 
        layers: [  ],// 图层可以在地图初始化一起进行初始化也可以后期通过addLayer方法进行添加
        view:new ol.View({   // 视图
          center:ol.proj.transform([104.06667, 30.66667], 'EPSG:4326', 'EPSG:3857');,// 设置地图中心坐标点
          projection: 'EPSG:4326',
          zoom:8,// 设置初始化显示层级
          minZoom:7,// 最小显示层级
          maxZoom:14 // 最大显示层级
        })
    });
    //创建一个使用Open Street Map地图源的瓦片图层
    var tilelayers = new ol.layer.Tile({
      source:new ol.source.XYZ({
        // 设置本地离线瓦片所在路径，由于例子里面只有一张瓦片，页面显示时就只看得到一张瓦片。
        url: '/{z}/{x}/{y}.png'
      })
    });
    map.addLayer(tilelayers);
  }
}