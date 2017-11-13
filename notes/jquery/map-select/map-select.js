$(function(){

  //获取Dom
  var mapSelect = $('.map-select'),
      provinceArea = mapSelect.find('.province-area'),
      cityArea = mapSelect.find('.city-area'),
      districtArea = mapSelect.find('.district-area')

  //初始化数据
  var provinceData = [],
      cityData = [],
      districtData = [];

  var dataClone = $('<li class="data-item"></li>')
  $.ajax({
    dataType: "json",
    url: './data/location.json',
    success: function(data){ //json文件如果有格式问题或者有注释则不会进行回调
      var mapData = data.result;
      provinceData = mapData[0];
      cityData = mapData[1];
      districtData = mapData[2];
      initProvince()
      bindAddress()
    }
  })

  function bindAddress(){
    $('#address').on('click',function(){
      $('.map-select').slideDown()
    })
  }

  function initProvince(){
    var provinceDom = $('<ul class="province-data"></ul>')
    provinceData.map(function(value,index){
      if(value.cidx){
        provinceDom.append(dataClone.clone().data('city',value.cidx).text(value.fullname))
      }else {
        provinceDom.append(dataClone.clone().text(value.fullname))
      }
    })

    provinceDom.on('click','.data-item',function(e){
      e.preventDefault();
      e.stopPropagation();

      clearClass($(this),'active')

      cityArea.find('.city-data').remove()
      districtArea.find('.district-data').remove()

      if($(this).data('city')){
        var from = $(this).data('city')[0]
        var to = $(this).data('city')[1]

        var cityTemp = cityData.slice(from,to)
        showCity(cityTemp)
      }

    })

    provinceDom.appendTo(provinceArea)
  }

  function showCity(data){
    var cityDom = $('<ul class="city-data"></ul>')

    data.map(function(value,index){
      if(value.cidx){
        cityDom.append(dataClone.clone().data('district',value.cidx).text(value.fullname))
      }else {
        cityDom.append(dataClone.clone().text(value.fullname))
      }
    })

    cityDom.on('click','.data-item',function(e){
      e.preventDefault();
      e.stopPropagation();

      clearClass($(this),'active')


      districtArea.find('.district-data').remove()

      if($(this).data('district')){
        var from = $(this).data('district')[0]
        var to = $(this).data('district')[1]

        var districtTemp = districtData.slice(from,to)
        showDistrict(districtTemp)
      }else {
        showAddress('active')
      }
    })

    cityArea.append(cityDom)
  }


  function showDistrict(data){
    var districtDom = $('<ul class="district-data"></ul>')

    clearClass($(this),'active')

    data.map(function(value,index){
        districtDom.append(dataClone.clone().text(value.fullname))
    })

    districtDom.on('click','.data-item',function(e){
      e.preventDefault();
      e.stopPropagation();

      clearClass($(this),'active')
      showAddress('active')
    })


    districtArea.append(districtDom)
  }

  function clearClass(dom,str){
    dom.parent().find('.' + str).removeClass(str)
    dom.addClass(str)
  }


  function showAddress(str){
    var address = '';
    $('.map-select').find('.' + str).map(function(index,value){
      address += $(value).text()
    })
    console.log(address);
    $('#address').text(address)
    clearClass($('.map-select'),'active')
    $('.map-select').slideUp()
  }
})
