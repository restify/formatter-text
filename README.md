# Deprecated!

This now lives in the main restify repository. To use the restify formatters, please use:

```js
require('restify').formatters
```

formatter-text
===============
[![Build Status](https://travis-ci.org/restify/formatter-text.svg)](https://travis-ci.org/restify/formatter-text)

Installation
============

`npm install restify-formatter-text`

Usage
=======

```
var restify = require('restify');
var server = restify.createServer();
var textFormatter = require('restify-formatter-text');

server.use(textFormatter);
server.listen(8080)
```

License
=======

MIT
