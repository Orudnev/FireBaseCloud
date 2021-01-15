import * as actions from '../actions';

const defaultState = {
    Documents:{
        Shopping:{
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
        default:
            return state;    
    }
}
 
export default reducer;