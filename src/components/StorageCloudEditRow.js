import React from 'react';
import {Button} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {ApplyIcon}  from './icons';
import {PlusIcon}  from './icons';
import {ExitIcon}  from './icons';
import DropdownList from './DropdownList';
import {CancelIcon}  from './icons';
import history from '../history';

const pageWidth = {
    width:"90vw"
}

class StorageCloudEditRow extends React.Component{
    constructor(props){
          super(props);
        var itemStr = "";  
        var selCont = "";
        if(props.CloudStore.Items.length>0){
            itemStr = props.CloudStore.Items[props.CloudStore.SelectedRowIndex].Item;
            selCont = props.CloudStore.Items[props.CloudStore.SelectedRowIndex].Container;            
        }      
    
        this.state = {
            container:selCont,
            item:itemStr,
            selectFromDropDown:true
        } 
    }

    componentDidMount(){
    }

    handleContainerFilterChange(container){
        this.setState({container});
    }

    handleButtonApplyClick(){
        var values = [this.props.CloudStore.SelectedRowIndex,this.state.container,this.state.item];
        this.props.updateRow(values);        
        this.goBack();
    }

    goBack(){        
        history.goBack();
    }

    renderDropDown(){
        if(this.props.CloudStore.Items.length==0) {
            this.goBack();
            return;
        }        
        if(this.state.selectFromDropDown){
            return(
                <div className="row" >
                    <div className="col-9">
                        <DropdownList   containers={this.props.CloudStore.Containers} 
                                        onItemSelected={(cont)=>this.handleContainerFilterChange(cont)} 
                                        selectedItemStr={this.state.container} />
                    </div>
                    <div className="col">
                        <Button type='button' onClick={(e) => this.setState({selectFromDropDown:false})} variant="success">
                            <PlusIcon />
                        </Button>
                    </div>    
                </div>    
            );
        }
        else{
            return(
                <div className="row" >
                    <div className="col-9">
                        <FormControl placeholder="название контейнера" 
                        aria-describedby="basic-addon1"
                        onChange={(e)=>this.setState({container:e.target.value})} 
                        value={this.state.itemFilter} />
                    </div>
                    <div className="col">
                        <Button type='button' onClick={(e) => this.setState({selectFromDropDown:true})} variant="danger">
                            <CancelIcon />
                        </Button>
                    </div>    
                </div>    
            ); 
        }
    }


    render()
    {        
        return (
            <div style = {pageWidth}>
                <div className="row">
                    <div className="col">
                        <Button type='button' onClick={(e) => this.goBack()} variant="light" className="border">
                            <ExitIcon />
                        </Button>
                    </div>
                    <div className="col text-right">
                        <Button type='button' onClick={(e) => this.handleButtonApplyClick()} variant="success">
                            <ApplyIcon />
                        </Button>
                    </div>
                </div>
                <br />     
                <label >Контейнер</label>               
                {this.renderDropDown()}
                <label >Элемент</label>               
                <div className="row" >
                    <div className="col">
                        <FormControl 
                            placeholder="название элемента"
                            onChange={(e)=>this.setState({item:e.target.value})} 
                            aria-describedby="basic-addon1" 
                            value={this.state.item} />
                    </div>
                </div>    
            </div>            
            );
    }


}
export default StorageCloudEditRow;