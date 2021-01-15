import * as actions from '../actions';

const defaultState = {
    Items:[],
    Containers:[],
    LastAddedRow:{},
    SelectedRowIndex:-1
}  

function reducer(state = defaultState, action) {
    switch (action.type){
        case actions.ACTTYPE_REQUEST_SPREADSHEETROWS:
            var result = {...state,LoadingDocType:action.payload};
            return result;
        case actions.ACTTYPE__GETSPREADSHEETITEMS:
            console.log("reducer");
            console.log(action.payload);        
        default:
            return state;    
    }
}
 
export default reducer;