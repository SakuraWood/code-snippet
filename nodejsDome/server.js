var express = require('express');
var app = express();

//允许跨域
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});

app.post('/bindWash', function (req, res) {
   res.send({
     "t":"bind",
     "data":{
     },
     "r": "00000",
     "msg": "操作成功",
     "sysTime": 1496390027969
   });
});

app.post('/addWashShopPost', function (req, res) {
   res.send({
     "t":"vNewDot",
     "data":{
         "dotId":"testid123"//洗衣点编号
     },
     "r": "00000",
     "msg": "操作成功",
     "sysTime": 1496390027969
   });
});

app.post('/changeWashShopPost', function (req, res) {
   res.send({
     "t":"vModifyDot",
     "data":{
         "dotId":"testid123"//洗衣点编号
     },
     "r": "00000",
     "msg": "操作成功",
     "sysTime": 1496390027969
   });
});

app.post('/getDotList', function (req, res) {
   res.send(
     {
    "t":"vDotList",
    "data": [
			 {
            "traderId": "88",//所属运营商
            "dotId": "871",//洗衣点id
            "dotName": "逗号公寓e",//洗衣点的名字
            "address": "珠海市香洲区柠溪路338号莫泰酒店7楼",//地址信息
            "location": "逗号公寓7楼",//位置信息，具体到几楼、房间号
            "deviceAmount": "3",//洗衣机数量
            "dryerDeviceAmount": "1",//洗干衣机数量
            "spareDeviceNum": "4",//空闲设备数
            "tel": "18888888888",//管理员联系电话
            "isKeep": "0",//是否收藏
            "latitude": "21.271008",//纬度
            "longitude": "112.567912",//精度
            "bookTime": "10"//预约可以保留时间
        },
        {
            "traderId": "88",//所属运营商
            "dotId": "872",//洗衣点id
            "dotName": "逗号公寓f",//洗衣点的名字
            "address": "珠海市香洲区柠溪路338号莫泰酒店7楼",//地址信息
            "location": "逗号公寓7楼",//位置信息，具体到几楼、房间号
            "deviceAmount": "3",//洗衣机数量
            "dryerDeviceAmount": "1",//洗干衣机数量
            "spareDeviceNum": "4",//空闲设备数
            "tel": "18888888888",//管理员联系电话
            "isKeep": "0",//是否收藏
            "latitude": "22.271008",//纬度
                  "longitude": "113.567912",//精度
                  "bookTime": "10"//预约可以保留时间
              },
              {
                  "traderId": "88",//所属运营商
                  "dotId": "8738",//洗衣点id
                  "dotName": "逗号公寓珠海柠溪路店",//洗衣点的名字
                  "address": "珠海市香洲区柠溪路338号莫泰酒店7楼",//地址信息
                  "location": "逗号公寓7楼",//位置信息，具体到几楼、房间号
                  "deviceAmount": "3",//洗衣机数量
                  "dryerDeviceAmount": "1",//洗干衣机数量
                  "spareDeviceNum": "4",//空闲设备数
                  "tel": "18888888888",//管理员联系电话
                  "isKeep": "0",//是否收藏
                  "latitude": "21.271008",//纬度
                  "longitude": "112.567912",//精度
                  "bookTime": "10"//预约可以保留时间
              },
              {
                  "traderId": "88",//所属运营商
                  "dotId": "8718",//洗衣点id
                  "dotName": "逗号公寓q",//洗衣点的名字
                  "address": "珠海市香洲区柠溪路338号莫泰酒店7楼",//地址信息
                  "location": "逗号公寓7楼",//位置信息，具体到几楼、房间号
                  "deviceAmount": "3",//洗衣机数量
                  "dryerDeviceAmount": "1",//洗干衣机数量
                  "spareDeviceNum": "4",//空闲设备数
                  "tel": "18888888888",//管理员联系电话
                  "isKeep": "0",//是否收藏
                  "latitude": "22.271008",//纬度
                        "longitude": "113.567912",//精度
                        "bookTime": "10"//预约可以保留时间
                    },
                    {
                        "traderId": "88",//所属运营商
                        "dotId": "878",//洗衣点id
                        "dotName": "逗号公寓珠海柠溪路店",//洗衣点的名字
                        "address": "珠海市香洲区柠溪路338号莫泰酒店7楼",//地址信息
                        "location": "逗号公寓7楼",//位置信息，具体到几楼、房间号
                        "deviceAmount": "3",//洗衣机数量
                        "dryerDeviceAmount": "1",//洗干衣机数量
                        "spareDeviceNum": "4",//空闲设备数
                        "tel": "18888888888",//管理员联系电话
                        "isKeep": "0",//是否收藏
                        "latitude": "21.271008",//纬度
                        "longitude": "112.567912",//精度
                        "bookTime": "10"//预约可以保留时间
                    },
                    {
                        "traderId": "88",//所属运营商
                        "dotId": "8718",//洗衣点id
                        "dotName": "逗号公寓珠*",//洗衣点的名字
                        "address": "珠海市香洲区柠溪路338号莫泰酒店7楼",//地址信息
                        "location": "逗号公寓7楼",//位置信息，具体到几楼、房间号
                        "deviceAmount": "3",//洗衣机数量
                        "dryerDeviceAmount": "1",//洗干衣机数量
                        "spareDeviceNum": "4",//空闲设备数
                        "tel": "18888888888",//管理员联系电话
                        "isKeep": "0",//是否收藏
                        "latitude": "22.271008",//纬度
                              "longitude": "113.567912",//精度
                              "bookTime": "10"//预约可以保留时间
                          },
                          {
                              "traderId": "88",//所属运营商
                              "dotId": "8758",//洗衣点id
                              "dotName": "逗号公寓珠海柠溪路店",//洗衣点的名字
                              "address": "珠海市香洲区柠溪路338号莫泰酒店7楼",//地址信息
                              "location": "逗号公寓7楼",//位置信息，具体到几楼、房间号
                              "deviceAmount": "3",//洗衣机数量
                              "dryerDeviceAmount": "1",//洗干衣机数量
                              "spareDeviceNum": "4",//空闲设备数
                              "tel": "18888888888",//管理员联系电话
                              "isKeep": "0",//是否收藏
                              "latitude": "21.271008",//纬度
                              "longitude": "112.567912",//精度
                              "bookTime": "10"//预约可以保留时间
                          },
                          {
                              "traderId": "88",//所属运营商
                              "dotId": "87008",//洗衣点id
                              "dotName": "逗号公寓珠12",//洗衣点的名字
                              "address": "珠海市香洲区柠溪路338号莫泰酒店7楼",//地址信息
                              "location": "逗号公寓7楼",//位置信息，具体到几楼、房间号
                              "deviceAmount": "3",//洗衣机数量
                              "dryerDeviceAmount": "1",//洗干衣机数量
                              "spareDeviceNum": "4",//空闲设备数
                              "tel": "18888888888",//管理员联系电话
                              "isKeep": "0",//是否收藏
                              "latitude": "22.271008",//纬度
                                    "longitude": "113.567912",//精度
                                    "bookTime": "10"//预约可以保留时间
                                }
          ],
          "r": "00000",
          "msg": "操作成功",
          "sysTime": 1496390027969
      }
   );
});

