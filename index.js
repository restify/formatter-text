// Copyright 2012 Mark Cavage, Inc.  All rights reserved.

'use strict';

function formatText(req, res, body) {
  if (body instanceof Error) {
    res.statusCode = body.statusCode || 500;
    body = body.message;
  } else if (typeof (body) === 'object') {
    body = JSON.stringify(body);
  } else {
    body = body.toString();
  }

  setContentLength(body, res);

  return body;
}

function setContentLength(data, response) {
  var length = data ? Buffer.byteLength(data) : 0;
  response.setHeader('Content-Length', length);
}

module.exports = formatText;
