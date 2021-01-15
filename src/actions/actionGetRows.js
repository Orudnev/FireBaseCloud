import axios from 'axios';
import {HOMECLOUD_ENDPOINTURL as url} from '../appResources'

export const ACTTYPE_REQUEST_SPREADSHEETROWS = 'ACTTYPE_REQUEST_SPREADSHEETROWS';
export const ACTTYPE__GETSPREADSHEETITEMS = 'ACTTYPE__GETSPREADSHEETITEMS';

export function actGetSpreadSheetRows(documentId)
{
    return dispatch=>{
        dispatch({
            type: ACTTYPE_REQUEST_SPREADSHEETROWS,
            payload:documentId
        });
        var paramObj = {docId:documentId,method:"getAllRows"};
        var pars = {params:paramObj}
        return axios.get(url,pars)
        .then(response=>{
            return response.data.result;
        })
        .then((payload)=>{
                dispatch({
                type:ACTTYPE__GETSPREADSHEETITEMS,
                payload:{rows:payload,docId:documentId}
                });
            });
    }   
}


