import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import CommonUtils from './utils/CommonUtils';
import App from './components/App.js';

window.defaultAppSettings = CommonUtils.getConfigList();

ReactDOM.render(<App/> , document.querySelector("#root"));