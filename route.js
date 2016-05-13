'use strict';

const {RouteApp} = require('./base');
const {pipe} = require('xain');

module.exports = class Route extends RouteApp {
    static reaction(state) {
        return {
            query: pipe(state, 'query')
        };
    }
    constructor(props) {
        super(props);
        if (!('path' in this.props && 'page' in this.props)) {
            throw new Error('A Route has to have a path and a page props');
        }
    }
    get routeParams() {
        const {path} = this.props;
        if (path instanceof RegExp) {
            return this.state.path.match(path).slice(1);
        }
        return [];
    }
    render() {
        const {page, props} = this.props;
        return [page, Object.assign({routeParams: this.routeParams}, props || {}, this.state.query)];
    }
}