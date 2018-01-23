const config = require('../static/config')//引入配置文件
let mainmap;
var polyline = [
  'hldhx@lnau`BCG_EaC??cFjAwDjF??uBlKMd@}@z@??aC^yk@z_@se@b[wFdE??wFfE}N',
  'fIoGxB_I\\gG}@eHoCyTmPqGaBaHOoD\\??yVrGotA|N??o[N_STiwAtEmHGeHcAkiA}^',
  'aMyBiHOkFNoI`CcVvM??gG^gF_@iJwC??eCcA]OoL}DwFyCaCgCcCwDcGwHsSoX??wI_E',
  'kUFmq@hBiOqBgTwS??iYse@gYq\\cp@ce@{vA}s@csJqaE}{@iRaqE{lBeRoIwd@_T{]_',
  'Ngn@{PmhEwaA{SeF_u@kQuyAw]wQeEgtAsZ}LiCarAkVwI}D??_}RcjEinPspDwSqCgs@',
  'sPua@_OkXaMeT_Nwk@ob@gV}TiYs[uTwXoNmT{Uyb@wNg]{Nqa@oDgNeJu_@_G}YsFw]k',
  'DuZyDmm@i_@uyIJe~@jCg|@nGiv@zUi_BfNqaAvIow@dEed@dCcf@r@qz@Egs@{Acu@mC',
  'um@yIey@gGig@cK_m@aSku@qRil@we@{mAeTej@}Tkz@cLgr@aHko@qOmcEaJw~C{w@ka',
  'i@qBchBq@kmBS{kDnBscBnFu_Dbc@_~QHeU`IuyDrC_}@bByp@fCyoA?qMbD}{AIkeAgB',
  'k_A_A{UsDke@gFej@qH{o@qGgb@qH{`@mMgm@uQus@kL{_@yOmd@ymBgwE}x@ouBwtA__',
  'DuhEgaKuWct@gp@cnBii@mlBa_@}|Asj@qrCg^eaC}L{dAaJ_aAiOyjByH{nAuYu`GsAw',
  'Xyn@ywMyOyqD{_@cfIcDe}@y@aeBJmwA`CkiAbFkhBlTgdDdPyiB`W}xDnSa}DbJyhCrX',
  'itAhT}x@bE}Z_@qW_Kwv@qKaaAiBgXvIm}A~JovAxCqW~WanB`XewBbK{_A`K}fBvAmi@',
  'xBycBeCauBoF}}@qJioAww@gjHaPopA_NurAyJku@uGmi@cDs[eRaiBkQstAsQkcByNma',
  'CsK_uBcJgbEw@gkB_@ypEqDoqSm@eZcDwjBoGw`BoMegBaU_`Ce_@_uBqb@ytBwkFqiT_',
  'fAqfEwe@mfCka@_eC_UmlB}MmaBeWkkDeHwqAoX}~DcBsZmLcxBqOwqE_DkyAuJmrJ\\o',
  '~CfIewG|YibQxBssB?es@qGciA}RorAoVajA_nAodD{[y`AgPqp@mKwr@ms@umEaW{dAm',
  'b@umAw|@ojBwzDaaJsmBwbEgdCsrFqhAihDquAi`Fux@}_Dui@_eB_u@guCuyAuiHukA_',
  'lKszAu|OmaA{wKm}@clHs_A_rEahCssKo\\sgBsSglAqk@yvDcS_wAyTwpBmPc|BwZknF',
  'oFscB_GsaDiZmyMyLgtHgQonHqT{hKaPg}Dqq@m~Hym@c`EuiBudIabB{hF{pWifx@snA',
  'w`GkFyVqf@y~BkoAi}Lel@wtc@}`@oaXi_C}pZsi@eqGsSuqJ|Lqeb@e]kgPcaAu}SkDw',
  'zGhn@gjYh\\qlNZovJieBqja@ed@siO{[ol\\kCmjMe\\isHorCmec@uLebB}EqiBaCg}',
  '@m@qwHrT_vFps@kkI`uAszIrpHuzYxx@e{Crw@kpDhN{wBtQarDy@knFgP_yCu\\wyCwy',
  'A{kHo~@omEoYmoDaEcPiuAosDagD}rO{{AsyEihCayFilLaiUqm@_bAumFo}DgqA_uByi',
  '@swC~AkzDlhA}xEvcBa}Cxk@ql@`rAo|@~bBq{@``Bye@djDww@z_C_cAtn@ye@nfC_eC',
  '|gGahH~s@w}@``Fi~FpnAooC|u@wlEaEedRlYkrPvKerBfYs}Arg@m}AtrCkzElw@gjBb',
  'h@woBhR{gCwGkgCc[wtCuOapAcFoh@uBy[yBgr@c@iq@o@wvEv@sp@`FajBfCaq@fIipA',
  'dy@ewJlUc`ExGuaBdEmbBpBssArAuqBBg}@s@g{AkB{bBif@_bYmC}r@kDgm@sPq_BuJ_',
  's@{X_{AsK_d@eM{d@wVgx@oWcu@??aDmOkNia@wFoSmDyMyCkPiBePwAob@XcQ|@oNdCo',
  'SfFwXhEmOnLi\\lbAulB`X_d@|k@au@bc@oc@bqC}{BhwDgcD`l@ed@??bL{G|a@eTje@',
  'oS~]cLr~Bgh@|b@}Jv}EieAlv@sPluD{z@nzA_]`|KchCtd@sPvb@wSb{@ko@f`RooQ~e',
  '[upZbuIolI|gFafFzu@iq@nMmJ|OeJn^{Qjh@yQhc@uJ~j@iGdd@kAp~BkBxO{@|QsAfY',
  'gEtYiGd]}Jpd@wRhVoNzNeK`j@ce@vgK}cJnSoSzQkVvUm^rSgc@`Uql@xIq\\vIgg@~k',
  'Dyq[nIir@jNoq@xNwc@fYik@tk@su@neB}uBhqEesFjoGeyHtCoD|D}Ed|@ctAbIuOzqB',
  '_}D~NgY`\\um@v[gm@v{Cw`G`w@o{AdjAwzBh{C}`Gpp@ypAxn@}mAfz@{bBbNia@??jI',
  'ab@`CuOlC}YnAcV`@_^m@aeB}@yk@YuTuBg^uCkZiGk\\yGeY}Lu_@oOsZiTe[uWi[sl@',
  'mo@soAauAsrBgzBqgAglAyd@ig@asAcyAklA}qAwHkGi{@s~@goAmsAyDeEirB_{B}IsJ',
  'uEeFymAssAkdAmhAyTcVkFeEoKiH}l@kp@wg@sj@ku@ey@uh@kj@}EsFmG}Jk^_r@_f@m',
  '~@ym@yjA??a@cFd@kBrCgDbAUnAcBhAyAdk@et@??kF}D??OL'
].join('');

