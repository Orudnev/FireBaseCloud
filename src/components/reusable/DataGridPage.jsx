import React from 'react';
import ReactDataGrid from 'react-data-grid';

const pageWidth = {
    width:"90vw"
}


class DataGridPage extends React.Component{
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
    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps,prevState){
    }

    onCellSelected(sel){
        this.setState({lastSelectedRowIndex:sel.rowIdx});
    }

    render() {
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
                </div>
            );
    }


}




export default DataGridPage;