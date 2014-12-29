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
        port: null,         //不限端口
        accessSpeed: 80,    //访问速度
        responseSpeed: 80,  //响应速度
        httpType: null,      //可以为 http 或 https
        anonymous: null,     //代理匿名类型 high or low or null 不用改（会改变您的IP，远程服务器不知道您的真实IP，也不知道您正在使用代理访问）
        localFilter:true,    //是否本地网速过滤超时的代理(开启可能会延时很长，不过过滤后更准确)
        localTimeout:1500    //本地超时时间
        proxyType:'gw',      //gn：国内  gw：国外
        pages:1             //采集页数（默认采集1页）
    };
```

##使用
```javascript
var collectProxy = require('360proxy');
var opt = {
    port: null,
    accessSpeed: 10,
    responseSpeed: 10,
    httpType: null,
    anonymous: null，
    localFilter:false,
    proxyType:'gw',
    page:2
}
collectProxy.getProxy(opt, function (arr) {
    console.log(arr);
})
```