app.post('/washShopInfoPost', function (req, res) {
   res.send({
       "t":"vDotInfo",
       "data":{
          "dotInfo":{
              "traderId": "88",//所属运营商
              "dotId": "878",//洗衣点id
              "dotName": "逗号公寓珠海柠溪路店",//洗衣点的名字
              "address": "珠海市香洲区柠溪路338号莫泰酒店7楼",//地址信息
              "location": "逗号公寓7楼",//位置信息，具体到几楼、房间号
              "deviceAmount": "3",//洗衣机数量
              "dryerDeviceAmount": "1",//洗干衣机数量
              "spareDeviceNum": "4",//空闲设备数
              "tel": "18888888888",//管理员联系电话
              "isKeep": "0",//是否收藏
              "latitude": "22.271008",//纬度
              "longitude": "113.567912",//精度
              "bookTime": "10"//预约可以保留时间
          },
          "deviceList":[
           {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "波轮洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"001"
           },
           {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "无敌洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"002"
           },
		              {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "波轮洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"001"
           },
           {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "无敌洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"002"
           },
		              {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "波轮洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"001"
           },
           {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "无敌洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"002"
           },
		              {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "波轮洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"001"
           },
           {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "无敌洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"002"
           },
		              {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "波轮洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"001"
           },
           {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "无敌洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"002"
           },
		              {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "波轮洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"001"
           },
           {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "无敌洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"002"
           },
		              {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "波轮洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"001"
           },
           {
               "uuid": "1478",//设备id
               "mid": "1010",//设备类型
               "typeName": "无敌洗衣机",//机型名
               "typeSerial": "SXB60-1U1",//机型编号
               "snCode": "07F-U02",//洗衣机编号，在当前洗衣点，由用户输入
               "washTimeLeft": "0",//当前洗衣剩余时间
               "bookTimeLeft": "0",//当前预约剩余时间
               "cleanTimeLeft":"0",//桶清洁剩余时间
               "doClean":"0",
               "washStatus":"002"
           },
       ]
       },
       "r": "00000",
       "msg": "操作成功",
       "sysTime": 1496390027969
   });
});


