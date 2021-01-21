import React from 'react';
import ReactDataGrid from 'react-data-grid';
import DaraForm from './DataForm'

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
    }

    renderView()
    {
        if(!this.props.isFormViewVisible()){
            return(
            <div style = {pageWidth}>
                <ReactDataGrid 
                    columns={this.props.columns}
                    rowGetter={(i)=>this.props.rowGetter(i)} 
                    rowsCount={this.props.rowsCount}
                    minHeight={500}
                    ref={(g)=>this.dataGrid=g}
                    onCellSelected={(e)=>this.onCellSelected(e)}
                />
            </div>);
        } else {
            return(
            <div style = {pageWidth}>
                <DaraForm columns={this.props.columns} rowValues={this.props.rowGetter(this.state.lastSelectedRowIndex)} />
            </div>);
        }
    }

    render() {
        return(this.renderView());
    }
}

export default DataGridPage;