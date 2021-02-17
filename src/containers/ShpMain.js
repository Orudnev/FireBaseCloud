import {connect} from 'react-redux';
import {actGetSpreadSheetRows} from '../actions';
import {actStoreCloudFilterItems} from '../actions';
import {actStoreCloudUpdateRow} from '../actions';
import shpMainPg from '../components/ShpMain';
import {ACTTYPE_STORECLOUD_SELECTROW} from '../actions';

var Documents = null;

function mapStateToProps(state)
{
    Documents = state.spreadSheets.Documents;
    return{
            Documents: state.spreadSheets.Documents
        }
}
const docId = "Shopping";

 
function mapDispatchToProps(dispatch)
{
    return {
        columns:
            ()=>{
                return columnList;
            },
        rowGetter:
            (rowIndex) => {
                return Documents.Shopping.rows[rowIndex]; 
            },
        rowsCount:
            () => {                
                return Documents.Shopping.rows.length;
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
            },
        changeFieldValue:(newRowValue,updateOnServer)=>{
            dispatch(actStoreCloudUpdateRow(docId,newRowValue,updateOnServer));
            console.log(newRowValue);                
        }                     
    };
}

const columnList = [
    {
        key:'Id',
        name:'#',
        width:30,
        form:{
            hiddenLbl:true,
            disabled:true
        }
    },
    {
        key:'Name',
        name:'Наименование',
        resizable: true,
        width:200
    },
    {
        key:'Amount',
        name:'Кол.',
        width:50,
        form:{
            rowContainer:"begin",
            class:"col-2"
        }
    },
    {
        key:'Unit',
        name:'Eд.',
        width:50,
        type:'dropdown',
        dropdownItems:['шт.','г.','кг.','л.'],
        form:{
            rowContainer:"end",
            class:"col-2"
        }
    },
    {
        key:'Selected',
        name:'Отм',
        width:50,
        form:{
            hidden:true
        }
    }
];


const cont = connect(mapStateToProps,mapDispatchToProps)(shpMainPg);
export default cont;