采集www.proxy360.net 代理信息
============


[![NPM version](https://badge.fury.io/js/360proxy.png)](http://badge.fury.io/js/360proxy)

[![NPM](https://nodei.co/npm/360proxy.png?downloads=true&downloadRank=true)](https://nodei.co/npm/360proxy/)
##安装360proxy
```bash
$ npm install 360proxy -g
```

##参数说明
```javascript
    var opt = {
        port: null,     //不限端口
        accessSpeed: 80,//访问速度
        responseSpeed: 80,//响应速度
        httpType: null, //可以为 http 或 https
        localFilter:true,    //是否本地网速过滤超时的代理
        localTimeout:1500       //本地超时时间
    };
```

##使用
```javascript
var collectProxy = require('360proxy');
var opt = {
    port: 80,
    accessSpeed: 10,
    responseSpeed: 10,
    httpType: null,
    anonymous: 'high'，
     localFilter:true
}
collectProxy.getProxy(opt, function (arr) {
    console.log(arr);
})
```
##注
没有实现分页采集，只采集第一页最新的代理信息