import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

class DropDownList extends React.Component{
     
    constructor(props){
        super(props);
        var ddItems = this.props.items;
        var selItemStr = props.value;
        var selIndex = 0;
        if (selItemStr){
            selIndex = ddItems.indexOf(selItemStr);
            if(selIndex === -1){
                selIndex = 0;
            }
        } 
        selItemStr = ddItems[selItemStr];
        this.state = {
            dropDownItems: ddItems,
            selectedIndex: selIndex
        } 
    }

    componentDidMount(){
    }

    onItemSelected(index)
    {
        if(this.state.selectedIndex === index){
            return;
        }
        this.setState({selectedIndex:index});
        this.props.onItemSelected(this.state.dropDownItems[index]);
    }


    renderDropDownItems()
    {
        return this.props.items.map((row,index) => {
            return(
            <Dropdown.Item eventKey={index} key={index} >{row}</Dropdown.Item>)
        });
    }

    render()
    {
        return (
        <DropdownButton variant="light" className="border"
            title= {this.state.dropDownItems[this.state.selectedIndex]}
            onSelect = {(index)=>this.onItemSelected(index)}
        >
            {this.renderDropDownItems()}
        </DropdownButton>
        );
    }


}
export default DropDownList;