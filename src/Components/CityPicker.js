// Hunter Figueroa
// New Relic Code Challenge
// 2018 8 28
//
// Displays and dropdown for cities in appstore

import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import mobx, {toJS} from 'mobx';
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
    var city = e.target.value
    this.props.appStore.setLocation(city);
  }

  renderOptions(){
    return this.props.appStore.locations.map((location)=>{
      return <DropdownItem key = {location} value = {location} onClick={this.handleClick}>{location}</DropdownItem>
    })
  }

  render() {
    return (
      <Dropdown className = "cityPicker" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.props.appStore.currentLocation}
        </DropdownToggle>
        <DropdownMenu>
          {this.renderOptions()}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default CityPicker;
