const { request } = require("express");

var sum = require("./abc");
var result=sum(8, 9);
console.log(result);