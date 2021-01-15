import {combineReducers} from 'redux';

import cloudStore from './reducerStorageCloudItems';
import spreadSheets from './reducerSpreadSheets';
const reducer = combineReducers(
    {
        cloudStore,
        spreadSheets
    });

export default reducer;    