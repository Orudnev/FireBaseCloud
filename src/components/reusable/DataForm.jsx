import React from 'react';
import {Form} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import {getObjProp} from '../../helpers';
import DropdownList from './DropdownList.jsx';


const formGrPadding = {
    paddingLeft: "5px",
    paddingRight: "5px"
}

const formPadding = {
    paddingTop:"10px"
}


/*
Формат обьекта col:
        key: <имя поля>
        name: <заголовок поля> ,
        width: <ширина колонки в гриде, в пикселях>,
        form:{  объект свойств формы
            hidden : <bool> спрятать весь элемент (и заголовок и поле ввода)
            hiddenLbl: <bool спрятать заголовок поля> 
            disabled: <bool задизейблить поле ввода>
            rowContainer: <"begin"> - поместить группу полей в одну строку (Form.Row), стартовое поле это то, где стоит "begin"     
                          <"end"> - завершающее поле группы Form.Row, в строку войдут все поля начиная с поля 
                                   с rowContainer="begin"  и заканчивая полем с rowContainer="end"
            class: css классы элемента Form.Group с его помощью можно регулировать ширину полей ввода формы (col-2/col-3/col-n)                       
        }                           
*/


class DataForm extends React.Component{
    constructor(props){
        super(props);  
        console.log('DataForm');     
        this.state = {
            rowValue:{...this.props.rowValues},
        }  
    }

    isAttr(col,attr){
        if(col.form!==undefined){
            if(col.form[attr]!==undefined && col.form[attr]){
                return true;
            }
        }
        return false;
    }

    hanleFieldValueChange(col,value){
        var newValue = {...this.state.rowValue};
        newValue[col.key] = value;
        this.setState({rowValue: newValue});
        this.props.onChangeFieldValue(newValue,false);
    }

    renderLabel(col){
        return(
            <Form.Label hidden={this.isAttr(col,'hiddenLbl')}>{col.name}</Form.Label>
        );
    }

    renderDropDownField(col,isRow){
        return(
            <Form.Group hidden={this.isAttr(col,'hidden')} style={formGrPadding} className={col.form.class} >
                {this.renderLabel(col)}
                <DropdownList items={col.dropdownItems} onItemSelected={(value)=>this.hanleFieldValueChange(col,value)} value={this.state.rowValue[col.key]} />
            </Form.Group> 
        );
    }
    
    renderSimpleFieldInput(col){
        return(
            <Form.Control 
                value={this.state.rowValue[col.key]} 
                disabled={this.isAttr(col,'disabled')} 
                onChange={(e)=>{this.hanleFieldValueChange(col,e.target.value)}} 
            />                  
        );
    }

    renderSimpleField(col,isRow){
        if(isRow){
            return(
                <Form.Group hidden={this.isAttr(col,'hidden')} style={formGrPadding} className={col.form.class} >
                    {this.renderLabel(col)}
                    {this.renderSimpleFieldInput(col)}
                </Form.Group> 
            );
        } else {
            return(
                <Form.Group hidden={this.isAttr(col,'hidden')} >
                    {this.renderLabel(col)}
                    {this.renderSimpleFieldInput(col)}
                </Form.Group> 
            );
        }
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
                    fieldsInRow.push(this.renderSimpleField(col,true));               
                } 
                if(col.type==='dropdown'){
                    fieldsInRow.push(this.renderDropDownField(col,true));               
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
            <Form style={formPadding}>
                {result}
            </Form>
        );
    }

    render() {
        console.log(this.state.rowValue)
        return(
            <div>
                {this.renderFields()}
            </div>
        );
    }
}

export default DataForm;