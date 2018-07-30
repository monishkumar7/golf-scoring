import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';
import scoresReducer from './store/reducers/scores';

const rootReducer = combineReducers({
    auth: authReducer,
    scores: scoresReducer
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
