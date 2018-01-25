const config = require('../static/config')//引入配置文件
let map
function initMap(id){
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
          // new ol.layer.Tile({
          //   source: new ol.source.OSM()
          // })
          //使用bing地图
          new ol.layer.Tile({
            source: new ol.source.BingMaps({
                  key: 'AgiU9gCjKNfaR2yFSDfLw8e9zUlAYisRvRC2_L-LsGYN2bII5ZUvorfP3QJvxmjn', //自己申请的key
                  imagerySet: 'Aerial'
              })
          }),
        ], // 图层可以在地图初始化一起进行初始化也可以后期通过addLayer方法进行添加
        controls: ol.control.defaults().extend([
          new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326',
            // className: 'custom-mouse-position',  
            // target: document.getElementById('mouse-position'),  
          })
        ]),
        view:new ol.View({   // 视图
          center:ol.proj.transform([104.06667, 30.66667], 'EPSG:4326', 'EPSG:3857'),// 设置地图中心坐标点
          zoom:6
          // extent:[mapExtent[1]-0.0001,mapExtent[0]-0.0001,mapExtent[3]+0.0001,mapExtent[2]+0.0001]  
        }),
    });
    map.on('pointermove', function (e) {
            let a=ol.proj.transform(e.pixel, 'EPSG:3857', 'EPSG:4326')
            console.log(a)
     //         var pixel = new ol.Pixel(e.xy.x,e.xy.y);
     //         var lonlat = map.getLonLatFromPixel(pixel);
     //         lonlat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326")); //由900913坐标系转为4326
     // 　　　 console.log(lonlat.lon+", "+lonlat.lat);
     })
    return map;
  }
  var map = newmap(id);
  
  objInstance={
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
        window.setTimeout(function() {
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
            var flightsData = [[[43.449928,39.956589],[55.606186,49.278728]],[[55.34,52.06],[45.034689,39.170539]]];
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
        source: source
      });
      map.addLayer(vector);

      function addRandomFeature() {
        var geom = new ol.geom.Point(ol.proj.transform([90, 38],
            'EPSG:4326', 'EPSG:3857'));
        var feature = new ol.Feature(geom);
        source.addFeature(feature);
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
            ol.Observable.unByKey(listenerKey);
            return;
          }
          map.render();
        }
        listenerKey = map.on('postcompose', animate);
      }

      source.on('addfeature', function(e) {
        flash(e.feature);
      });

      window.setInterval(addRandomFeature, 1000);
    }
  }
  return objInstance;
}

module.exports = {
  initMap
}
