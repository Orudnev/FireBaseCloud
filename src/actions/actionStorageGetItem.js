import axios from 'axios';
import {STORECLOUD_ENDPOINTURL as url} from '../appResources'
import {LSTORAGE_KEY} from '../appResources';

export const ACTTYPE_STORECLOUD_REQUEST_GETALLITEMS = 'ACTTYPE_STORECLOUD_REQUEST_GETALLITEMS';
export const ACTTYPE_STORECLOUD_GETALLITEMS = 'ACTTYPE_STORECLOUD_GETALLITEMS';
export const ACTTYPE_STORECLOUD_FILTERITEMS = 'ACTTYPE_STORECLOUD_FILTERITEMS';
export const ACTTYPE_STORECLOUD_UPDATECONTAINERLIST = 'ACTTYPE_STORECLOUD_UPDATECONTAINERLIST';


export function actStoreCloudGetAllItems(bRefresh)
{
    console.log("actStoreCloudGetAllItems()")
    if(!bRefresh)
    {
        if(localStorage[LSTORAGE_KEY] && localStorage[LSTORAGE_KEY]!="undefined")
        {
            var _payload = JSON.parse(localStorage[LSTORAGE_KEY]);
            return  {
                    type:ACTTYPE_STORECLOUD_GETALLITEMS,
                    payload:_payload
                };
        }
    }
    
    return dispatch=>{
        dispatch({
            type: ACTTYPE_STORECLOUD_REQUEST_GETALLITEMS
        });
        var paramObj = {method:"getAllRows"};
        var pars = {params:paramObj}
        return axios.get(url,pars)
        .then(response=>{
            console.log(response.data);
            return response.data.result;
        })
        .then((payload)=>{
                localStorage[LSTORAGE_KEY] = JSON.stringify(payload);
                dispatch({
                type:ACTTYPE_STORECLOUD_GETALLITEMS,
                payload});
            });
    }   
}


export function actStoreCloudFilterItems(fltCriteria)
{
    if(fltCriteria.itemFilter || fltCriteria.containerFilter){
        var allRows = JSON.parse(localStorage[LSTORAGE_KEY]);
        var payload = allRows.filter((row)=>{
            var b1 = true; var b2 = true;            
            if (fltCriteria.itemFilter){
             console.log(fltCriteria.itemFilter);   
             console.log(row.Item);   
             b1 = row.Item.toLowerCase().includes(fltCriteria.itemFilter.toLowerCase());
            }
            if (fltCriteria.containerFilter){ 
                b2 = row.Container == fltCriteria.containerFilter;
            }
            return b1 && b2;     
        });
        return  {
            type:ACTTYPE_STORECLOUD_GETALLITEMS,
            payload
        };
    } else{
        payload = JSON.parse(localStorage[LSTORAGE_KEY]);
        return  {
            type:ACTTYPE_STORECLOUD_GETALLITEMS,
            payload
        };
    }
}