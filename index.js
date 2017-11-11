var Log = require('./log'),
    rfs = require('rotating-file-stream'),
    path = require('path'),
    fs = require('fs')

module.exports = function (config) {
    var options = parseConfig(config)
    var opt = {}
    ['size', 'path', 'maxFiles', 'history'].forEach(function(x){
        if(options[x])
            opt[x] = options[x]
    })

    return new Log(options.level, rfs(generator, opt), options.replaceConsole)

    function generator(time, index) {
        if (!time)
            return options.logName;

        var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
        var day = pad(time.getDate());
        var hour = pad(time.getHours());
        var minute = pad(time.getMinutes());

        return '/' + month + day + "-" + hour + minute + "-" + index + "-" + options.logName;
    }
}

function pad(num) {
    return (num > 9 ? "" : "0") + num;
}

function parseConfig(config) {
    var options = {
        logName: 'trace.log',
        path: './traces',
        replaceConsole: true,
        size: '20M',
        maxFiles: 10,
    }
    config = config || 'debug'
    if(typeof config === 'string')
        options.levelStr = config
    else if (typeof config === 'object' && config.toString() === '[object Object]')
        return Object.assign(options, config)

    return options
}