import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherApp from './WeatherApp';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<WeatherApp />, document.getElementById('root'));
registerServiceWorker();
