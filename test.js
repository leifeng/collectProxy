/**
 * Created by chuanlong on 2014/12/24.
 */
var collectProxy = require('./collectProxy');

var opt = {
    port: 80,
    accessSpeed: 10,
    responseSpeed: 10,
    httpType: null,
    anonymous: 'high',
    localFilter:true,    //是否本地网速过滤超时的代理,
    localTimeout:1500       //本地超时时间
};
collectProxy.getProxy(opt, function (arr) {
    console.log(arr);
});