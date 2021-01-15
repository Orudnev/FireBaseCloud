import {connect} from 'react-redux';
import {actStoreCloudAddRow} from '../actions';
import StorageCloudAddRow from '../components/StorageCloudAddRow';

function mapStateToProps(state)
{
    return{
        CloudStore: state.cloudStore
        }
}

function mapDispatchToProps(dispatch)
{
    return {
        addRow: 
            (newRowValues) =>{
                console.log("addRow");
                dispatch(actStoreCloudAddRow(newRowValues));
            }     
    };
}

const cont = connect(mapStateToProps,mapDispatchToProps)(StorageCloudAddRow);
export default cont;