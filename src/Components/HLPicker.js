// Hunter Figueroa
// New Relic Code Challenge
// 2018 8 28
//
// UI for user to choose High and Low

import React, { Component } from 'react';
import {FormGroup, Input, Label} from 'reactstrap'
import {observer} from 'mobx-react';

@observer
class HLPicker extends Component {


  render() {
    return (
      <FormGroup tag="fieldset">
        <div>High/Low</div>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" onClick = {this.props.appStore.toggleHigh} checked ={this.props.appStore.high ? "checked" : ""}/>{' '}
          High
          </Label>
        </FormGroup>
        <FormGroup check>
        <Label check>
            <Input type="checkbox" onClick = {this.props.appStore.toggleLow} checked ={this.props.appStore.low ? "checked" : ""}/>{' '}
          Low
          </Label>
        </FormGroup>
      </FormGroup>
    );
  }
}

export default HLPicker;
