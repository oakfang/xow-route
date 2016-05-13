# xow-route
## A basic routing solution for [xow](https://github.com/oakfang/xow), using xow components.

## Usage

### Rendering the App
```js
const {renderTo, dom} = require('xow');
const {Router, Route} = require('xow-route');

const Index = require('./pages/index');
const Basic = require('./pages/basic');
const ListView = require('./pages/list');

renderTo(document.getElementById('container'), (
    <Router defaultRoute="/">
        <Route path="/" page={Index} />
        <Route path="/basic" page={Basic} />
        <Route path={/\/list(?:\/(\w+))?/} page={ListView} />
    </Router>
));
```

A `page` is a xow component that accepts no props. All query params will be provided as props to the page, however.
The `path` prop can be either s string or a `RegExp`.
In the second case, all matched groups will be provided to the `page` via the `routeParams` prop.

A `Router` can accept a `defaultRoute` prop, to which the app will go in a case of a "404" error.


### Linking
```js
const {dom, children} = require('xow');
const {Link} = require('xow-route');
const App = require('./base');

module.exports = class Main extends App {
    render() {
        const { newTask, list } = this.props;
        return (
            <div>
                <header>
                    <div>
                        <span>TODO</span>
                        <nav>
                            <Link path="/">Full</Link>
                            <Link path="/basic">Basic</Link>
                            <Link path="/list">List</Link>
                        </nav>
                    </div>
                </header>
                <main>
                    <div>
                        {children(this.props.children)}
                    </div>
                </main>
            </div>
        );
    }
}
```

While you can use simple `a` elements as links, the `Link` components bipass the server and maintain state.

The props of `Link` are:

- `path(required)`: the url to link to
- `query`: the query object to pass (translates to somthing like `?foo=bar`)
- `replace`: pass `true` here if you don't want the link to create a new history entry
- All other props provided are passed AS IS the the rendered `a` element.


### Exposed API
```js
const {push, replace} = require('xow-route');
push('/', {foo: 'bar'}) // go to "/?foo=bar" and sync the router
replace('/', {foo: 'buzz'}) // change current history entry to "/?foo=buzz" and sync the router
```