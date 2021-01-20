import React from 'react';
import {Form} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';

class DataForm extends React.Component{
    constructor(props){
        super(props);  
        console.log('DataForm');       
    }

    isAttr(col,attr){
        if(col.form!==undefined){
            if(col.form[attr]!==undefined && col.form[attr]){
                return true;
            }
        }
        return false;
    }


    renderFields(){
        var result = this.props.columns.map((col)=>{
           if(col.type===undefined){
               return (
                <Form.Group hidden={this.isAttr(col,'hidden')} >
                    <Form.Label hidden={this.isAttr(col,'hiddenLbl')}>{col.name}</Form.Label>
                    <Form.Control value={this.props.rowValues[col.key]} disabled={this.isAttr(col,'disabled')} />                  
               </Form.Group> 
               );  
           } 
        });
        return (
            <Form>
                {result}
            </Form>
        );
    }

    render() {
        return(
            <div>
                {this.renderFields()}
            </div>
        );
    }
}

export default DataForm;