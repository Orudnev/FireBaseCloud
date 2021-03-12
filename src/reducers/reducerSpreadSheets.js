import * as actions from '../actions';

const defaultState = {
    Documents:{
        Shopping:{
            rows:[]
        },
        Fuel:{
            rows:[]
        }
    },
}  

function reducer(state = defaultState, action) {
    switch (action.type){
        case actions.ACTTYPE_REQUEST_SPREADSHEETROWS:
            var result = {...state,LoadingDocType:action.payload};
            return result;
        case actions.ACTTYPE__GETSPREADSHEETITEMS:
            var docs = {...state.Documents}
            docs[action.payload.docId].rows = action.payload.rows; 
            result = {...state, Documents:docs};
            return result;     
        case actions.ACTTYPE_STORECLOUD_UPDATEROW:
            var newDocs = {...state.Documents};
            var rowIndex = newDocs[action.payload.docId].rows.findIndex(itm=>itm.Id === action.payload.row.Id);
            if(rowIndex !== -1){
                newDocs[action.payload.docId].rows[rowIndex] = action.payload.row;
            }
            result = {...state,Documents:newDocs};
            return result;    
        default:
            return state;    
    }
}
 
export default reducer;