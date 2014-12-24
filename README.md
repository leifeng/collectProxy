collectProxy
============

采集http://www.proxy360.net/ 代理信息
##参数说明
```javascript
    var opt = {
        port: null,     //不限端口
        accessSpeed: 80,//访问速度
        responseSpeed: 80,//响应速度
        httpType: null, //可以为 http 或 https
    };
```

##使用
```javascript
var collectProxy = require('./collectProxy');
var opt = {
    port: 80,
    accessSpeed: 10,
    responseSpeed: 10,
    httpType: null,
    anonymous: 'high'
}
collectProxy.getProxy(opt, function (arr) {
    console.log(arr);
})
```
##注
没有实现分页采集，只采集第一页最新的代理信息