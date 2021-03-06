import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import  'core-js/es/map';
import  'core-js/es/set';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App.jsx'
// import store from './store.js'


// ReactDOM.render(<Provider store={store}>
//     <App/>
//   </Provider>, document.getElementById('root'));

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
