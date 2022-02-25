import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'

import App from './App'
import {store} from './bll/store';
import './index.css'


ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
