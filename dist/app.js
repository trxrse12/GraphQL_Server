"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildApp = buildApp;

var _express = _interopRequireDefault(require("express"));

function buildApp() {
  var app = (0, _express["default"])();
  app.get('/', function (req, res, next) {
    console.log('RRRRRRRRRRRRRRRRRRRRRR res=', res);
    res.statusCode(200);
    res.send();
  });
  return app;
}