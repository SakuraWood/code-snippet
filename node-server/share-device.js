var express = require('express');
var app = express();

app.all('*', function(req, res, next) { //允许跨域
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); //让options请求快速返回
  } else {
    next();
  }
});

app.post('/addWashShopPost', function(req, res) {
  res.send({
    "t": "vNewDot",
    "data": {
      "dotId": "123456" //设备点编号
    },
    "r": "00000",
    "msg": "操作成功",
    "sysTime": 1496390027969
  });
});

app.post('/getDotList', function(req, res) {
  res.send({
    "t": "vDotList",
    "data": [{
        "traderId": "88", //所属运营商
        "dotId": "878", //设备点id
        "dotName": "逗号公寓珠海柠溪路店", //设备点的名字
        "dotType": "XY01", //设备点的类型，目前分洗衣机（XY01），洗车机（XC01）两种类型。前面的两位英文和设备的uuid两位英文相同
        "address": "珠海市香洲区柠溪路338号莫泰酒店7楼", //地址信息
        "location": "逗号公寓7楼", //位置信息，具体到几楼、房间号
        "deviceAmount": "7", //设备数量

        "spareDeviceNum": "4", //空闲设备数
        "tel": "18888888888", //管理员联系电话
        "isKeep": "0", //是否收藏
        "latitude": "22.271008", //纬度
        "longitude": "113.567912", //精度
        "bookTime": "10" //预约可以保留时间
      },
      {
        "traderId": "88", //所属运营商
        "dotId": "878", //设备点id
        "dotName": "逗号公寓珠海柠溪路店逗号公寓珠海柠溪路店逗号公寓珠海柠溪路店逗号公寓珠海柠溪路店逗号公寓珠海柠溪路店", //设备点的名字
        "dotType": "XC01", //设备点的类型，目前分洗衣机（XY01），洗车机（XC01）两种类型。前面的两位英文和设备的uuid两位英文相同
        "address": "珠海市香洲区柠溪路338号莫泰酒店7楼", //地址信息
        "location": "逗号公寓7楼", //位置信息，具体到几楼、房间号
        "deviceAmount": "9", //设备数量

        "spareDeviceNum": "4", //空闲设备数
        "tel": "18888888888", //管理员联系电话
        "isKeep": "0", //是否收藏
        "latitude": "22.271008", //纬度
        "longitude": "113.567912", //精度
        "bookTime": "10" //预约可以保留时间
      },
      {
        "traderId": "88", //所属运营商
        "dotId": "878", //设备点id
        "dotName": "逗号公寓珠海柠溪路店", //设备点的名字
        "dotType": "XY01", //设备点的类型，目前分洗衣机（XY01），洗车机（XC01）两种类型。前面的两位英文和设备的uuid两位英文相同
        "address": "珠海市香洲区柠溪路338号莫泰酒店7楼", //地址信息
        "location": "逗号公寓7楼", //位置信息，具体到几楼、房间号
        "deviceAmount": "7", //设备数量

        "spareDeviceNum": "12", //空闲设备数
        "tel": "18888888888", //管理员联系电话
        "isKeep": "0", //是否收藏
        "latitude": "22.271008", //纬度
        "longitude": "113.567912", //精度
        "bookTime": "10" //预约可以保留时间
      },
      {
        "traderId": "88", //所属运营商
        "dotId": "878", //设备点id
        "dotName": "格力花园店", //设备点的名字
        "dotType": "XC01", //设备点的类型，目前分洗衣机（XY01），洗车机（XC01）两种类型。前面的两位英文和设备的uuid两位英文相同
        "address": "珠海市香洲区柠溪路338号莫泰酒店7楼", //地址信息
        "location": "逗号公寓7楼", //位置信息，具体到几楼、房间号
        "deviceAmount": "11", //设备数量

        "spareDeviceNum": "4", //空闲设备数
        "tel": "18888888888", //管理员联系电话
        "isKeep": "0", //是否收藏
        "latitude": "22.271008", //纬度
        "longitude": "113.567912", //精度
        "bookTime": "10" //预约可以保留时间
      }
    ],
    "r": "00000",
    "msg": "操作成功",
    "sysTime": 1496390027969
  });
});

