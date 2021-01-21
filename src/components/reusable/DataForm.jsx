import React from 'react';
import {Form} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import {getObjProp} from '../../helpers';

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


    renderSimpleField(col){
        return(
            <Form.Group hidden={this.isAttr(col,'hidden')} >
                <Form.Label hidden={this.isAttr(col,'hiddenLbl')}>{col.name}</Form.Label>
                <Form.Control value={this.props.rowValues[col.key]} disabled={this.isAttr(col,'disabled')} />                  
           </Form.Group> 
        );
    }


    renderFields(){
        var fieldsInRow = [];
        var fieldsInRowStarted = false;
        var result = [];
        for(var i=0;i<this.props.columns.length;i++){
           var col = this.props.columns[i];
           if(getObjProp(col,"form.rowContainer") && getObjProp(col,"form.rowContainer")==="begin"){
                fieldsInRowStarted = true;
           }
           if(fieldsInRowStarted){
                if(col.type===undefined){
                    fieldsInRow.push(this.renderSimpleField(col));               
                }  
           }
           if(getObjProp(col,"form.rowContainer") && getObjProp(col,"form.rowContainer")==="end"){
                fieldsInRowStarted = false;
                result.push(
                    <Form.Row>
                        {fieldsInRow}
                    </Form.Row>
                );
                fieldsInRow = [];
                continue; 
           }
           if(col.type===undefined && fieldsInRowStarted == false){
               result.push(this.renderSimpleField(col));               
           } 
        }
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