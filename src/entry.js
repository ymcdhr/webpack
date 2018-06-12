/**
 * CANNOT use `import` to import `es5-shim`,
 * because `import` will be transformed to `Object.defineProperty` by babel,
 * `Object.defineProperty` doesn't exists in IE8,
 * (but will be polyfilled after `require('es5-shim')` executed).
 */

require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('es6-promise');
require('fetch-ie8');

/**
 * CANNOT use `import` to import `react` or `react-dom`,
 * because `import` will run `react` before `require('es5-shim')`.
 */
// import React from 'react';
// import ReactDOM from 'react-dom';

const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./App');
require('./style/common.css');


/**
 * redux相关引入
 */
const ReactRedux = require('react-redux');
const Redux = require('redux');
const reducers = require('./reducers/index');

const Provider = ReactRedux.Provider;
const createStore = Redux.createStore;

// 构造store和reducer的关系
let store = createStore(reducers)

// 测试
store.getState();


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
