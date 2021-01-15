import React from 'react';
import { Link } from 'react-router-dom';
import {Table} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
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

class StorageCloudAddRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            container:"",
            item:"",
            selectFromDropDown:true
        } 
    }

    componentDidMount(){
    }

    handleContainerFilterChange(container){
        this.setState({container});
    }

    handleButtonApplyClick(){
        var values = [this.state.container,this.state.item];
        this.props.addRow(values);        
        this.goBack();
    }

    goBack(){        
        history.goBack();
    }

    renderDropDown(){
        if(this.state.selectFromDropDown){
            return(
                <div className="row" >
                    <div className="col-9">
                        <DropdownList containers={this.props.CloudStore.Containers} onItemSelected={(cont)=>this.handleContainerFilterChange(cont)} />
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
                            value={this.state.itemFilter} />
                    </div>
                </div>    
            </div>            
            );
    }


}
export default StorageCloudAddRow;