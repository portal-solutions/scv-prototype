import React from 'react';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './app/app';
import './app/i18n';
import * as serviceWorker from './service-worker';

ReactDOM.render(<Router basename={ `${process.env.PUBLIC_URL}` }><App/></Router>, document.querySelector('AppRoot'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
