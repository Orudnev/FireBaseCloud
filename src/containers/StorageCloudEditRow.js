import {connect} from 'react-redux';
import {actStoreCloudUpdateRow} from '../actions';

import StorageCloudEditRow from '../components/StorageCloudEditRow';

function mapStateToProps(state)
{
    return{
        CloudStore: state.cloudStore
        }
}

function mapDispatchToProps(dispatch)
{
    return {
        updateRow: 
            (newRowValues) =>{
                dispatch(actStoreCloudUpdateRow(newRowValues));
            },
    };
}

const cont = connect(mapStateToProps,mapDispatchToProps)(StorageCloudEditRow);
export default cont;