// Hunter Figueroa
// New Relic Code Challenge
// 2018 8 28
//
// Displays and dropdown for cities in appstore

// Plugins
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {observer} from 'mobx-react';

@observer
class CityPicker extends Component {

  constructor(props){
    super(props);
    this.state = {
      dropdownOpen: false,
    }
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggle(){
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  handleClick(e){
    var time = e.target.value
    this.props.appStore.pickTime(time);
  }

  renderOptions(){
    return this.props.appStore.times.map((time)=>{
      return <DropdownItem key = {time} value = {time} onClick={this.handleClick}>{time}</DropdownItem>
    })
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.props.appStore.timeSpan}
        </DropdownToggle>
        <DropdownMenu>
          {this.renderOptions()}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default CityPicker;
