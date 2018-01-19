/*!
 * fork from Log.js by TJ
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fmt = require('util').format;
var EventEmitter = require('events').EventEmitter;

exports = module.exports = Log

/**
 * Initialize a `Loggeer` with the given log `level` defaulting
 * to __DEBUG__, `stream` defaulting to _stdout_ and enableConsole defaulting to false
 *
 * @param {Number} level
 * @param {Object} stream
 * @param {Boolean} enableConsole
 * @api public
 */

function Log(level, stream, enableConsole) {
    if ('string' == typeof level)
        level = Log[level.toUpperCase()]
    this.level = level || Log.DEBUG
    this.stream = stream || process.stdout
    this.enableConsole = enableConsole || false
    if (this.stream.readable)
        this.read()
};

Object.defineProperties(Log, {
    //System is unusable.
    'EMERGENCY': {
        value: 0
    },
    //Action must be taken immediately.
    'ALERT': {
        value: 1
    },
    'CRITICAL': {
        value: 2
    },
    'ERROR': {
        value: 3
    },
    'WARNING': {
        value: 4
    },
    'NOTICE': {
        value: 5
    },
    'INFO': {
        value: 6
    },
    'DEBUG': {
        value: 7
    }
});

/**
 * prototype.
 */

Log.prototype = Object.create(EventEmitter.prototype)
Log.prototype.constructor = Log

Log.prototype.read = function (params) {
    var buf = '',
        self = this,
        stream = this.stream

    stream.setEncoding('utf8')
    stream.on('data', function (chunk) {
        buf += chunk;
        if ('\n' != buf[buf.length - 1]) return;
        buf.split('\n').map(function (line) {
            if (!line.length) return;
            try {
                var captures = line.match(/^([^\]]+) \[(\w+)\]\s+(.*)/);
                var date = new Date(captures[1])
                date.setUTCHours(date.getUTCHours() - date.getTimezoneOffset() / 60)
                var obj = {
                    date: date.toISOString().replace(/Z/, ''),
                    level: Log[captures[2]],
                    levelString: captures[2],
                    msg: captures[3]
                };
                self.emit('line', obj);
            } catch (err) {
                // Ignore
            }
        });
        buf = '';
    });

    stream.on('end', function () {
        self.emit('end');
    });
}

Log.prototype.log = function (levelStr, args) {
    if (Log[levelStr] <= this.level) {
        var msg = fmt.apply(null, args)
        var padding = ' '
        if (levelStr.length < 5)
            padding = padding.repeat(6 - levelStr.length)
        var now = new Date()
        now.setUTCHours(now.getUTCHours() - now.getTimezoneOffset() / 60) //converts to my timezone

        this.stream.write(now.toJSON().replace(/Z/, '') +
            ' [' + levelStr + ']' + padding + msg + '\n')
        if (this.enableConsole)
            console.log(`[${levelStr}]: ${msg}`)
    }
};

['emergency',
    'alert',
    'critical',
    'error',
    'warning',
    'notice',
    'info',
    'debug'
].forEach(function (e) {
    Log.prototype[e] = function (msg) {
        this.log(e.toUpperCase(), arguments);
    }
});