app.post('/getDotInfo', function(req, res) {
  res.send({
    "t": "vDotInfo",
    "data": {
      "dotInfo": {
        "traderId": "88", //所属运营商
        "dotId": "878", //设备点id
        "dotName": "逗号公寓珠海柠溪路店", //设备点的名字
        "address": "珠海市香洲区柠溪路338号莫泰酒店7楼", //地址信息
        "location": "逗号公寓7楼", //位置信息，具体到几楼、房间号
        "dotType": "XY01", //新建设备点需要设置设备点的设备类型
        "deviceAmount": "3", //设备数量
        "spareDeviceNum": "4", //空闲设备数
        "tel": "18888888888", //管理员联系电话
        "isKeep": "0", //是否收藏
        "latitude": "22.271008", //纬度
        "longitude": "113.567912", //精度
        "bookTime": "10" //预约可以保留时间
      },
      "deviceList": [{
          "uuid": "xy14781", //设备id
          "mid": "1010", //设备类型
          "typeName": "设备名称", //机型名
          "typeSerial": "SXB60-1U1", //机型编号
          "position": "07F-U02", //设备编号，在当前设备点，由用户输入

        },
        {
          "uuid": "xc14782", //设备id
          "mid": "1011", //设备类型
          "typeName": "设备名称", //机型名
          "typeSerial": "SXB60-1U1", //机型编号
          "position": "07F-U02", //设备编号，在当前设备点，由用户输入

        },
        {
          "uuid": "xy14783", //设备id
          "mid": "1012", //设备类型
          "typeName": "设备名称", //机型名
          "typeSerial": "SXB60-1U1", //机型编号
          "position": "07F-U02", //设备编号，在当前设备点，由用户输入

        }
      ]

    },
    "r": "00000",
    "msg": "操作成功",
    "sysTime": 1496390027969
  });
});

app.post('/washShopInfoPost', function(req, res) {
  res.send({
      "t": "vDotInfo",
      "data": {
        "dotInfo": {
          "traderId": "88", //所属运营商
          "dotId": "878", //设备点id
          "dotName": "逗号公寓珠海柠溪路店", //设备点的名字
          "address": "珠海市香洲区柠溪路338号莫泰酒店7楼", //地址信息
          "location": "逗号公寓7楼", //位置信息，具体到几楼、房间号
          "dotType": "XY01", //新建设备点需要设置设备点的设备类型
          "deviceAmount": "3", //设备数量

          "spareDeviceNum": "4", //空闲设备数
          "tel": "18888888888", //管理员联系电话
          "isKeep": "0", //是否收藏
          "latitude": "22.271008", //纬度
          "longitude": "113.567912", //精度
          "bookTime": "10" //预约可以保留时间
        },
        "deviceList": [{
            "uuid": "1478", //设备id
            "mid": "1010", //设备类型
            "typeName": "设备名称", //机型名
            "typeSerial": "SXB60-1U1", //机型编号
            "position": "07F-U02", //设备编号，在当前设备点，由用户输入
            "timeLeft": "0", //当前状态剩余时间
            "doClean": "0",
            "washStatus": "001"
          },
          {
            "uuid": "1478", //设备id
            "mid": "1010", //设备类型
            "typeName": "设备名称", //机型名
            "typeSerial": "SXB60-1U1", //机型编号
            "position": "07F-U02", //设备编号，在当前设备点，由用户输入
            "timeLeft": "0", //当前状态剩余时间
            "doClean": "0",
            "washStatus": "001"
          },
        ]

      },
      "r": "00000",
      "msg": "操作成功",
      "sysTime": 1496390027969
    }

  );
});

app.post('/bindWash', function(req, res) {
  res.send({
    "t": "bind",
    "data": {},
    "r": "00000",
    "msg": "操作成功",
    "sysTime": 1496390027969
  });
});

app.delete('/delete', function(req, res) {
  res.send({
    "data": {
    },
    "r": "10001",
    "msg": "操作成功",
    "sysTime": 1496390027969
  });
});

app.post('/checkPre', function(req, res) {
  res.send({
    "t": "vCheckPre",
    "data": {
      "dotId": "878", //设备点id
      "dotName": "逗号公寓珠海柠溪路店", //设备点的名字

    },
    "r": "00000",
    "msg": "操作成功",
    "sysTime": 1496390027969
  });
});

app.post('/historyMsg', function(req, res) {
  res.send({
    "data":[
      {
        "type":"manage",
        "msg":"收到了管理员申请",
        "msgId":"123",//一个账号主体下的信息计数
        "msgTime":"324213421414",//推送发生的时间
        "msgState":"5",//是否获取过该消息
        "ext":{
          //*******************************
            //02表示管理员申请提醒，只是针对运营商的
            "venderName":"xxxx分店",//推荐些写为xxx分店
            "idCardName":"身份证名字",
            "idCardNum":"123654788544125587",//身份证号
            "tel":"18888888888",//默认是登录的手机号
            "isHandle":"1",//是否处理过该消息
        },
      }
    ],
    "r": "00000",
    "msg": "操作成功",
    "sysTime": 1496390027969
  });
});

app.post('/handleVerify', function(req, res) {
  setTimeout(function(){
    res.send({
      "r": "00000",
      "msg": "操作成功",
      "sysTime": 1496390027969
    });
  },2000)
});



var server = app.listen(8081, function() {
  console.log('服务器已启动!');
});
