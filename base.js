'use strict';

const {Component} = require('xow');
const {observable} = require('xain');
const {createHistory, useQueries} = require('history');
const history = useQueries(createHistory)();

const state = observable({
    path: '/',
    query: {}
}, true);

history.listen(({pathname, query}) => {
    state.path = pathname;
    state.query = query;
});

const RouteApp = Component(state);

function push(path, query) {
    history.push({pathname: path, query});
}

function replace(path, query) {
    history.replace({pathname: path, query});
}

module.exports = {RouteApp, push, replace};