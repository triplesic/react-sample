import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, Switch, Link } from 'react-router-dom';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducer from './reducers';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';

import history from './history'

import Navigation from './components/Navigation';
import HomeIndex from './components/HomeIndex';
import Login from './components/Login'
import Signup from './components/Signup'

import Product from './components/Product'
import ProductDetail from './components/ProductDetail'

import UserRole from './components/UserRole'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import 'semantic-ui-css/semantic.min.css'
import './styles/app.scss';
import './fonts/Eng/Nunito-Bold.ttf';
import './fonts/Eng/Nunito-ExtraBold.ttf';
import './fonts/Eng/Nunito-Regular.ttf';
import './fonts/Eng/Nunito-SemiBold.ttf';
import './fonts/Thai/Prompt-Light.ttf';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'

import myImg from './asset/missing.png'
import 'bootstrap';

import jwt from 'jsonwebtoken'
import { setCurrentUser } from './actions/AuthActions'

import setAuthorizationToken from './helpers/util/setAuthorizationToken'
import requiredAuth from './helpers/util/requiredAuth'


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    undefined,
    compose(
        applyMiddleware(sagaMiddleware, thunk, promise),
        //autoRehydrate()
    )
)

persistStore(store)

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken)
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}

sagaMiddleware.run(rootSaga);

const router = () => {
    return (
        <Router history={history}>
            <div>
                <div className='container-fluid'>
                    <Navigation />
                </div>
                <Switch>
                    <Route path="/userRole" component={UserRole} />

                    <Route path="/product" component={Product} />
                    <Route path="/productDetail/:productId" component={ProductDetail} />

                    <Route path="/Login" component={Login} />
                    <Route path="/Signup" component={Signup} />
                    <Route path="/" component={HomeIndex} />
                </Switch>
                <div className='container-fluid no-print'>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className='col-xs-12 text-right'>
                        <h4><span style={{ color: '#e4e4e4' }}>Version 0.0.1</span></h4>
                    </div>
                </div>
            </div>
        </Router>
    );
}

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
    stepper: {
        iconColor: 'black',
        inactiveIconColor: '#C58A02'
    }
});

ReactDom.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            {router()}
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
)