var route = /** @type {ol.geom.LineString} */ (new ol.format.Polyline({
  factor: 1e6
}).readGeometry(polyline, {
  dataProjection: 'EPSG:4326',
  featureProjection: 'EPSG:3857'
}));

var routeCoords = route.getCoordinates();
var routeLength = routeCoords.length;

var routeFeature = new ol.Feature({
  type: 'route',
  geometry: route
});
var geoMarker = new ol.Feature({
  type: 'geoMarker',
  geometry: new ol.geom.Point(routeCoords[0])
});
var startMarker = new ol.Feature({
  type: 'icon',
  geometry: new ol.geom.Point(routeCoords[0])
});
var endMarker = new ol.Feature({
  type: 'icon',
  geometry: new ol.geom.Point(routeCoords[routeLength - 1])
});

var styles = {
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
    image: new ol.style.Circle({
      radius: 7,
      snapToPixel: false,
      fill: new ol.style.Fill({color: 'black'}),
      stroke: new ol.style.Stroke({
        color: 'white', width: 2
      })
    })
  })
};

var animating = false;
var speed, now;
var speedInput = document.getElementById('speed');
var startButton = document.getElementById('start-animation');

var vectorLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [routeFeature, geoMarker, startMarker, endMarker]
  }),
  style: function(feature) {
    // hide geoMarker if animation is active
    if (animating && feature.get('type') === 'geoMarker') {
      return null;
    }
    return styles[feature.get('type')];
  }
});

var center = [-5639523.95, -3501274.52];
var map = new ol.Map({
  target: document.getElementById('map'),
  loadTilesWhileAnimating: true,
  view: new ol.View({
    center: center,
    zoom: 10,
    minZoom: 2,
    maxZoom: 19
  }),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.BingMaps({
        imagerySet: 'AerialWithLabels',
        key: 'Your Bing Maps Key from http://www.bingmapsportal.com/ here'
      })
    }),
    vectorLayer
  ]
});
module.exports =  {
  initMap :(id)=>{
    // 初始化地图参数
    mainmap = new ol.Map({
        target: id,// DOM中地图容器的id 
        layers: [new ol.layer.Tile({
            // source:new ol.source.XYZ({
            //   // 设置本地离线瓦片所在路径，由于例子里面只有一张瓦片，页面显示时就只看得到一张瓦片。
            //   url: config.mapUrl+'/{z}/{x}/{y}.png'
            // })
            // source: new ol.source.OSM()
            visible: false,
            preload: Infinity,
            source: new ol.source.BingMaps({
              key: 'Your Bing Maps Key from http://www.bingmapsportal.com/ here',
              imagerySet: 'Aerial',
              maxZoom: 19
            })
        })],// 图层可以在地图初始化一起进行初始化也可以后期通过addLayer方法进行添加
        controls: ol.control.defaults({
          attributionOptions: {
            collapsible: true
          }
        }),
        view:new ol.View({   // 视图
          center:ol.proj.transform([104.06667, 30.66667], 'EPSG:4326', 'EPSG:3857'),// 设置地图中心坐标点
          projection: 'EPSG:4326',
          zoom:8,// 设置初始化显示层级
          minZoom:7,// 最小显示层级
          maxZoom:14 // 最大显示层级
        })
    });
  }
}