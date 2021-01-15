import axios from 'axios';
import {STORECLOUD_ENDPOINTURL as url} from '../appResources';

export const ACTTYPE_STORECLOUD_ADDEDITROW_WAITRESPONSE = 'ACTTYPE_STORECLOUD_ADDEDITROW_WAITRESPONSE';
export const ACTTYPE_STORECLOUD_ADDROW = 'ACTTYPE_STORECLOUD_ADDROW';
export const ACTTYPE_STORECLOUD_UPDATEROW = 'ACTTYPE_STORECLOUD_UPDATEROW';
export const ACTTYPE_STORECLOUD_SELECTROW = 'ACTTYPE_STORECLOUD_SELECTROW';
export const ACTTYPE_STORECLOUD_EDITROW = 'ACTTYPE_STORECLOUD_EDITROW';


export function actStoreCloudAddRow(valuesArray){
    var paramObj = {method:"addRowFromFldList"};
    for(var i=0;i<valuesArray.length;i++){
        var fldName = "f"+i;
        paramObj[fldName] = valuesArray[i];
    }
    var pars = {params:paramObj}
    return dispatch=>{
        dispatch({
            type: ACTTYPE_STORECLOUD_ADDEDITROW_WAITRESPONSE
        });
        return axios.get(url,pars)
        .then(response=>{
               return response.data.result
            })
        .then((payload)=>{                
                dispatch({
                type:ACTTYPE_STORECLOUD_ADDROW,
                payload});
            });
    }   
}

export function actStoreCloudUpdateRow(valuesArray){
    var paramObj = {method:"updateRowFromFldList"};
    for(var i=0;i<valuesArray.length;i++){
        var fldName = "f"+i;
        paramObj[fldName] = valuesArray[i];
    }
    var pars = {params:paramObj}
    console.log('actStoreCloudUpdateRow');
    return dispatch=>{
        dispatch({
            type: ACTTYPE_STORECLOUD_ADDEDITROW_WAITRESPONSE
        });
        return axios.get(url,pars)
        .then(response=>{
               return response.data.result
            })
        .then((payload)=>{  
                dispatch({
                type:ACTTYPE_STORECLOUD_UPDATEROW,
                payload});
            });
    }   
}

//{"method":"addRow","parameters":{"FieldValues":["конт","элм"]}}

