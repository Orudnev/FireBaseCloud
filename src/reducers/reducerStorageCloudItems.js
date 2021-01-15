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
        case actions.ACTTYPE_STORECLOUD_GETALLITEMS:
           var result = { ...state,
                Items:action.payload,
                Containers:getContainerList()
            } 
            return result;
        case actions.ACTTYPE_STORECLOUD_ADDEDITROW_WAITRESPONSE:
            var result = {...state,LastAddedRow:action.payload};
            return result;
        case actions.ACTTYPE_STORECLOUD_ADDROW:
            var result = {...state,LastAddedRow:action.payload};
            result.Items.push(result.LastAddedRow);
            localStorage[LSTORAGE_KEY] = JSON.stringify(result.Items);
            return result;
        case actions.ACTTYPE_STORECLOUD_UPDATEROW:
            var updatedRow=action.payload;
            var result = {...state,SelectedRowIndex:updatedRow.Id};
            result.Items[updatedRow.Id] = updatedRow;
            localStorage[LSTORAGE_KEY] = JSON.stringify(result.Items);
            return result;
        case actions.ACTTYPE_STORECLOUD_SELECTROW:
            var result = {...state,SelectedRowIndex:action.payload};
            return result;
        default:
            return state;    
    }
}

function getContainerList()
{
    var allRowsJsonStr = localStorage[LSTORAGE_KEY];
    if (!allRowsJsonStr || allRowsJsonStr == "undefined") return [];
    var allRows = JSON.parse(allRowsJsonStr);
    var containers = [];
    allRows.map((itemRow)=>{
        var sr = containers.filter(cnt=>cnt==itemRow.Container);
        if (sr.length == 0)
        {
            containers.push(itemRow.Container);     
        }
    });
    return containers;
}


 
export default reducer;