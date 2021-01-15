import React from 'react';
import DataGridPage from './reusable/DataGridPage';
import { Link } from 'react-router-dom';
import {Container, Table} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {CancelIcon}  from './icons';
import {PlusIcon}  from './icons';
import {PencilIcon}  from './icons';
import {RefreshIcon}  from './icons';
import DropdownList from './DropdownList';
import {routePath} from './Root'
import history from '../history';

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
                lastSelectedRowIndex:0
        } 
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

    handleClearFilterButtonClick()
    {
        var fltCriteria = "";
        this.setState({filterCriteria:fltCriteria});
        this.props.filterRows(fltCriteria);    
    }

    handleContainerFilterChange(container){

        this.setState({containerFilter:container});
        var fltCriteria = {itemFilter:this.state.itemFilter,containerFilter:container}; 
        this.props.filterRows(fltCriteria);        
    }

    onCellSelected(sel){
        this.setState({lastSelectedRowIndex:sel.rowIdx});
        this.props.selectRow(sel.rowIdx);
    }

    render() {
        if(this.props.CloudStore.Items != null && this.props.CloudStore.Items.length>0)
        {
            console.log(this.state.selectedCell);
            return(
                    <div style = {pageWidth}>
                        <div className="btn-group" role="group" >
                            <Link to={routePath.storeСloud_addrow}>
                                <Button type='button' >
                                    <PlusIcon />
                                </Button>
                            </Link>
                            <span style={space10}></span>
                            <Link to={routePath.storeСloud_editrow}>
                                <Button type='button' >
                                    <PencilIcon />
                                </Button>
                            </Link>
                            <span style={space10}></span>
                            <Button type='button' onClick={(e) => this.handleRefreshButtonClick(e)}>
                                <RefreshIcon />
                            </Button>
                        </div>
                        <DataGridPage 
                            columns={this.props.columns()}
                            rowGetter={i=>this.props.CloudStore.Items[i]} 
                            rowsCount={this.props.CloudStore.Items.length}
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