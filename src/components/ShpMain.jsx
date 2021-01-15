import React from 'react';
import DataGridPage from './reusable/DataGridPage';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {PlusIcon}  from './icons';
import {PencilIcon}  from './icons';
import {RefreshIcon}  from './icons';
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
        if(this.props.rowsCount(this.props)>0)
        {
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
                            rowGetter={i=>this.props.rowGetter(i)} 
                            rowsCount={this.props.rowsCount()}
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