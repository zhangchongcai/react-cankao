import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import {HashRouter} from 'react-router-dom';

import store from './store';
import {Provider} from 'react-redux';
render(
    <Provider store={store}>
        <HashRouter >
            <App/>
        </HashRouter>
    </Provider>
    ,
    
    document.getElementById('root')
)