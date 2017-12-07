/**
 * 百度地图展示目标点的简单插件,需在HTML中引入百度地图APi
 * @method
 * @return {[type]} [description]
 */
;(function(){

  //单例模式,只创建一个对象
  var singleMap = (function(){
    var instance = null;

    return function(dotData){
      if(!instance){
        instance = new mapDot(dotData);
      }
      //如果被隐藏，则展示
      if(document.getElementById('mapwrapper') && document.getElementById('mapwrapper').style.display === 'none'){
        document.getElementById('mapwrapper').style.display = 'flex';
      }
      return instance;
    };
  })();

  var mapDot = function(dotData){

    //默认参数
    var defaultSetting = {
      data : [],
      mapLevel : 5,
      icon : {},
      showInfo : true,
      infoWindow : {
        style : "font-size: 14px",
        title : "详细信息"
      },
      markAnimation : 'dance',
      getLocation : false
    };

    //合并参数
    this.settings = Object.assign({},defaultSetting,dotData);   //ES6方法 旧浏览器不支持


    //默认配置 已珠海总部为中心
    this.longitude = 113.5029;
    this.latitude =22.2407;

    this.markShowType = this.settings.markAnimation === 'drop'?BMAP_ANIMATION_DROP:this.settings.markAnimation === 'dance'?BMAP_ANIMATION_BOUNCE:false;
    console.log(this.markShowType);

    this._initMapContainer();
  };

  mapDot.prototype = {
    _initMapContainer : function(){

        var mapWrapper = document.createElement('div'),
            mapContainer = document.createElement('div');

        //新增地图包裹
        mapWrapper.setAttribute('id','mapwrapper');
        mapWrapper.style.cssText = "display:flex;position:fixed;width:100vw;height:100vh;top:0vh;left:0vw;background-color: rgba(29, 33, 33,0.5);z-index:10;transition: all 0.5 ease;cursor: pointer;";
        mapWrapper.addEventListener('click',function(e){
          event = e||window.event;
          e.stopPropagation();

          //隐藏地图
          this.style.display = "none";
        });

        //新增地图容器
        mapContainer.setAttribute('id','mapcontainer');
        mapContainer.style.cssText = "margin: auto;width: 80vw;height: 80vh;box-sizing: border-box;border-radius: 10px;z-index: 20;";
        mapWrapper.appendChild(mapContainer);

        mapContainer.addEventListener('click',function(e){
          //防止冒泡
          event = e||window.event;
          e.stopPropagation();
        });
        document.body.appendChild(mapWrapper);

        //增加地图包裹及容器后，初始化地图
        if(this.settings.getLocation){
          this._getPosition();
        }else {
          this._initMap();
        }
    },
    _getPosition : function(){
      var self = this;
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          self.longitude = position.longitude;
          self.altitude = position.longitude;

          self._initMap();
        },function(PositionError){
          switch (PositionError.code) {
            case 1:
                alert("位置服务被拒绝");
            break;

            case 2:
                alert("暂时获取不到位置信息");
            break;

            case 3:
                alert("获取信息超时");
            break;

            case 4:
                alert("未知错误");
            break;
          }

          self._initMap();
        },{
          //允许使用高精度定位方式
          enableHighAccuracy : true,
          //超时时间
          timeout : 20000,
          //获取到的位置的缓存时间
          maximum : 20000
        });
      }else {
        self._initMap();
      }
    },
    _initMap : function(){
      var self = this;
      var map = new BMap.Map('mapcontainer');
      map.centerAndZoom(new BMap.Point(this.longitude, this.latitude), this.settings.mapLevel);
      map.enableScrollWheelZoom();

      //平移缩放控件
      var navigationControl = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        enableGeolocation: true,
        showZoomInfo:true
      });
      map.addControl(navigationControl);


      //地图定位控件
      var geolocationControl = new BMap.GeolocationControl();
      geolocationControl.addEventListener("locationSuccess", function(e){
        //定位成功后时间
      });
      geolocationControl.addEventListener("locationError",function(e){
        alert(e.message);
      });

      map.addControl(geolocationControl);

      if(this.settings.data.length > 0){
        this.settings.data.forEach(function(value,index){

          //mark 表示地图上的一个标注
          var point = new BMap.Point(value.longitude,value.latitude);
          var mark = new BMap.Marker(point,{
              enableClicking : true,
              title : value.dotName,
              shadow : true
              });
          if(self.settings.icon.url){
            mark = new BMap.Marker(new BMap.Point(value.longitude,value.latitude),{
                enableClicking : true,
                title : value.dotName,
                shadow : true,
                icon : new BMap.Icon(self.settings.icon.url,new BMap.Size(self.settings.icon.width,self.settings.icon.height))  //自定义icon
                });
          }

          console.log(self);
          if(self.markShowType){
            console.log(1);
            mark.setAnimation(self.markShowType);
          }

          if(self.settings.showInfo){
            //信息窗
            var div = document.createElement('div');
            div.innerHTML = '<p><span>店名 ： </span>' + value.dotName +'</p><p><span>地址 ： </span>' + value.address + '</p><p><span>洗衣机数量 ： </span> ' + value.deviceAmount+ '</p><p><span>联系电话 ： </span>'+ value.tel +'</p><p><span>运营商ID ： </span>'+ value.traderId+'</p>';
            div.style.cssText = self.settings.infoWindow.style;
            var infoWindow = new BMap.InfoWindow(div,{
              title : '<h3 style="text-align : center">'+self.settings.infoWindow.title+'</h3>'
            });
            mark.addEventListener('click',function(){
              map.openInfoWindow(infoWindow,point);
            });
          }

          map.addOverlay(mark);
        });
      }
    }
  };

  //注册插件对象
  window.singleMap = singleMap;
})();
