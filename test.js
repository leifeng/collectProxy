/**
 * Created by chuanlong on 2014/12/24.
 */
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