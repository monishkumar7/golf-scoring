import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import './index.css';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';
import scoresReducer from './store/reducers/scores';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  scores: scoresReducer
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffc246',
      main: '#ff9100',
      dark: '#c56200',
      contrastText: '#000000'
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: ['Open Sans', 'sans-serif'].join(',')
  }
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
