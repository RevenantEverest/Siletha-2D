import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HomePageCSS from './public/style/HomePage.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
