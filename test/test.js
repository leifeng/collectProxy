/**
 * Created by chuanlong on 2014/12/24.
 */
var collectProxy = require('./../360proxy');

var opt = {
    port: null,
    accessSpeed: 10,
    responseSpeed: 10,
    httpType: null,
    anonymous: null,
    localFilter:false,
    localTimeout:1500,
    proxyType:'gn',
    pages:2
};
collectProxy.getProxy(opt, function (arr) {
    console.log(arr);
    console.log('完成');
});