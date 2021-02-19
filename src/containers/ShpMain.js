import {connect} from 'react-redux';
import {actGetSpreadSheetRows} from '../actions';
import {actStoreCloudFilterItems} from '../actions';
import {actStoreCloudUpdateRow} from '../actions';
import shpMainPg from '../components/ShpMain';
import {ApplyIcon}  from '../components/icons';

var Documents = null;

function mapStateToProps(store)
{
    Documents = store.spreadSheets.Documents;
    return{
            Documents: store.spreadSheets.Documents
        }
}
const containerProps= {
    docId : "Shopping",
    dispatchAction: null,
    lastSelectedRowIndex: 0,
    lastRowValue:{}, //Последнее значение строки после редактирования в DataForm
    hasChanges: false,
    selectRowPendingAction:null,
    getRowByIndex:(index)=>{
        var rows = Documents[containerProps.docId].rows;
        var result = rows.find((itm)=>itm.Id==index);
        return result;
    },
    changeRowSelectionMark:()=>{
        var r = containerProps.getRowByIndex(containerProps.lastSelectedRowIndex);
        var row = {...r};
        if(row){
            row.Selected = (row.Selected?"":"x");
            containerProps.dispatchAction(actStoreCloudUpdateRow(containerProps.docId,row,false));
        }
    }
}

 
function mapDispatchToProps(dispatch)
{
    containerProps.dispatchAction = dispatch;
    return {
        columns:
            ()=>{
                return columnList;
            },
        getCellActions(column,row){
            var actionSelect = ()=>{
                    containerProps.selectRowPendingAction = ()=>{containerProps.changeRowSelectionMark()};
            };
            if(column.key=="Selected")
            {
                if(!row.Selected)
                    return [{icon: ApplyIcon("gray"),callback:actionSelect}];    
                else
                    return [{icon: ApplyIcon("green"),callback:actionSelect}];    
            }
            return null;
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
                dispatch(actGetSpreadSheetRows(containerProps.docId));
            },
        filterRows:
            (fltCriteria) =>{
                dispatch(actStoreCloudFilterItems(fltCriteria));
            },
        selectRow:
            (rowIndex) =>{
                containerProps.hasChanges = false;
                containerProps.lastSelectedRowIndex = rowIndex;
                if(containerProps.selectRowPendingAction)
                {
                    containerProps.selectRowPendingAction();
                    containerProps.selectRowPendingAction = null;
                }
            },
        changeFieldValue:(newRowValue,updateOnServer)=>{
                containerProps.hasChanges = true;
                containerProps.lastRowValue = newRowValue;
                dispatch(actStoreCloudUpdateRow(containerProps.docId,newRowValue,updateOnServer));
                console.log(newRowValue)
            },
        saveRowChanges:()=>
            {
                if(containerProps.hasChanges){
                    dispatch(actStoreCloudUpdateRow(containerProps.docId,containerProps.lastRowValue,true));
                }
            }    
        }                     
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
        width:140
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

const cellActions = [
        {
            icon: ApplyIcon("gray")
        }
    ];    



const cont = connect(mapStateToProps,mapDispatchToProps)(shpMainPg);
export default cont;