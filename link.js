'use strict';

const {RouteApp, push, replace} = require('./base');

module.exports = class Link extends RouteApp {
    constructor(props, children) {
        super(props, children);
        if (!('path' in this.props)) {
            throw new Error('A Link has to have a path');
        }
    }
    onClick(e) {
        e.preventDefault();
        if (this.props.replace) {
            return replace(this.props.path, this.props.query);
        }
        return push(this.props.path, this.props.query);
    }
    render() {
        let props = Object.assign({}, this.props, {
                    href: this.props.path, 
                    onclick: this.onClick.bind(this)
        });
        delete props.path;
        delete props.replace;
        delete props.query;
        delete props.children;

        return ['a', props, this.props.children];
    }
}