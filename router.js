'use strict';

const {RouteApp, replace} = require('./base');
const {pipe} = require('xain');

module.exports = class Router extends RouteApp {
    static reaction(state) {
        return {
            path: pipe(state, 'path'),
            query: pipe(state, 'query')
        };
    }
    render() {
        const {path, query, children} = this.props;
        for (let [route, routeProps, routeChildren] of children) {
            if (routeProps.path instanceof RegExp && routeProps.path.test(path)) {
                return [route, routeProps, routeChildren];
            } else if (routeProps.path === path) {
                return [route, routeProps, routeChildren];
            }
        }
        if ('defaultRoute' in this.props) {
            replace(this.props.defaultRoute);
        } else {
            throw new Error('404 no route found');
        }
    }
}