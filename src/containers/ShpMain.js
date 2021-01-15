import {connect} from 'react-redux';
import {actGetSpreadSheetRows} from '../actions';
import {actStoreCloudFilterItems} from '../actions';
import shpMainPg from '../components/ShpMain';
import {ACTTYPE_STORECLOUD_SELECTROW} from '../actions';

function mapStateToProps(state)
{
    return{
        CloudStore: state.cloudStore
        }
}

function mapDispatchToProps(dispatch)
{
    return {
        columns:
            ()=>{
                return columnList;
            },
        requestRows: 
            (bRefresh) =>{
                dispatch(actGetSpreadSheetRows("Shopping"));
            },
        filterRows:
            (fltCriteria) =>{
                dispatch(actStoreCloudFilterItems(fltCriteria));
            },
        selectRow:
            (payload) =>{
                dispatch({
                    type:ACTTYPE_STORECLOUD_SELECTROW,
                    payload});
            }                 
    };
}

const columnList = [
    {
        key:'Container',
        name:'Container',
        resizable: true,
        width:100
    },
    {
        key:'Item',
        name:'Item',
        resizable: true,
    },
];


const cont = connect(mapStateToProps,mapDispatchToProps)(shpMainPg);
export default cont;