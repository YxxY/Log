# log-tracer
lightweight logger for node.js heavily inspired by `log` and `rotating-file-stream`

# Features
- default file output
- optional console output
- file rotation support
- log reader support
- cluster mode support

# Usage
## install
`npm i log-tracer --save`
## import
```js
//default options, 'debug' level
var log = require('log-tracer')()

//levelStr option. 
var log = require('log-tracer')('info') //statement level under 'info' will be ignored.
log.info('info message')   //record normally
log.debug('debug message') //would not be recorded

//details with an object options
var log = require('log-tracer')({
    levelStr: 'error',
    enableConsole: true
})
```
## arguments
- levelStr {String} `debug` _default_

Details with an `object` which have following attributes:
- logName {String} _default_ `trace.log` 
- path {String} parent dir of the logfiles, recommend an absolue path. _default_  `./trace` 
- size {String} rotation size for the file. _default_ `20M` 
- maxFiles {Number} max number of files to be stored. _default_ `10` 
- history {String} history file name for rotation. _default_  `${logName}.txt` 
- enableConsole {Boolean} enable console output. _default_  `false` 
- reader {Boolean} read log from file. _default_  `false` 
## Exapmle
```js
//logger
var log = require('log-tracer')();
log.debug('debug message');
log.info('info message');
log.error('error message');

//reader
var log = require('log-tracer')({reader: true});
log.on('line', (data)=>{
    console.log(data)
})
```
## log levels
- 0 EMERGENCY system is unusable
- 1 ALERT action must be taken immediately
- 2 CRITICAL the system is in critical condition
- 3 ERROR error condition
- 4 WARNING warning condition
- 5 NOTICE a normal but significant condition
- 6 INFO a purely informational message
- 7 DEBUG messages to debug an application

# License
[MIT](LICENSE)

