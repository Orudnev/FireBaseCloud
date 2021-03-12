import React from 'react';
import ReactDataGrid from 'react-data-grid';
import DataForm from './DataForm'

const pageWidth = {
    width:"90vw"
};
const DataGridPageMode=
{
    ModeTable:1,
    ModeForm:2
};

class DataGridPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
                dataGrid:null,
                lastSelectedRowIndex:0
        } 
    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps,prevState){
    }

    onCellSelected(sel){
        this.setState({lastSelectedRowIndex:sel.rowIdx});
        this.props.onRowSelected(sel.rowIdx);
    }

    getRowValuesForDataForm(){
        if(this.props.isAddrowMode){
            return this.props.containerProps.rowGetter(-1);
        } else {
            return this.props.containerProps.rowGetter(this.state.lastSelectedRowIndex);
        }
    }


    renderView()
    {
        if(!this.props.isFormViewVisible()){
            return(
            <div style = {pageWidth}>
                <ReactDataGrid 
                    columns={this.props.containerProps.columns()}
                    rowGetter={(i)=>this.props.containerProps.rowGetter(i)} 
                    rowsCount={this.props.containerProps.rowsCount()}
                    minHeight={500}
                    ref={(g)=>this.dataGrid=g}
                    onCellSelected={(e)=>this.onCellSelected(e)}
                    getCellActions = {this.props.containerProps.getCellActions}
                />
            </div>);
        } else {
            return(
            <div style = {pageWidth}>
                <DataForm 
                    columns={this.props.containerProps.columns()} 
                    onChangeFieldValue = {this.props.containerProps.changeFieldValue}
                    rowValues={this.getRowValuesForDataForm()}
                     />
            </div>);
        }
    }

    render() {
        return(this.renderView());
    }


}

export default DataGridPage;