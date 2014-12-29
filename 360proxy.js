/**
 * Created by chuanlong on 2014/12/24.
 */
var jsdom = require('jsdom'),
    net = require('net'),
    http = require('http');

var extend = function (a, b) {
    for (var key in b) {
        a[key] = b[key];
    }
    return a;
};
var localTestSpeed = function (arr, cb, timeout) {
    var time = 2000;
    if (timeout) time = timeout;
    var filterArr = [];
    var len = arr.length - 1;
    var index = 0;
    var test = function (port, host) {
        var client = new net.Socket();
        client.connect(port, host, function () {
            var obj = {
                host: host,
                port: port,
                accessSpeed: arr[index].accessSpeed,
                responseSpeed: arr[index].responseSpeed,
                httpType: arr[index].httpType,
                anonymous: arr[index].anonymous
            };
            filterArr.push(obj);
            //console.log('加入'+host);
        });
        client.setTimeout(time, function () {
            //console.log('----'+time+'----');
            client.destroy();
        });
        client.on('close', function () {
            //console.log('关闭');
            index++;
            if (index < len) {
                //console.log('下个：',index,arr[index].host);
                test(arr[index].port, arr[index].host);
            } else {
                cb(filterArr);
            }
        });
        client.on('error', function () {
            //console.log('错误');
            index++;
            if (index < len) {
                test(arr[index].port, arr[index].host);
            } else {
                cb(filterArr);
            }
        });
    };
    test(arr[index].port, arr[index].host);

};

var cj = function (defaults,arr, url, page, index, cb) {
   var req= http.request('http://www.proxy360.net/' + url + '/' + index, function (res) {
        var html = '';
        res.on('data', function (chunk) {
            html += chunk;
        }).on('end', function () {
            jsdom.env(
                html, ['jquery-2.1.1.min.js'], function (err, window) {
                    var $ = window.$;
                    $('#listtable tbody tr').each(function () {
                        var time = $(this).find('td:eq(0)').text();
                        //端口
                        var port = $(this).find('td:eq(2)').text();
                        //访问速度
                        var accessSpeed = $(this).find('td:eq(4) .indicator').css('width');
                        //响应速度
                        var responseSpeed = $(this).find('td:eq(5) .indicator').css('width');
                        //http类型
                        var httpType = $(this).find('td:eq(6)').text().toLowerCase();
                        //匿名类型
                        var anonymous = $(this).find('td:eq(7)').text().toLowerCase();

                        //处理ip地址
                        var hostDiv = $(this).find('td:eq(1)>span');
                        //过滤div和隐藏样式的内容
                        hostDiv.find("span[style='display:none']").text('');
                        hostDiv.find('div').text('');
                        //获取样式，得到非隐藏className 放入classN数组
                        var classN = [];
                        var style = hostDiv.find('style').text();
                        var Arr_style = style.split('.');
                        for (var i = 1; i < Arr_style.length; i++) {
                            if (Arr_style[i].indexOf('inline') > 0) {
                                classN.push(Arr_style[i].substring(0, 4));
                            }
                        }
                        //去除样式标签
                        hostDiv.find('style').remove();
                        //通过classN过滤无用信息
                        $(hostDiv).find('span').each(function () {
                            var c = $(this).attr('class');
                            var s = $(this).css('display');
                            if (!(c === 'undefined' || s === 'inline')) {
                                if (classN.indexOf(c) <= 0) {
                                    if (!$.isNumeric(c)) {
                                        $(this).text('');
                                    }
                                }
                            }
                        });
                        //过滤后的ip地址
                        var host = $(hostDiv).text();
                        //匹配条件
                        if (defaults.port) {
                            if (port != defaults.port) {
                                console.log('port',host,port);
                                return true;
                            }
                        }
                        if (defaults.accessSpeed) {
                            if (parseInt(accessSpeed, 10) <= defaults.accessSpeed) {
                                console.log('accessSpeed',accessSpeed,host,port);
                                return true;
                            }
                        }
                        if (defaults.responseSpeed) {
                            if (parseInt(responseSpeed, 10) <= defaults.responseSpeed) {
                                console.log('responseSpeed',responseSpeed,host,port);
                                return true;
                            }
                        }
                        if (defaults.httpType) {
                            if (httpType != defaults.httpType) {
                                console.log('httpType',httpType,host,port);
                                return true;
                            }
                        }
                        if(defaults.anonymous){
                            if(anonymous.indexOf(defaults.anonymous)==-1){
                                console.log('anonymous',anonymous,host,port);
                                return true;
                            }
                        }
                        var obj = {
                            host: host,
                            port: port,
                            accessSpeed: accessSpeed,
                            responseSpeed: responseSpeed,
                            httpType: httpType,
                            anonymous: anonymous
                        };
                        arr.push(obj);
                    });
                    window.close();
                    if (page > index) {
                        cj(defaults,arr, url, page, ++index,cb)
                    } else {
                        cb(arr);
                    }
                }
            )
        });
    });
    req.end();
};
exports.getProxy = function (opt, cb) {
    //默认配置
    var defaults = {
        port: null,             //不限端口
        accessSpeed: 80,
        responseSpeed: 80,
        httpType: null,      //可以为 http 或 https
        anonymous: null,   //代理匿名类型 high or low or null 不用改（会改变您的IP，远程服务器不知道您的真实IP，也不知道您正在使用代理访问）
        localFilter: false, //是否本地网速过滤超时的代理(开启可能会延时很长，不过过滤后更准确)
        localTimeout: 2000, //本地超时时间
        proxyType: 'gn',   //国内代理gn，国外代理gw
        pages: 1       //采集的页数
    };
    defaults = extend(defaults, opt);
    var url = (defaults.proxyType === 'gn' ? 'guonei' : 'guowai');
    var arr=[];
    cj(defaults,arr,url,defaults.pages,1,function(result){
        if (defaults.localFilter) {
            localTestSpeed(result, function (arr) {
                cb(arr);
            }, defaults.localTimeout);
        } else {
            cb(result);
        }
    });
};
