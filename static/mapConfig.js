/*
  ----所有图层layers都要加上对应id方便管理
 */
const config = require('../static/config')//引入配置文件

const json = require('../static/planjson.json')

const iconUrl = require('../static/baseUrl.json')

function initMap(id){
  let view = new ol.View({   // 视图
    center:ol.proj.transform([104.06667, 30.66667], 'EPSG:4326', 'EPSG:3857'),// 设置地图中心坐标点
    zoom:5,
    minZoom: 2
    // extent:[-180,180,-90,90]  
  });

  //鼠标经纬度
  // let mouse = new ol.control.MousePosition({
  //   coordinateFormat: ol.coordinate.createStringXY(4),
  //   projection: 'EPSG:4326',
  //   // className: 'custom-mouse-position',  
  // })
  
  var newmap = function(id){
    let map =  new ol.Map({
        target: id,// DOM中地图容器的id 
        layers: [
          // new ol.layer.Tile({
          //   source:new ol.source.XYZ({
          //     // 设置本地离线瓦片所在路径，由于例子里面只有一张瓦片，页面显示时就只看得到一张瓦片。
          //     url: config.mapUrl+'/{z}/{x}/{y}.png'
          //   }),
          //   // source: new ol.source.OSM(),
          // }),
          new ol.layer.Tile({
            source: new ol.source.OSM({
              wrapX:false
            })
          })
          //使用bing地图
          // new ol.layer.Tile({
          //   source: new ol.source.BingMaps({
          //         key: '2jD4ibF2kREHAmm2KUU8~lWNIAWz4Q5KSpP_OXXDFww~AnHgZkKiBTJl6k2JZ2AuxeTQdHYx3BistJm7bF1ZzOGk4pZp5QqAi_6kTGFcgObW', //自己申请的key
          //         imagerySet: 'Aerial',
          //         wrapX:false
          //     })
          // }),
        ],// 图层可以在地图初始化一起进行初始化也可以后期通过addLayer方法进行添加
        controls: ol.control.defaults().extend([
          // mouse//鼠标经纬度
        ]),
        view:view
    });
    //鼠标移动事件
    map.on('pointermove',e=>{  
      /*显示坐标*/
       var coord = e.coordinate;
       var degrees = ol.proj.transform(coord, 'EPSG:3857','EPSG:4326');  
       var position = ol.coordinate.toStringXY(degrees, 4);
       position = position.split(',');

       objInstance.position = [position[0],position[1]];
       $('#longlat>span').text(position[0]+','+position[1])
       /*鼠标放在Featrue上显示手型*/
       let pixel = map.getEventPixel(e.originalEvent);
       let hit = map.hasFeatureAtPixel(pixel);
       map.getTargetElement().style.cursor = hit?'pointer':'';
    });
    //因为openlayers没有右击事件所以采用jq绑定
    $(map.getViewport()).on("contextmenu", e=> {
      e.preventDefault();
      map.forEachFeatureAtPixel(map.getEventPixel(e), function (feature, layer) {
          console.log(feature)
          console.log(layer)
      });
    });
    return map;
  }
  var map = newmap(id);
  /*坐标转换*/
  function formatLonLat(array){
    return ol.proj.transform([array[0], array[1]], 'EPSG:4326', 'EPSG:3857');
  };
  var objInstance = {
    map,
    position:'',
    /*控制地图缩放*/
    controlZoom(zoom){//zoom为数字
      map.setView(new ol.View({
        zoom: zoom,
      }));
    },
    /*画动线条*/
    drawAnimateLine(data){
      var style = new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#EAE911',
          width: 2
        })
      });

      var flightsSource;
      var addLater = function(feature, timeout) {
        setTimeout(function() {
          feature.set('start', new Date().getTime());
          flightsSource.addFeature(feature);
        }, timeout);
      };

      var pointsPerMs = 0.1;
      var animateFlights = function(event) {
        var vectorContext = event.vectorContext;
        var frameState = event.frameState;
        vectorContext.setStyle(style);

        var features = flightsSource.getFeatures();
        for (var i = 0; i < features.length; i++) {
          var feature = features[i];
          if (!feature.get('finished')) {
            // only draw the lines for which the animation has not finished yet
            var coords = feature.getGeometry().getCoordinates();
            var elapsedTime = frameState.time - feature.get('start');
            var elapsedPoints = elapsedTime * pointsPerMs;

            if (elapsedPoints >= coords.length) {
              feature.set('finished', true);
            }

            var maxIndex = Math.min(elapsedPoints, coords.length);
            var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex));

            // directly draw the line with the vector context
            vectorContext.drawGeometry(currentLine);
          }
        }
        // tell OpenLayers to continue the animation
        map.render();
      };

      flightsSource = new ol.source.Vector({
        wrapX: false,
        loader: function() {
            var flightsData = [
              [[43.449928,39.956589],[55.606186,49.278728],[66.606186,50.278728]],
              [[55.34,52.06],[45.034689,39.170539],[60.034689,50.170539]]
            ];
            for (var i = 0; i < flightsData.length; i++) {
              var flight = flightsData[i];
              var from = flight[0];
              var to = flight[1];

              var arcGenerator = new arc.GreatCircle(
                  {x: from[1], y: from[0]},
                  {x: to[1], y: to[0]});

              var arcLine = arcGenerator.Arc(100, {offset: 10});
              if (arcLine.geometries.length === 1) {
                var line = new ol.geom.LineString(arcLine.geometries[0].coords);
                line.transform(ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));

                var feature = new ol.Feature({
                  geometry: line,
                  finished: false
                });
                addLater(feature, i * 50);
              }
            }
            map.on('postcompose', animateFlights);
        }
      });

      var flightsLayer = new ol.layer.Vector({
        source: flightsSource,
        style: function(feature) {
          if (feature.get('finished')) {
            return style;
          } else {
            return null;
          }
        }
      });
      map.addLayer(flightsLayer);
    },
    /*画光圈——数组*/
    drawAperture(dataArry){
      var source = new ol.source.Vector({
        wrapX: false
      });
      var vector = new ol.layer.Vector({
        id:'Aperture',
        source: source
      });
      map.addLayer(vector);

      function addRandomFeature() {
        var geom = new ol.geom.Point(ol.proj.transform([90, 38],
            'EPSG:4326', 'EPSG:3857'));
        var feature = new ol.Feature(geom);
        source.addFeature(feature);
        flash(feature)

      }

      var duration = 3000;
      function flash(feature) {
        var start = new Date().getTime();
        var listenerKey;

        function animate(event) {
          var vectorContext = event.vectorContext;
          var frameState = event.frameState;
          var flashGeom = feature.getGeometry().clone();
          var elapsed = frameState.time - start;
          var elapsedRatio = elapsed / duration;
          var radius = ol.easing.easeOut(elapsedRatio) * 25 + 5;
          var opacity = ol.easing.easeOut(1 - elapsedRatio);

          var style = new ol.style.Style({
            image: new ol.style.Circle({
              radius: radius,
              snapToPixel: false,
              stroke: new ol.style.Stroke({
                color: 'rgba(255, 0, 0, ' + opacity + ')',
                width: 0.25 + opacity
              })
            })
          });

          vectorContext.setStyle(style);
          vectorContext.drawGeometry(flashGeom);
          if (elapsed > duration) {
            ol.Observable.unByKey(listenerKey);//移除监听事件
            //循环播放
            addRandomFeature();
            return ;
          }
          map.render();
        }
        listenerKey = map.on('postcompose', animate);
      }
      // source.on('addfeature', function(e) {
      //   flash(e.feature);
      // });
      addRandomFeature();
    },
    /*画飞机移动*/
    DrawAirplan(data){
      
      var routeCoords = json;
      var routeLength = routeCoords.length;
      //飞机
      var geoMarker = new ol.Feature({
        type: 'geoMarker',
        geometry: new ol.geom.Point(routeCoords[0])
      });
      //起点
      var startMarker = new ol.Feature({
        type: 'icon',
        geometry: new ol.geom.Point(routeCoords[0])
      });
      //终点
      var endMarker = new ol.Feature({
        type: 'icon',
        geometry: new ol.geom.Point(routeCoords[routeLength - 1])
      });
      let styles = (type,index)=>{
        let styles = {
          'route': new ol.style.Style({
            stroke: new ol.style.Stroke({
              width: 6, color: [237, 212, 0, 0.8]
            })
          }),
          'icon': new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [0.5, 1],
              src: 'https://openlayers.org/en/v4.6.4/examples/data/icon.png'
            })
          }),
          'geoMarker': new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [0.5, 1],
              src: 'static/image/plan.png'
            })
          })
        };
        return styles[type]
      }
      
      var animating = false;
      var speed, now;

      var vectorLayer = new ol.layer.Vector({
        id:'',
        source: new ol.source.Vector({
          features: [geoMarker]
        }),
        style: function(feature) {
          // hide geoMarker if animation is active
          // if (animating && feature.get('type') === 'geoMarker') {
          //   return null;
          // }
          return styles(feature.get('type'));
        }
      });
      map.addLayer(vectorLayer);

      var moveFeature = function(event) {
        var vectorContext = event.vectorContext;
        var frameState = event.frameState;

        if (animating) {

          var elapsedTime = frameState.time - now;
          // here the trick to increase speed is to jump some indexes
          // on lineString coordinates
          var index = Math.round(speed * elapsedTime / 1000);

          if (index >= routeLength) {
            stopAnimation(true);
            return;
          }

          var currentPoint = new ol.geom.Point(routeCoords[index]);
          var planfeature = new ol.Feature(currentPoint);

          let position = routeCoords[index];
          let lastposition = index==0?[0,0]:routeCoords[index-1];
          var rotation = Math.atan2(position[1]-lastposition[1], position[0]-lastposition[0]);
          let style = new ol.style.Style({
            //飞机图片
            image: new ol.style.Icon({
              anchor: [0.5, 0.5],
              src: 'static/image/plan.png',
              rotateWithView: true,
              rotation: -rotation//旋转角度
            })
          })

          vectorContext.drawFeature(planfeature, style);
          //发波
          debugger
          objInstance.drawSector(position,50,100,100,50);//经纬度，方位角度，半径，弧度（[137,37],50,100,100,50）

        }
        // tell OpenLayers to continue the postcompose animation
        map.render();
      };

      function startAnimation() {
        if (animating) {
          stopAnimation(false);
        } else {
          animating = true;
          now = new Date().getTime();
          speed = 10;
          // hide geoMarker
          geoMarker.setStyle(null);
          // just in case you pan somewhere else
          map.on('postcompose', moveFeature);
          map.render();
        }
      }

      /**
       * @param {boolean} ended end of animation.
       */
      function stopAnimation(ended) {
        animating = false;

        // if animation cancelled set the marker at the beginning
        var coord = ended ? routeCoords[routeLength - 1] : routeCoords[0];
        (geoMarker.getGeometry()).setCoordinates(coord);
        //remove listener
        map.un('postcompose', moveFeature);
      }

      startAnimation();

    },
    /*地图飞到某点*/
    mapFly(position,callback={}){
      var duration = 2000;
      var zoom = view.getZoom();
      view.animate({
        center: ol.proj.fromLonLat(position),
        duration: duration
      }, callback);
      view.animate({
        zoom: zoom - 1,
        duration: duration / 2
      }, {
        zoom: zoom,
        duration: duration / 2
      }, callback);
    },
    /*添加静态设施*/
    drawStatic(jsonObj){
      jsonObj = jsonObj || [
        {
          name:'北京市',
          population:'11',
          lx:'0',//图片类型
          zy:'1',//阵营
          lon:'116.46',
          lat:'39.92'
        }
      ]
      /*设置静态设施样式*/
      let createLabelStyle = feature=>{
        return new ol.style.Style({
          image:new ol.style.Icon(({
            anchor: [0.5, 50],//偏离原来左
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src:iconUrl.tower.url
          })),
          text:new ol.style.Text({
            textAlign:'center',
            textBaseline:'middle',
            text:feature.get('name'),
            fill:new ol.style.Fill({color:()=>{
              return feature.get('zy') == '0'?'#a30':'#9FF'
            }}),//字体颜色
            stroke: new ol.style.Stroke({color:'#ffcc33',width:3})
          })
        })
      };
      let vectorSource = new ol.source.Vector({
        wrapX: false,
        features:[]
      });

      jsonObj.forEach(item=>{
        let point = ol.proj.fromLonLat([parseFloat(item.lon),parseFloat(item.lat)])
        let iconFeature = new ol.Feature({
          geometry:new ol.geom.Point(point),
          name:item.name,
          population:item.population,
          lx:item.lx,
          zy:item.zy
        });

        iconFeature.setStyle(createLabelStyle(iconFeature));
        iconFeature.on("click", function(e) {
          alert(111)
        });
        vectorSource.addFeature(iconFeature)
      })
      let staticLayer = new ol.layer.Vector({
        id:'',
        source:vectorSource
      });
      map.addLayer(staticLayer);
    },
    //画航迹点（未完成）
    draline(){
      let draw; // global so we can remove it later
      draw = new ol.interaction.Draw({
        source: source,
        type: typeSelect.LineString
      });
      map.addInteraction(draw);
    },
    //通过id删除layers
    removeLayer(ids){//ids为id数组
      let layers = map.getLayers();
      layers.forEach(item=>{
        ids.forEach(id=>{
          if(id == item.get('id')){
            map.removeLayer(item);
          }
        })
      })
    },
    //画扇形波
    drawSector(position,azimuth,optrange,lobewith){//经纬度，方位角度，半径，弧度（[137,37],50,100,100,50）
      azimuth = azimuth - lobewith/2;
      var calc = function(step){
        /*计算扇形点---start*/
         let points = [formatLonLat(position)];
         let delta = optrange/6371/step;

         let stepazi = 1;

         let lat1 = position[1]*Math.PI/180;
         let lng1 = position[0]*Math.PI/180;

         let steps = parseInt(lobewith/1);
         for(let i=0;i<=steps;i++){
           let azitemp = (azimuth+stepazi*i)*Math.PI/180;
           let lat = Math.asin(Math.sin(lat1)*Math.cos(delta)+Math.cos(lat1)*Math.sin(delta)*Math.cos(azitemp));
           let lng = lng1+Math.atan2(Math.sin(azitemp)*Math.sin(delta)*Math.cos(lat1),Math.cos(delta)-Math.sin(lat1)*Math.sin(lat));
           points.push(formatLonLat([lng*180/Math.PI,lat*180/Math.PI]))
         }
         points.push(formatLonLat(position));
         return points
        /*计算扇形点---end*/
      }

      var vectorSource= new ol.source.Vector({
          wrapX: false,
          features: [ ]
        });

       var vectorLayer = new ol.layer.Vector({
              source: vectorSource
          });
       var feature = new ol.Feature({
          geometry: new ol.geom.Polygon([calc(5)])
        });
        vectorSource.addFeature(feature)

       function flash(feature) {
        let endstep = 5;

        var listenerKey;
        function animate(event) {
          endstep--;
          var frameState = event.frameState;
          var flashGeom = feature.getGeometry();
          let nodes = calc(endstep);
          flashGeom.setCoordinates([nodes])

          if (endstep < 1) {
            ol.Observable.unByKey(listenerKey);//移除监听事件
            return ;
          }
          map.render();
        }

        listenerKey = map.on('postcompose', animate);
      }

      map.addLayer(vectorLayer);
      //初始化动画
      flash(feature);
    }
  }
  return objInstance;
}

module.exports = {
  initMap
}
