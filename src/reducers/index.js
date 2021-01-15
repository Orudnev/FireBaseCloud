import {combineReducers} from 'redux';

import cloudStore from './reducerStorageCloudItems';
const reducer = combineReducers(
    {
        cloudStore,
    });

export default reducer;    