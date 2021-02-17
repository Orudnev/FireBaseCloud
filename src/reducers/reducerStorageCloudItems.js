import * as actions from '../actions';
import {LSTORAGE_KEY} from '../appResources';

const defaultState = {
    Items:[],
    Containers:[],
    LastAddedRow:{},
    SelectedRowIndex:-1
}  

function reducer(state = defaultState, action) {
    switch (action.type){
        case actions.ACTTYPE_STORECLOUD_REQUEST_GETALLITEMS:
            var result = {...state,Items:null,
                Containers:[]
            } 
            return result;
        case actions.ACTTYPE_STORECLOUD_ADDROW:
            result = {...state,LastAddedRow:action.payload};
            result.Items.push(result.LastAddedRow);
            localStorage[LSTORAGE_KEY] = JSON.stringify(result.Items);
            return result;
        case actions.ACTTYPE_STORECLOUD_UPDATEROW:
            var updatedRow=action.payload;
            result = {...state,SelectedRowIndex:updatedRow.Id};
            result.Items[updatedRow.Id] = updatedRow;
            localStorage[LSTORAGE_KEY] = JSON.stringify(result.Items);
            return result;
        case actions.ACTTYPE_STORECLOUD_SELECTROW:
            result = {...state,SelectedRowIndex:action.payload};
            return result;
        default:
            return state;    
    }
}
 

 
export default reducer;