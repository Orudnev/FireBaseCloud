import axios from 'axios';
import {HOMECLOUD_ENDPOINTURL as url} from '../appResources'
import {actGetSpreadSheetRows} from './actionGetRows'

export const ACTTYPE_UPDATEROWONSERVER_WAITRESPONSE = 'ACTTYPE_UPDATEROWONSERVER_WAITRESPONSE';
export const ACTTYPE_STORECLOUD_ADDROW = 'ACTTYPE_STORECLOUD_ADDROW';
export const ACTTYPE_STORECLOUD_UPDATEROW = 'ACTTYPE_STORECLOUD_UPDATEROW';
export const ACTTYPE_STORECLOUD_SELECTROW = 'ACTTYPE_STORECLOUD_SELECTROW';
export const ACTTYPE_STORECLOUD_EDITROW = 'ACTTYPE_STORECLOUD_EDITROW';

export function actStoreCloudAddRow(docId,newRowValue,dispatchEx){
    var paramObj = {method:"addRowFromFldList",docId:docId};
    var i = 0;
    for(var prop in newRowValue){
        var fldName = "f"+i;
        paramObj[fldName] = newRowValue[prop];
        i++;
    }

    var pars = {params:paramObj}
    return dispatch=>{
        dispatch({
            type: ACTTYPE_UPDATEROWONSERVER_WAITRESPONSE
        });
        return axios.get(url,pars)
        .then(response=>{
                dispatchEx(actGetSpreadSheetRows(docId));   
            });
    }   
}

export function actStoreCloudUpdateRow(docId,newRowValue,updateOnServer){
    if(!updateOnServer){
        return dispatch=>dispatch({
            type:ACTTYPE_STORECLOUD_UPDATEROW,
            payload:{docId,row:newRowValue}});
    }
    var paramObj = {method:"updateRowFromFldList",docId:docId};
    var i = 0;
    for(var prop in newRowValue){
        var fldName = "f"+i;
        paramObj[fldName] = newRowValue[prop];
        i++;
    }

    var pars = {params:paramObj}
    return dispatch=>{
        dispatch({
            type: ACTTYPE_UPDATEROWONSERVER_WAITRESPONSE
        });
        return axios.get(url,pars)
        .then(response=>{
               return response.data.result
            })
        .then((payload)=>{  
                dispatch({
                    type:ACTTYPE_STORECLOUD_UPDATEROW,
                    payload:{docId,row:newRowValue}});
            });
    } 
}

//{"method":"addRow","parameters":{"FieldValues":["конт","элм"]}}

