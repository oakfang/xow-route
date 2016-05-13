'use strict';

const {push, replace} = require('./base');
const Router = require('./router');
const Route = require('./route');
const Link = require('./link');

module.exports = {Router, Route, Link, replace, push};