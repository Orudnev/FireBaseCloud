import {connect} from 'react-redux';
import * as acts from '../actions';
import {actStoreCloudGetAllItems} from '../actions';
import {actStoreCloudFilterItems} from '../actions';
import storageMainPg from '../components/SrorageCloudMainNew';
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
        requestRows: 
            (bRefresh) =>{
                dispatch(actStoreCloudGetAllItems(bRefresh));
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

const cont = connect(mapStateToProps,mapDispatchToProps)(storageMainPg);
export default cont;