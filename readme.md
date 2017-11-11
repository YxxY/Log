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
var log = require('log-tracer')()
## arguments
- levelStr {String} `debug` _default_

Details with an `object` which have following attributes:
- logName {String} `trace.log` _default_
- path {String} parent dir of the logfiles, better to be an absolue path. `./trace` _default_
- size {String} rotation size for the file. '20M' _default_
- maxFiles {Number} max number of files to be stored. `10` _default_
- replaceConsole {Boolean} disable console output. `true` _default_
## Exapmle
```js
var log = require('log-tracer')();

log.debug('debug message');
log.info('info message');
log.error('error message');
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

