import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

const allItemsCaption = "Все элементы";

class DropDownList extends React.Component{
     
    constructor(props){
        super(props);
        this.showAllItemIndexCorrection = 0;
        if(this.props.showAllElementsItem) this.showAllItemIndexCorrection = 1;
        var selItem = "";
        if(this.props.selectedItemStr){
            selItem = this.props.selectedItemStr;
        }
        this.state = {
            selectedIndex:props.showAllElementsItem == 1?0:-1,
            selectedItemStr: props.showAllElementsItem ?allItemsCaption:selItem
        } 
    }

    componentDidMount(){
        //this.props.requestRows(false);
        
    }

    renderDropDownItems()
    {
        return this.props.containers.map((row,index) => {
            return(
            <Dropdown.Item eventKey={index+this.showAllItemIndexCorrection} key={index+this.showAllItemIndexCorrection} >{row}</Dropdown.Item>)
        });
    }

    onItemSelected(index)
    {
        if(this.state.selectedIndex == index){
            return;
        }
        
        if(this.props.showAllElementsItem){
            if(index==0){
                this.setState({selectedIndex:0,selectedItemStr:allItemsCaption});
                this.props.onItemSelected(null);
                return;       
            }
        }
        var selectedItem = this.props.containers[index-this.showAllItemIndexCorrection];
        this.setState({selectedIndex:index,selectedItemStr:selectedItem});
        this.props.onItemSelected(selectedItem);
    }

    renderAllElementsItem()
    {
        if(this.props.showAllElementsItem)
        {
            return (            
                <Dropdown.Item eventKey="0">{allItemsCaption}</Dropdown.Item>
            );
        }
    }

    render()
    {
        return (
        <DropdownButton variant="light" className="border"
        title= {this.state.selectedItemStr}
        onSelect = {(index)=>this.onItemSelected(index)}
        >
            {this.renderAllElementsItem()}
            {this.renderDropDownItems()}
        </DropdownButton>
        );
    }


}
export default DropDownList;