app.post('/msgSuspensed', function (req, res) {
   res.send({
      "t":" msgSus",
      "data":{
        "group0":{
                    "susTime":"2017-08-13",//最早待处理的一条的时间
                    "susCount":"2",//待处理的数量
        },
        "group1":{
                    "susTime":"2017-08-12",//最早待处理的一条的时间
                    "susCount":"3",//待处理的数量
        },
        "group2":{
                    "susTime":"2017-07-13",//最早待处理的一条的时间
                    "susCount":"1",//待处理的数量
        },

        "group3":{
                    "susTime":"",//最早待处理的一条的时间
                    "susCount":"",//待处理的数量
        }
      },
      "r": "00000",
      "msg": "操作成功",
      "sysTime": 1496390027969
      }
    );
});

app.post('/historyMsg', function (req, res) {
   res.send(
		   {
			"t":"historyMsg",
			"data":[
				{
					"type":"00",
					"msg":"机器故障",
					"msgId":"2",//
					"msgTime":"2017.08.09",//推送发生的时间
					"msgState":"0",//是否获取过该消息
					
					"ext":{
						"des":"莲花分店有机器发生故障"
					},
 
				},
				{
					"type":"01", 
					"msg":"收入情况",
					"msgId":"3",//一个账号主体下的信息计数
					"msgTime":"2017.08.10",//推送发生的时间
					"msgState":"0",//是否获取过该消息

					"ext":{
						"date":"2017年8月9日",
						"income":"290元",
						"des":"2017.08.09 收入290元！"
					},
				},
				{
					"type":"02", 
					"msg":"收到了管理员申请1",
					"msgId":"4",//一个账号主体下的信息计数
					"msgTime":"2017.08.10",//推送发生的时间
					"msgState":"0",//是否获取过该消息

					"ext":{
						"venderName":"莲花分店",//推荐些写为xxx分店
						"idCardName":"身份证名字",
						"idCardNum":"123654788544125587",//身份证号
						"tel":"18888888888",//默认是登录的手机号
					},
				},
								{
					"type":"02", 
					"msg":"收到了管理员申请2",
					"msgId":"4",//一个账号主体下的信息计数
					"msgTime":"2017.08.10",//推送发生的时间
					"msgState":"0",//是否获取过该消息

					"ext":{
						"venderName":"莲花分店",//推荐些写为xxx分店
						"idCardName":"身份证名字",
						"idCardNum":"123654788544125587",//身份证号
						"tel":"18888888888",//默认是登录的手机号
					},
				},
								{
					"type":"02", 
					"msg":"收到了管理员申请3",
					"msgId":"4",//一个账号主体下的信息计数
					"msgTime":"2017.08.10",//推送发生的时间
					"msgState":"0",//是否获取过该消息

					"ext":{
						"venderName":"莲花分店",//推荐些写为xxx分店
						"idCardName":"身份证名字",
						"idCardNum":"123654788544125587",//身份证号
						"tel":"18888888888",//默认是登录的手机号
					},
				},
				{
					"type":"03", 
					"msg":"修改信息成功",
					"msgId":"5",//一个账号主体下的信息计数
					"msgTime":"2017.08.11",//推送发生的时间
					"msgState":"0",//是否获取过该消息

					"ext":{
						"des":"莲花分店修改信息成功，手机号变更为：1234578943143"
					},
				},
			],


			"r": "00000",
			"msg": "操作成功",
			"sysTime": 1496390027969
		}
    );
});



app.get('/testget', function (req, res) {
   res.send({
     "type" : "get",
	   "user" : "leichangchun",
	   "password" : "123456789"
   });
});


//监听的接口 localhost:8081
var server = app.listen(8081, function () {
  console.log("服务器已启动！");
});
