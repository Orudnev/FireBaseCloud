import React from 'react';
import DataGridPage from './reusable/DataGridPage';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {PlusIcon}  from './icons';
import {PencilIcon}  from './icons';
import {RefreshIcon}  from './icons';
import {ExitIcon}  from './icons';
import {ApplyIcon}  from './icons';
import {routePath} from './Root'

const space10 = {
   width: "10px"
};

const pageWidth = {
    width:"90vw"
}

class ShpMainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
                containerFilter:null,
                itemFilter:"",
                dataGrid:null,
                newRowId:-1,
                hasScrolledToLastRow:false,
                lastSelectedRowIndex:0,
                isFormViewVisible:false,
                isAddrowMode:false
        };
        this.props.requestRows(true);
    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps,prevState){

    }

    handleRefreshButtonClick(){
        this.props.requestRows(true);
    }

    handleChangeFilter(e){
        var itemFilter = e.target.value;
        this.setState({itemFilter});
        var fltCriteria = {itemFilter,containerFilter:this.state.containerFilter}; 
        this.props.filterRows(fltCriteria);
    }

    onCellSelected(sel){
        this.setState({lastSelectedRowIndex:sel.rowIdx});
        this.props.selectRow(sel.rowIdx);
    }

    handleButtonAddClick(){
        this.setState({isFormViewVisible: true,isAddrowMode: true});
    }

    handleButtonEditClick(){
        this.setState({isFormViewVisible: true,isAddrowMode: false});
    }

    handleCloseFormMode(){
        this.setState({isFormViewVisible: false});
    }
    
    handleButtonApplyClick(){
        this.props.saveRowChanges(this.state.isAddrowMode);        
        this.handleCloseFormMode();
    }    
    

    renderTableModeButtons(){
        return (
        <div className="btn-group" role="group" >
            <Button type='button' onClick={()=>this.handleButtonAddClick()} >
                <PlusIcon />
            </Button>
            <span style={space10}></span>
            <Button type='button' onClick={()=>this.handleButtonEditClick()} >
                <PencilIcon />
            </Button>
            <span style={space10}></span>
            <Button type='button' onClick={(e) => this.handleRefreshButtonClick(e)}>
                <RefreshIcon />
            </Button>
        </div>
        );
    }

    renderFormModeButtons(){
        return (
        <div className="row">
            <div className="col">
                <Button type='button' onClick={(e) => this.handleCloseFormMode()} variant="light" className="border">
                    <ExitIcon />
                </Button>
            </div>
            <div className="col text-right">
                <Button type='button' onClick={(e) => this.handleButtonApplyClick()} variant="success">
                    <ApplyIcon />
                </Button>
            </div>
        </div>
        );
    }

    renderButtons(){
        if(this.state.isFormViewVisible){
            return this.renderFormModeButtons();
        }
        else{
            return this.renderTableModeButtons();
        }
    }


    render() {
        if(this.props.rowsCount(this.props)>0)
        {
            return(
                    <div style = {pageWidth}>
                        {this.renderButtons()}
                        <DataGridPage
                            containerProps = {this.props} 
                            isFormViewVisible = {()=>this.state.isFormViewVisible}
                            onRowSelected = {(rowIndex)=>this.props.selectRow(rowIndex)}
                            isAddrowMode = {this.state.isAddrowMode}
                        />
                    </div>
                );
        } else
        {
            return (<h2>Loading...</h2>);
        }
    }
}

export default ShpMainPage;