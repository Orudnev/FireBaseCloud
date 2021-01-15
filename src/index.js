import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducers'
import Root from './components/Root'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import $ from 'jquery';
//import Popper from 'popper.js';

function addPromiseThunkSupport(store) {
    const dispatch = store.dispatch;
    
    return action => {
        if (typeof action.then === 'function') {
            return action.then(dispatch);
        } else if (typeof action === 'function') {
            return action(dispatch);
        }
        
        return dispatch(action);
    };
}


const store = createStore(reducer,{},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.dispatch = addPromiseThunkSupport(store);

render(<Root store={store} />, document.getElementById('root'))

serviceWorker.unregister();
